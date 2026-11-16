#!/usr/bin/env node
/* ============================================================
   文字题批量评分录入

   用法：
     node tools/add-text-score.mjs
     node tools/add-text-score.mjs --file feihua-wenxue/feihua-wenxue.results.json

   字段约定：
     - 网页显示名（name）：网站原样显示的官方名称，可含大小写、空格和短横线；
     - 本地模型 ID（id）：小写 slug，用作 JSON 评分键和实测文件夹名，不含空格和点；
     - Harness 本地 ID（harness）：运行环境的小写标识，例如 workbuddy、codex。

   流程：
     1. 从编号列表选择模型；输入 0 进入新增模型流程；
     2. 输入「0 分（跑偏）」的题号，逗号分隔，可留空；
     3. 输入「1 分（部分解释）」的题号，逗号分隔，可留空；
     4. 其余题目默认记 2 分（完整解释）；
     5. 如果 JSON 里已经存在完全相同的「模型 + Harness + 题号 + 分数」，
        会让你选择：1) 忽略重复，只写不重复的  2) 放弃本批次。
     6. 同一道题已存在不同分数时，会让你选择：1) 覆盖（用新分数）
        2) 忽略（保持旧分数）。
   ============================================================ */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_FILE = join(ROOT, 'feihua-wenxue', 'feihua-wenxue.results.json');

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : '';
}

const resultsFile = resolve(argValue('--file') || DEFAULT_FILE);
if (!existsSync(resultsFile)) {
  console.error('找不到评分文件：' + resultsFile);
  process.exit(1);
}

const questionsFile = resultsFile.replace(/\.results\.json$/i, '.questions.txt');
if (!existsSync(questionsFile)) {
  console.error('找不到题目文件：' + questionsFile);
  process.exit(1);
}

const questionCount = readFileSync(questionsFile, 'utf8')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .length;

const results = JSON.parse(readFileSync(resultsFile, 'utf8'));
results.models = Array.isArray(results.models) ? results.models : [];
results.scores = results.scores && typeof results.scores === 'object' ? results.scores : {};

const rl = createInterface({ input: stdin, output: stdout });
const lineQueue = [];
const lineWaiters = [];

rl.on('line', (line) => {
  if (lineWaiters.length) lineWaiters.shift()(line);
  else lineQueue.push(line);
});
rl.on('close', () => {
  while (lineWaiters.length) lineWaiters.shift()('');
});

function ask(prompt) {
  stdout.write(prompt);
  if (lineQueue.length) return Promise.resolve(lineQueue.shift());
  return new Promise((resolve) => lineWaiters.push(resolve));
}

function fail(message) {
  console.error(message);
  rl.close();
  process.exit(1);
}

function quit(message) {
  console.log(message);
  rl.close();
  process.exit(0);
}

function parseQuestionNumbers(text) {
  const values = String(text || '')
    .split(/[,，、\s]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => Number(item));

  if (values.some((value) => !Number.isInteger(value) || value < 1 || value > questionCount)) {
    return null;
  }
  return [...new Set(values)].sort((a, b) => a - b);
}

