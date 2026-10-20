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
      "deepseek-v41-flash": "DeepSeek-V4.1-Flash",
      "glm-5.3-flash": "GLM-5.3-Flash",
      "hy4-preview": "Hy4-Preview",
      "space-bunny": "Space-Bunny",
      "step-5-preview": "Step-5-Preview",
      "mimo-v2.6-pro": "MiMo-V2.6-Pro",
      "DeepSeek-V4.1-Flash-1017": "DeepSeek-V4.1-Flash-1017",
      "MiniMax-M3.1-Flash": "MiniMax-M3.1-Flash"
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
      "id": "snake",
      "title": "贪吃蛇",
      "summary": "",
      "prompt": "写一个贪吃蛇小游戏，单文件HTML，打开即可玩。",
      "promptUrl": "snake/snake.prompt.txt",
      "tier": "bronze",
      "chances": 1,
      "order": 1,
      "entryOrder": [
        "deepseek-v41-flash.codex",
        "deepseek-v41-flash.workbuddy",
        "glm-5.3-flash.workbuddy",
        "space-bunny.workbuddy",
        "mimo-v2.6-pro.workbuddy",
        "step-5-preview.workbuddy",
        "DeepSeek-V4.1-Flash-1017.codex",
        "DeepSeek-V4.1-Flash-1017.workbuddy",
        "MiniMax-M3.1-Flash.workbuddy"
      ],
      "reviews": {
        "deepseek-v41-flash.codex": "一轮通过。蛇是一格一格跳的复古手感，但蛇身连贯、画面干净。",
        "deepseek-v41-flash.workbuddy": "蛇的每节之间间隙较大，实测有可感知的延迟。",
        "glm-5.3-flash.workbuddy": "逻辑基本正确，但只能用上/下键开始，左/右键无效；移动端页面还显示不全。",
        "space-bunny.workbuddy": "一轮通过、没有延迟，交付速度也是最快的；但蛇没有眼睛，蛇身用格子染色，UI 明显偷懒。",
        "step-5-preview.workbuddy": "逻辑正确、没有延迟，但一进页面就零帧起手、蛇直接撞墙；吃豆加速 5 次后快到无法微操，体验极差。移动端显示不全。",
        "mimo-v2.6-pro.workbuddy": "逻辑正确，但蛇头没画眼睛，整体观感和 Space-Bunny 很接近。",
        "DeepSeek-V4.1-Flash-1017.codex": "这是我见过做的最好的贪吃蛇，没有之一！移动丝滑，还做了经典和穿墙两个模式，整体界面布局很干净。",
        "MiniMax-M3.1-Flash.workbuddy": "一轮通过，逻辑正确，没有延迟",
        "DeepSeek-V4.1-Flash-1017.workbuddy": "一轮通过，逻辑正确，没有延迟"
      },
      "reviewsUrl": "snake/snake.reviews.json",
      "runs": [
        {
          "id": "DeepSeek-V4.1-Flash-1017.codex.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "codex",
          "attempt": 1,
          "file": "snake/snake.DeepSeek-V4.1-Flash-1017.codex.1/snake.DeepSeek-V4.1-Flash-1017.codex.1.html",
          "shot": "snake/snake.DeepSeek-V4.1-Flash-1017.codex.1/snake.DeepSeek-V4.1-Flash-1017.codex.1.png",
          "tone": "green"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.workbuddy.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.DeepSeek-V4.1-Flash-1017.workbuddy.1/snake.DeepSeek-V4.1-Flash-1017.workbuddy.1.html",
          "shot": "snake/snake.DeepSeek-V4.1-Flash-1017.workbuddy.1/snake.DeepSeek-V4.1-Flash-1017.workbuddy.1.png",
          "tone": "green"
        },
        {
          "id": "deepseek-v41-flash.codex.1",
          "model": "deepseek-v41-flash",
          "harness": "codex",
          "attempt": 1,
          "file": "snake/snake.deepseek-v41-flash.codex.1/snake.deepseek-v41-flash.codex.1.html",
          "shot": "snake/snake.deepseek-v41-flash.codex.1/snake.deepseek-v41-flash.codex.1.png",
          "tone": "green"
        },
        {
          "id": "deepseek-v41-flash.workbuddy.1",
          "model": "deepseek-v41-flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.deepseek-v41-flash.workbuddy.1/snake.deepseek-v41-flash.workbuddy.1.html",
          "shot": "snake/snake.deepseek-v41-flash.workbuddy.1/snake.deepseek-v41-flash.workbuddy.1.png",
          "tone": "red"
        },
        {
          "id": "glm-5.3-flash.workbuddy.1",
          "model": "glm-5.3-flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.glm-5.3-flash.workbuddy.1/snake.glm-5.3-flash.workbuddy.1.html",
          "shot": "snake/snake.glm-5.3-flash.workbuddy.1/snake.glm-5.3-flash.workbuddy.1.png",
          "tone": "red"
        },
        {
          "id": "mimo-v2.6-pro.workbuddy.1",
          "model": "mimo-v2.6-pro",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.mimo-v2.6-pro.workbuddy.1/snake.mimo-v2.6-pro.workbuddy.1.html",
          "shot": "snake/snake.mimo-v2.6-pro.workbuddy.1/snake.mimo-v2.6-pro.workbuddy.1.png",
          "tone": "yellow"
        },
        {
          "id": "MiniMax-M3.1-Flash.workbuddy.1",
          "model": "MiniMax-M3.1-Flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.MiniMax-M3.1-Flash.workbuddy.1/snake.MiniMax-M3.1-Flash.workbuddy.1.html",
          "shot": "snake/snake.MiniMax-M3.1-Flash.workbuddy.1/snake.MiniMax-M3.1-Flash.workbuddy.1.png",
          "tone": "green"
        },
        {
          "id": "space-bunny.workbuddy.1",
          "model": "space-bunny",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.space-bunny.workbuddy.1/snake.space-bunny.workbuddy.1.html",
          "shot": "snake/snake.space-bunny.workbuddy.1/snake.space-bunny.workbuddy.1.png",
          "tone": "yellow"
        },
        {
          "id": "step-5-preview.workbuddy.1",
          "model": "step-5-preview",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.step-5-preview.workbuddy.1/snake.step-5-preview.workbuddy.1.html",
          "shot": "snake/snake.step-5-preview.workbuddy.1/snake.step-5-preview.workbuddy.1.png",
          "tone": "red"
        }
      ]
    },
    {
      "id": "pelican-bicycle",
      "title": "鹈鹕骑自行车",
      "summary": "用 SVG 画一只骑自行车的鹈鹕，纯 2D 动画。",
      "prompt": "创建一个HTML，内容是SVG，绘制一个鹈鹕骑自行车的2D动画。",
      "promptUrl": "pelican-bicycle/pelican-bicycle.prompt.txt",
      "tier": "silver",
      "chances": 2,
      "order": 2,
      "entryOrder": [],
      "reviews": {
        "deepseek-v41-flash.codex": "第 1 轮就画得很完整，只是多了一只碍眼的骑行水壶；第 2 轮修掉后两轮内过关。",
        "deepseek-v41-flash.workbuddy": "第 1 轮鹈鹕的腿直接飞出去了，第 2 轮完全修好，纠错速度不错。",
        "glm-5.3-flash.workbuddy": "第 1 轮踏板直接飞出、脚在左右摆荡，根本没在转；第 2 轮修好，两轮内过关。",
        "hy4-preview.workbuddy": "第 1 轮就通过，物理没有崩坏，是这条赛题上最干脆的选手。",
        "space-bunny.workbuddy": "两次机会内没修好：第 1 轮背景（山、树、路虚线）会跳变，第 2 轮路肩又跳变。",
        "step-5-preview.workbuddy": "两次机会都没过：第 1 轮腿像纸片一样翻转，第 2 轮画蛇添足把两条腿连成了橙色三角形。",
        "mimo-v2.6-pro.workbuddy": "第 1 轮腿在摆动，没有随踏板一起移动；第 2 轮代表脚的那个椭圆放得太靠上，小腿在脚之下还多出一截。",
        "DeepSeek-V4.1-Flash-1017.codex": "第 1 轮就做出了空间位置和运动逻辑正确的作品，唯一不足的是鹈鹕是白眼，勉强过关。",
        "DeepSeek-V4.1-Flash-1017.workbuddy": "第 1 轮运动逻辑和空间位置都正确，不足的是踏板旋转速度过慢，看起来像老年人中的老年人骑自行车，勉强过关。",
        "MiniMax-M3.1-Flash.workbuddy": "两次机会都没过：第 1 轮看起来踏板只有一侧，另一条腿看起来悬空转；第 2 轮加了膝盖，并把踏板修好了，但是膝盖是向后弯的。"
      },
      "reviewsUrl": "pelican-bicycle/pelican-bicycle.reviews.json",
      "runs": [
        {
          "id": "DeepSeek-V4.1-Flash-1017.codex.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "codex",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.DeepSeek-V4.1-Flash-1017.codex.1/pelican-bicycle.DeepSeek-V4.1-Flash-1017.codex.1.html",
          "tone": "green"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.workbuddy.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.DeepSeek-V4.1-Flash-1017.workbuddy.1/pelican-bicycle.DeepSeek-V4.1-Flash-1017.workbuddy.1.html",
          "tone": "green"
        },
        {
          "id": "deepseek-v41-flash.codex.1",
          "model": "deepseek-v41-flash",
          "harness": "codex",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.deepseek-v41-flash.codex.1/pelican-bicycle.deepseek-v41-flash.codex.1.html",
          "tone": "red"
        },
        {
          "id": "deepseek-v41-flash.codex.2",
          "model": "deepseek-v41-flash",
          "harness": "codex",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.deepseek-v41-flash.codex.2/pelican-bicycle.deepseek-v41-flash.codex.2.html",
          "tone": "green"
        },
        {
          "id": "deepseek-v41-flash.workbuddy.1",
          "model": "deepseek-v41-flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.deepseek-v41-flash.workbuddy.1/pelican-bicycle.deepseek-v41-flash.workbuddy.1.html",
          "tone": "red"
        },
        {
          "id": "deepseek-v41-flash.workbuddy.2",
          "model": "deepseek-v41-flash",
          "harness": "workbuddy",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.deepseek-v41-flash.workbuddy.2/pelican-bicycle.deepseek-v41-flash.workbuddy.2.html",
          "tone": "green"
        },
        {
          "id": "glm-5.3-flash.workbuddy.1",
          "model": "glm-5.3-flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.glm-5.3-flash.workbuddy.1/pelican-bicycle.glm-5.3-flash.workbuddy.1.html",
          "tone": "red"
        },
        {
          "id": "glm-5.3-flash.workbuddy.2",
          "model": "glm-5.3-flash",
          "harness": "workbuddy",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.glm-5.3-flash.workbuddy.2/pelican-bicycle.glm-5.3-flash.workbuddy.2.html",
          "tone": "green"
        },
        {
          "id": "hy4-preview.workbuddy.1",
          "model": "hy4-preview",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.hy4-preview.workbuddy.1/pelican-bicycle.hy4-preview.workbuddy.1.html",
          "tone": "green"
        },
        {
          "id": "mimo-v2.6-pro.workbuddy.1",
          "model": "mimo-v2.6-pro",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.mimo-v2.6-pro.workbuddy.1/pelican-bicycle.mimo-v2.6-pro.workbuddy.1.html",
          "tone": "red"
        },
        {
          "id": "mimo-v2.6-pro.workbuddy.2",
          "model": "mimo-v2.6-pro",
          "harness": "workbuddy",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.mimo-v2.6-pro.workbuddy.2/pelican-bicycle.mimo-v2.6-pro.workbuddy.2.html",
          "tone": "red"
        },
        {
          "id": "MiniMax-M3.1-Flash.workbuddy.1",
          "model": "MiniMax-M3.1-Flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.MiniMax-M3.1-Flash.workbuddy.1/pelican-bicycle.MiniMax-M3.1-Flash.workbuddy.1.html",
          "tone": "red"
        },
        {
          "id": "MiniMax-M3.1-Flash.workbuddy.2",
          "model": "MiniMax-M3.1-Flash",
          "harness": "workbuddy",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.MiniMax-M3.1-Flash.workbuddy.2/pelican-bicycle.MiniMax-M3.1-Flash.workbuddy.2.html",
          "tone": "red"
        },
        {
          "id": "space-bunny.workbuddy.1",
          "model": "space-bunny",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.space-bunny.workbuddy.1/pelican-bicycle.space-bunny.workbuddy.1.html",
          "tone": "red"
        },
        {
          "id": "space-bunny.workbuddy.2",
          "model": "space-bunny",
          "harness": "workbuddy",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.space-bunny.workbuddy.2/pelican-bicycle.space-bunny.workbuddy.2.html",
          "tone": "red"
        },
        {
          "id": "step-5-preview.workbuddy.1",
          "model": "step-5-preview",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.step-5-preview.workbuddy.1/pelican-bicycle.step-5-preview.workbuddy.1.html",
          "tone": "red"
        },
        {
          "id": "step-5-preview.workbuddy.2",
          "model": "step-5-preview",
          "harness": "workbuddy",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.step-5-preview.workbuddy.2/pelican-bicycle.step-5-preview.workbuddy.2.html",
          "tone": "red"
        }
      ]
    }
  ]
};
