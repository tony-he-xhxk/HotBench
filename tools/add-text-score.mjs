#!/usr/bin/env node
/* ============================================================
   文字题批量评分录入

   用法：
     node tools/add-text-score.mjs
     node tools/add-text-score.mjs --file feihua-wenxue/feihua-wenxue.results.json

   流程：
     1. 选择本次实测的模型（输入编号，或模型 id / 显示名）；
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
  console.log('\n可用模型：');
  results.models.forEach((model, index) => {
    console.log('  [' + (index + 1) + '] ' + model.name + '  (' + model.id + ' × ' + model.harness + ')');
  });

  let model = findModel(await ask('\n选择模型（编号 / id / 显示名，q 退出）：'));
  if (!model) {
    const id = (await ask('未找到该模型。输入要新增的模型 id（回车放弃）：')).trim();
    if (!id) fail('已放弃。');

    const name = (await ask('显示名（回车用 id）：')).trim() || id;
    const harness = (await ask('Harness（回车 workbuddy）：')).trim() || 'workbuddy';

    model = { id: id, name: name, harness: harness };
    results.models.push(model);
    console.log('已新增模型：' + name + ' × ' + harness);
  }

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
  console.log('  模型：' + model.name + ' × ' + model.harness);
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
