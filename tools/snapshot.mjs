#!/usr/bin/env node
/* ============================================================
   给实测 HTML 拍一张「打开时的初始界面」截图，用作截图型卡片。

   用法：
     node tools/snapshot.mjs snake/snake.deepseek-v41-flash.codex.1/snake.….html
     node tools/snapshot.mjs <html> [输出.png] [--width 1280] [--height 1000] [--profile <临时用户目录>]

   不传输出路径时，默认写成同目录下的同名 .png（例如 snake.….html → snake.….png）。
   实测目录里存在同名 png 时，网页就以这张截图代替实时预览，点击在新标签页打开 HTML。

   Chrome 路径可以用环境变量 CHROME_PATH 指定。
   ============================================================ */

import { existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, extname, join, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
].filter(Boolean);

function findChrome() {
  const found = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) {
    console.error('找不到 Chrome / Edge，请用环境变量 CHROME_PATH 指定浏览器可执行文件路径。');
    process.exit(1);
  }
  return found;
}

function parseArgs(argv) {
  const args = { rest: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (key === '--width') args.width = Number(argv[i + 1]);
    else if (key === '--height') args.height = Number(argv[i + 1]);
    else if (key === '--profile') args.profile = argv[i + 1];
    else args.rest.push(key);
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const input = args.rest[0];

if (!input) {
  console.error('用法：node tools/snapshot.mjs <html 路径> [输出.png] [--width 1280] [--height 1000]');
  process.exit(1);
}

const htmlFile = resolve(input);
if (!existsSync(htmlFile) || !statSync(htmlFile).isFile()) {
  console.error('找不到文件：' + htmlFile);
  process.exit(1);
}

const width = args.width || 1280;
const height = args.height || 1000;
const outFile = args.rest[1]
  ? resolve(args.rest[1])
  : join(dirname(htmlFile), basename(htmlFile, extname(htmlFile)) + '.png');

const profileDir = resolve(args.profile || join(tmpdir(), 'hotbench-snapshot-' + process.pid));
mkdirSync(profileDir, { recursive: true });

const fileUrl = 'file:///' + htmlFile.split(sep).join('/');
const chrome = findChrome();

const result = spawnSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-sandbox',
  '--force-device-scale-factor=1',
  '--user-data-dir=' + profileDir,
  '--window-size=' + width + ',' + height,
  '--virtual-time-budget=4000',
  '--screenshot=' + outFile,
  fileUrl
], { stdio: ['ignore', 'ignore', 'ignore'] });

if (!args.profile) rmSync(profileDir, { recursive: true, force: true });

if (result.error) {
  console.error('调用浏览器失败：' + result.error.message);
  process.exit(1);
}

if (!existsSync(outFile)) {
  console.error('截图没有生成，请检查浏览器是否可用。');
  process.exit(1);
}

console.log('已生成截图 ' + outFile + '（' + width + '×' + height + '）');
