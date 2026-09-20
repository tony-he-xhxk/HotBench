/* 由 tools/build-index.mjs 自动生成。
 * prompt / comment 取自各项目下的同名 txt 文件；
 * 重新生成时会保留：site、labels、各项目的 title / summary、runs[].note。
 * 新增实测后执行：node tools/build-index.mjs
 */
window.HOTBENCH_DATA = {
  "site": {
    "title": "HotBench · 有趣的benchmark 实测",
    "subtitle": "同一个 prompt，交给不同的 AI 模型与 Harness，看看它们各自能做出什么。",
    "homepage": "https://xingheling.cn/",
    "repo": "https://github.com/tony-he-xhxk/HotBench"
  },
  "labels": {
    "models": {
      "deepseek-v41-flash": "deepseek-v4.1-flash",
      "glm-5.3-flash": "glm-5.3-flash",
      "hy4-preview": "hy4-preview"
    },
    "harnesses": {
      "codex": "Codex",
      "workbuddy": "WorkBuddy",
      "claude": "Claude",
      "claude-code": "Claude Code",
      "cursor": "Cursor",
      "windsurf": "Windsurf",
      "cline": "Cline",
      "aider": "Aider",
      "opencode": "OpenCode"
    }
  },
  "projects": [
    {
      "id": "pelican-bicycle",
      "title": "鹈鹕骑自行车",
      "summary": "用 SVG 画一只骑自行车的鹈鹕，纯 2D 动画。",
      "prompt": "创建一个HTML，内容是SVG，绘制一个鹈鹕骑自行车的2D动画。",
      "comment": "deepseek-v4.1-flash在WorkBuddy上第1轮惨不忍睹，这个飞出去的腿让人啼笑皆非。Codex上第1轮明显好多了，但多了一个碍眼的骑行水壶。第2轮以上两者均修复完毕。\nglm-5.3-flash在WorkBuddy上，第1轮真的笑掉大牙，这个踏板是直接飞出去了，脚也在左右摆荡，根本没在旋转。第2轮修复完毕。\nhy4-preview在WorkBuddy上，有史以来1轮通过的选手！物理没有崩坏！🎉",
      "promptUrl": "pelican-bicycle/pelican-bicycle.prompt.txt",
      "commentUrl": "pelican-bicycle/pelican-bicycle.comment.txt",
      "statusUrl": "pelican-bicycle/pelican-bicycle.status.json",
      "runs": [
        {
          "id": "deepseek-v41-flash.codex.1",
          "model": "deepseek-v41-flash",
          "harness": "codex",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.deepseek-v41-flash.codex.1/pelican-bicycle.deepseek-v41-flash.codex.1.html",
          "status": "多了个水壶"
        },
        {
          "id": "deepseek-v41-flash.codex.2",
          "model": "deepseek-v41-flash",
          "harness": "codex",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.deepseek-v41-flash.codex.2/pelican-bicycle.deepseek-v41-flash.codex.2.html",
          "status": "完美通过"
        },
        {
          "id": "deepseek-v41-flash.workbuddy.1",
          "model": "deepseek-v41-flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.deepseek-v41-flash.workbuddy.1/pelican-bicycle.deepseek-v41-flash.workbuddy.1.html",
          "status": "鹈鹕脚飞了"
        },
        {
          "id": "deepseek-v41-flash.workbuddy.2",
          "model": "deepseek-v41-flash",
          "harness": "workbuddy",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.deepseek-v41-flash.workbuddy.2/pelican-bicycle.deepseek-v41-flash.workbuddy.2.html",
          "status": "完美通过"
        },
        {
          "id": "glm-5.3-flash.workbuddy.1",
          "model": "glm-5.3-flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.glm-5.3-flash.workbuddy.1/pelican-bicycle.glm-5.3-flash.workbuddy.1.html",
          "status": "踏板飞了，鹈鹕脚摆动"
        },
        {
          "id": "glm-5.3-flash.workbuddy.2",
          "model": "glm-5.3-flash",
          "harness": "workbuddy",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.glm-5.3-flash.workbuddy.2/pelican-bicycle.glm-5.3-flash.workbuddy.2.html",
          "status": "完美通过"
        },
        {
          "id": "hy4-preview.workbuddy.1",
          "model": "hy4-preview",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.hy4-preview.workbuddy.1/pelican-bicycle.hy4-preview.workbuddy.1.html",
          "status": "一轮通过🎉"
        }
      ]
    },
    {
      "id": "snake",
      "title": "贪吃蛇",
      "summary": "",
      "prompt": "写一个贪吃蛇小游戏，单文件HTML，打开即可玩。",
      "comment": "deepseek-v4.1-flash在WorkBuddy和在Codex上均一轮通过可以玩耍。Codex上，蛇移动是一格一格跳，略微复古，但是蛇身贯通比较好看；WorkBuddy上，蛇是连续移动的，但是蛇看起来一节一节，每节中间有较大空隙，并据实测反馈，有点延迟，略微影响游戏体验。",
      "promptUrl": "snake/snake.prompt.txt",
      "commentUrl": "snake/snake.comment.txt",
      "statusUrl": "",
      "runs": [
        {
          "id": "deepseek-v41-flash.codex.1",
          "model": "deepseek-v41-flash",
          "harness": "codex",
          "attempt": 1,
          "file": "snake/snake.deepseek-v41-flash.codex.1/snake.deepseek-v41-flash.codex.1.html",
          "shot": "snake/snake.deepseek-v41-flash.codex.1/snake.deepseek-v41-flash.codex.1.png"
        },
        {
          "id": "deepseek-v41-flash.workbuddy.1",
          "model": "deepseek-v41-flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.deepseek-v41-flash.workbuddy.1/snake.deepseek-v41-flash.workbuddy.1.html",
          "shot": "snake/snake.deepseek-v41-flash.workbuddy.1/snake.deepseek-v41-flash.workbuddy.1.png"
        }
      ]
    }
  ]
};
