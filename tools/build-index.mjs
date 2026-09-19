#!/usr/bin/env node
/* ============================================================
   扫描仓库目录，生成 data/projects.js（HotBench 数据文件）。

   目录约定：
     <project>/<project>.prompt.txt                        该 benchmark 的原始 prompt
     <project>/<project>.<model>.<harness>.<attempt>/      一次实测（内含同名 .html）

   说明：model 字段允许包含点号（例如 gpt-5.6-luna），脚本从右往左解析：
   最后一段是第几次尝试，倒数第二段是 harness，剩下的是 model。

   用法：
     node tools/build-index.mjs                         # 在仓库根目录执行
     node tools/build-index.mjs --root D:\HotBench      # 指定仓库根目录
     node tools/build-index.mjs --out data/projects.js  # 指定输出文件

   已有的人工字段（site、labels、各项目的 title / summary / prompt、每次实测的 note）
   在重新生成时会被保留。
   ============================================================ */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(HERE, '..');
const SKIP_DIRS = new Set([
  '.git', '.github', '.vscode', '.idea',
  'assets', 'data', 'tools', 'node_modules', 'work', 'tmp'
]);

const DEFAULT_HARNESS_LABELS = {
  codex: 'Codex',
  workbuddy: 'WorkBuddy',
  claude: 'Claude',
  'claude-code': 'Claude Code',
  cursor: 'Cursor',
  windsurf: 'Windsurf',
  cline: 'Cline',
  aider: 'Aider',
  opencode: 'OpenCode'
};

/* ---------- 参数 ---------- */

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--root') args.root = argv[i + 1];
    else if (argv[i] === '--out') args.out = argv[i + 1];
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const root = args.root ? resolve(args.root) : DEFAULT_ROOT;
const outFile = args.out ? resolve(root, args.out) : join(root, 'data', 'projects.js');

/* ---------- 读取旧数据（保留人工字段） ---------- */

function readExisting() {
  if (!existsSync(outFile)) return null;
  const raw = readFileSync(outFile, 'utf8');
  const match = raw.match(/window\.HOTBENCH_DATA\s*=\s*([\s\S]*?);?\s*$/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    console.warn('! 已存在的数据文件无法解析，将按新文件重新生成：' + error.message);
    return null;
  }
}

const previous = readExisting();
const previousProjects = new Map(
  (((previous && previous.projects) || [])).map((project) => [project.id, project])
);

/* ---------- 扫描 ---------- */

function listDirs(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function titleCase(token) {
  return token
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function findPrompt(projectDir, projectId) {
  const preferred = join(projectDir, projectId + '.prompt.txt');
  if (existsSync(preferred)) return preferred;
  const found = readdirSync(projectDir)
    .find((name) => name.toLowerCase().endsWith('.prompt.txt'));
  return found ? join(projectDir, found) : null;
}

function findHtml(runDir, runName) {
  const preferred = join(runDir, runName + '.html');
  if (existsSync(preferred)) return preferred;
  const found = readdirSync(runDir).find((name) => name.toLowerCase().endsWith('.html'));
  return found ? join(runDir, found) : null;
}

function parseRunDir(projectId, dirName) {
  if (!dirName.startsWith(projectId + '.')) return null;
  const parts = dirName.slice(projectId.length + 1).split('.');
  if (parts.length < 3) return null;
  const attempt = parts.pop();
  const harness = parts.pop();
  const model = parts.join('.');
  if (!/^\d+$/.test(attempt) || !harness || !model) return null;
  return { model, harness, attempt: Number(attempt) };
}

function toUrl(path) {
  return relative(root, path).split(sep).join('/');
}

function scan() {
  const projects = [];
  const modelLabels = Object.assign(
    {}, (previous && previous.labels && previous.labels.models) || {}
  );
  const harnessLabels = Object.assign(
    {}, DEFAULT_HARNESS_LABELS,
    (previous && previous.labels && previous.labels.harnesses) || {}
  );

  listDirs(root)
    .filter((name) => !name.startsWith('.') && !name.startsWith('_') && !SKIP_DIRS.has(name))
    .sort()
    .forEach((projectId) => {
      const projectDir = join(root, projectId);
      const old = previousProjects.get(projectId) || {};
      const runs = [];

      listDirs(projectDir).forEach((dirName) => {
        const parsed = parseRunDir(projectId, dirName);
        if (!parsed) return;
        const html = findHtml(join(projectDir, dirName), dirName);
        if (!html) {
          console.warn('! 跳过（目录里没有 html）：' + dirName);
          return;
        }
        runs.push({
          id: parsed.model + '.' + parsed.harness + '.' + parsed.attempt,
          model: parsed.model,
          harness: parsed.harness,
          attempt: parsed.attempt,
          file: toUrl(html)
        });
        if (!modelLabels[parsed.model]) modelLabels[parsed.model] = parsed.model;
        if (!harnessLabels[parsed.harness]) {
          harnessLabels[parsed.harness] = titleCase(parsed.harness);
        }
      });

      runs.sort((a, b) =>
        a.model.localeCompare(b.model) ||
        a.harness.localeCompare(b.harness) ||
        a.attempt - b.attempt
      );

      const oldRuns = new Map(((old.runs) || []).map((run) => [run.id, run]));
      runs.forEach((run) => {
        const prev = oldRuns.get(run.id);
        if (prev && prev.note) run.note = prev.note;
      });

      const promptFile = findPrompt(projectDir, projectId);
      if (!runs.length && !promptFile) return;

      projects.push({
        id: projectId,
        title: old.title || projectId,
        summary: old.summary || '',
        prompt: old.prompt !== undefined
          ? old.prompt
          : (promptFile ? readFileSync(promptFile, 'utf8').trim() : ''),
        promptSource: promptFile ? toUrl(promptFile) : (old.promptSource || ''),
        runs: runs
      });
    });

  return {
    site: Object.assign({
      title: 'HotBench · 有趣的benchmark 实测',
      subtitle: '同一个 prompt，交给不同的 AI 模型与 Harness，看看它们各自能做出什么。',
      homepage: 'https://xingheling.cn/',
      repo: ''
    }, (previous && previous.site) || {}),
    labels: { models: modelLabels, harnesses: harnessLabels },
    projects: projects
  };
}

/* ---------- 输出 ---------- */

function main() {
  if (!existsSync(root)) {
    console.error('找不到仓库目录：' + root);
    process.exit(1);
  }

  const data = scan();
  const dataDir = dirname(outFile);
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

  const body =
    '/* 由 tools/build-index.mjs 自动生成。\n' +
    ' * 重新生成时会保留：site、labels、各项目的 title / summary / prompt、runs[].note。\n' +
    ' * 新增实测后执行：node tools/build-index.mjs\n' +
    ' */\n' +
    'window.HOTBENCH_DATA = ' + JSON.stringify(data, null, 2) + ';\n';

  writeFileSync(outFile, body, 'utf8');

  const totalRuns = data.projects.reduce((sum, project) => sum + project.runs.length, 0);
  console.log('已写入 ' + outFile);
  console.log('项目 ' + data.projects.length + ' 个 / 实测 ' + totalRuns + ' 次');
  data.projects.forEach((project) => {
    console.log('  - ' + project.id + '：' + project.runs.length + ' 次');
  });
}

main();