function slugifyModelId(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[.\s_]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function validModelId(value) {
  return /^[a-z0-9][a-z0-9-]*$/.test(String(value || ''));
}

function findModel(input) {
  const text = String(input || '').trim();
  if (!text) return null;

  if (/^\d+$/.test(text)) {
    const index = Number(text) - 1;
    return results.models[index] || null;
  }

  const lower = text.toLowerCase();
  return results.models.find((model) =>
    String(model.id).toLowerCase() === lower || String(model.name).toLowerCase() === lower
  ) || null;
}

function printModels() {
  console.log('\n可用模型：');
  console.log('  网页显示名只影响网站；本地 ID 用于 JSON 和本地文件夹。');
  console.log('  新建模型时本地 ID 必须为小写；已有历史 ID 保持原样，避免破坏旧评分。');
  results.models.forEach((model, index) => {
    const summary = questionIdsOf(model.id);
    console.log('\n  [' + (index + 1) + '] 网页显示：' + model.name);
    console.log('      本地 ID：' + model.id + ' | Harness：' + model.harness +
      ' | 已评 ' + summary.filled + ' / ' + questionCount + ' 题');
  });
  console.log('\n  [0] 新增模型');
  console.log('  [q] 退出');
}

async function createModel() {
  console.log('\n新增模型（这里只登记模型，不会立刻写入文件）：');
  console.log('  网页显示名会原样出现在网站上，例如：DeepSeek-V4.1-Flash。');
  console.log('  本地 ID 会自动转成小写，用于 JSON 评分键和本地文件夹命名。');
  console.log('  例：网页显示名「Hy4-Flash」→ 本地 ID「hy4-flash」。\n');

  let name = '';
  while (!name) {
    name = (await ask('网页显示名（网站原样显示）：')).trim();
    if (!name) console.log('  网页显示名不能为空。');
  }

  const duplicateName = results.models.find(
    (model) => String(model.name).trim().toLowerCase() === name.toLowerCase()
  );
  if (duplicateName) {
    console.log('  该网页显示名已经存在，本地 ID 为：' + duplicateName.id);
    return duplicateName;
  }

  const suggestedId = slugifyModelId(name);
  if (suggestedId) console.log('  建议的本地 ID：' + suggestedId);

  let id = '';
  while (!id) {
    const entered = (await ask('本地 ID（只允许小写字母、数字、短横线，回车用建议值）：'))
      .trim();
    id = slugifyModelId(entered || suggestedId);
    if (!validModelId(id)) {
      console.log('  本地 ID 不合法，请输入英文字母或数字开头的小写 slug。');
      id = '';
      continue;
    }
    if (id !== (entered || suggestedId)) {
      console.log('  已规范为：' + id);
    }
    const duplicateId = results.models.find(
      (model) => String(model.id).toLowerCase() === id.toLowerCase()
    );
    if (duplicateId) {
      console.log('  该本地 ID 已经存在，网页显示名为：' + duplicateId.name);
      id = '';
    }
  }

  const harnessInput = (await ask('Harness 本地 ID（回车 workbuddy）：')).trim();
  const harness = slugifyModelId(harnessInput || 'workbuddy') || 'workbuddy';
  const model = { id: id, name: name, harness: harness };

  console.log('\n新模型预览：');
  console.log('  网站会显示：' + model.name);
  console.log('  JSON / 文件夹使用：' + model.id);
  console.log('  Harness：' + model.harness);

  return model;
}

async function chooseModel() {
  printModels();
  while (true) {
    const input = (await ask(
      '\n输入模型编号（推荐），也可输入本地 ID / 网页显示名；0 新增，q 退出：'
    )).trim();

    if (input.toLowerCase() === 'q') quit('已退出，未写入任何数据。');
    if (!input) {
      console.log('\n没有输入选择，请重新选择。');
      continue;
    }
    if (input === '0') {
      const model = await createModel();
      if (!results.models.includes(model)) {
        results.models.push(model);
        console.log('已登记新模型；评分写入成功后才会保存到 JSON。');
      }
      return model;
    }

    const model = findModel(input);
    if (model) return model;

    console.log('\n没有匹配到「' + input + '」。');
    console.log('如果这是新模型，请输入 0；否则请从上面的编号重新选择，或输入 q 退出。');
  }
}

function questionIdsOf(modelId) {
  let total = 0;
  let filled = 0;

  for (let question = 1; question <= questionCount; question += 1) {
    const value = (results.scores[String(question)] || {})[modelId];
    if (value === 0 || value === 1 || value === 2) {
      total += value;
      filled += 1;
    }
  }

  return {
    total: total,
    filled: filled,
    max: questionCount * 2,
    rate: questionCount ? (total / (questionCount * 2)) * 100 : 0
  };
}

try {
  const model = await chooseModel();

  const zeroText = await ask('\n0 分（跑偏）的题号，逗号分隔（可留空）：');
  const zeroPoints = parseQuestionNumbers(zeroText);
  if (!zeroPoints) fail('题号不合法：请输入 1-' + questionCount + ' 之间的整数，用逗号分隔。');

  const oneText = await ask('部分解释（1 分）的题号，逗号分隔（可留空）：');
  const onePoints = parseQuestionNumbers(oneText);
  if (!onePoints) fail('题号不合法：请输入 1-' + questionCount + ' 之间的整数，用逗号分隔。');

  const overlap = zeroPoints.filter((question) => onePoints.includes(question));
  if (overlap.length) {
    fail('同一题不能同时是 0 分和 1 分：' + overlap.join(', '));
  }

  const newScores = [];
  for (let question = 1; question <= questionCount; question += 1) {
    const score = zeroPoints.includes(question) ? 0 : (onePoints.includes(question) ? 1 : 2);
    newScores.push({ question: question, score: score });
  }

  console.log('\n本次批次：');
  console.log('  网页显示名：' + model.name);
  console.log('  本地模型 ID：' + model.id);
  console.log('  Harness：' + model.harness);
  console.log('  0 分：' + (zeroPoints.join(', ') || '（无）'));
  console.log('  1 分：' + (onePoints.join(', ') || '（无）'));
  console.log('  2 分：其余 ' + (questionCount - zeroPoints.length - onePoints.length) + ' 题');

  const duplicates = [];
  const overwrites = [];

  newScores.forEach((item) => {
    const existing = (results.scores[String(item.question)] || {})[model.id];
    if (existing === item.score) duplicates.push(item.question);
    else if (existing === 0 || existing === 1 || existing === 2) overwrites.push(item.question);
  });

  let skipDuplicates = false;

  if (duplicates.length) {
    console.log('\n检测到 ' + duplicates.length + ' 处重复（模型 + Harness + 题号 + 分数完全相同）：' +
      duplicates.join(', '));
    console.log('  1) 忽略重复（只加入不重复的）');
    console.log('  2) 放弃加入本批次');

    let choice = '';
    while (choice !== '1' && choice !== '2') {
      choice = (await ask('选择 [1/2]：')).trim();
    }

    if (choice === '2') fail('已放弃，本批次未写入。');
    skipDuplicates = true;
  }

  let keepConflicts = false;

  if (overwrites.length) {
    console.log('\n检测到 ' + overwrites.length + ' 处分数冲突（同一模型 + Harness + 题号，旧分数不同）：' +
      overwrites.join(', '));
    console.log('  1) 覆盖（用新分数覆盖旧分数）');
    console.log('  2) 忽略（保持旧分数）');

    let choice = '';
    while (choice !== '1' && choice !== '2') {
      choice = (await ask('选择 [1/2]：')).trim();
    }

    if (choice === '2') keepConflicts = true;
  }

  let written = 0;
  let ignoredConflicts = 0;
  newScores.forEach((item) => {
    if (skipDuplicates && duplicates.includes(item.question)) return;
    if (keepConflicts && overwrites.includes(item.question)) {
      ignoredConflicts += 1;
      return;
    }
    if (!results.scores[String(item.question)]) results.scores[String(item.question)] = {};
    results.scores[String(item.question)][model.id] = item.score;
    written += 1;
  });

  writeFileSync(resultsFile, JSON.stringify(results, null, 2) + '\n', 'utf8');

  const summary = questionIdsOf(model.id);
  console.log('\n已写入 ' + resultsFile);
  console.log('  新增/更新 ' + written + ' 条' +
    (!keepConflicts && overwrites.length ? '（其中覆盖旧分数 ' + overwrites.length + ' 条）' : '') +
    (skipDuplicates ? '；跳过重复 ' + duplicates.length + ' 条' : '') +
    (ignoredConflicts ? '；保留旧分数 ' + ignoredConflicts + ' 条' : ''));
  console.log('  ' + model.name + '：' + summary.total + ' / ' + summary.max +
    ' 分（' + summary.rate.toFixed(1) + '%），已评 ' + summary.filled + ' / ' + questionCount + ' 题');
  console.log('\n下一步：node tools/build-index.mjs');
} finally {
  rl.close();
}
