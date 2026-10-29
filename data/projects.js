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
      "deepseek-harness": "DeepSeek Harness",
      "trae-cn": "TRAE",
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
        "hy4-preview.workbuddy",
        "space-bunny.workbuddy",
        "mimo-v2.6-pro.workbuddy",
        "step-5-preview.workbuddy",
        "DeepSeek-V4.1-Flash-1017.codex",
        "DeepSeek-V4.1-Flash-1017.workbuddy",
        "DeepSeek-V4.1-Flash-1017.trae-cn",
        "DeepSeek-V4.1-Flash-1017.deepseek-harness",
        "MiniMax-M3.1-Flash.workbuddy"
      ],
      "reviews": {
        "deepseek-v41-flash.codex": "一轮通过。蛇是一格一格跳的复古手感，但蛇身连贯、画面干净。",
        "deepseek-v41-flash.workbuddy": "蛇的每节之间间隙较大，实测有可感知的延迟。",
        "glm-5.3-flash.workbuddy": "逻辑基本正确，但只能用上/下键开始，左/右键无效；移动端页面还显示不全。",
        "hy4-preview.workbuddy": "逻辑正确，没有延迟，有一个小瑕疵：蛇的两个眼睛竟然是一前一后的。",
        "space-bunny.workbuddy": "一轮通过、没有延迟，交付速度也是最快的；但蛇没有眼睛，蛇身用格子染色，UI 明显偷懒。",
        "step-5-preview.workbuddy": "逻辑正确、没有延迟，但一进页面就零帧起手、蛇直接撞墙；吃豆加速 5 次后快到无法微操，体验极差。移动端显示不全。",
        "mimo-v2.6-pro.workbuddy": "逻辑正确，但蛇头没画眼睛，整体观感和 Space-Bunny 很接近。",
        "DeepSeek-V4.1-Flash-1017.codex": "这是我见过做的最好的贪吃蛇，没有之一！移动丝滑，还做了经典和穿墙两个模式，整体界面布局很干净。",
        "MiniMax-M3.1-Flash.workbuddy": "一轮通过，逻辑正确，没有延迟",
        "DeepSeek-V4.1-Flash-1017.workbuddy": "一轮通过，逻辑正确，没有延迟",
        "DeepSeek-V4.1-Flash-1017.trae-cn": "一轮通过，逻辑正确，没有延迟，锦上添花的是做了吃到果子时候果子碎裂的特效。",
        "DeepSeek-V4.1-Flash-1017.deepseek-harness": "一轮通过，逻辑正确，蛇连贯运动，旁边的提示文字做得很好；还做了蛇吐舌和吃到东西时候的特效，不错。"
      },
      "reviewsUrl": "snake/snake.reviews.json",
      "runs": [
        {
          "id": "DeepSeek-V4.1-Flash-1017.codex.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "codex",
          "attempt": 1,
          "file": "snake/snake.DeepSeek-V4.1-Flash-1017.codex.1/snake.DeepSeek-V4.1-Flash-1017.codex.1.html",
          "shot": "snake/snake.DeepSeek-V4.1-Flash-1017.codex.1/snake.DeepSeek-V4.1-Flash-1017.codex.1.webp",
          "tone": "green"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.deepseek-harness.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "deepseek-harness",
          "attempt": 1,
          "file": "snake/snake.DeepSeek-V4.1-Flash-1017.deepseek-harness.1/snake.DeepSeek-V4.1-Flash-1017.deepseek-harness.1.html",
          "shot": "snake/snake.DeepSeek-V4.1-Flash-1017.deepseek-harness.1/snake.DeepSeek-V4.1-Flash-1017.deepseek-harness.1.webp",
          "tone": "green"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.trae-cn.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "trae-cn",
          "attempt": 1,
          "file": "snake/snake.DeepSeek-V4.1-Flash-1017.trae-cn.1/snake.DeepSeek-V4.1-Flash-1017.trae-cn.1.html",
          "shot": "snake/snake.DeepSeek-V4.1-Flash-1017.trae-cn.1/snake.DeepSeek-V4.1-Flash-1017.trae-cn.1.webp",
          "tone": "green"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.workbuddy.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.DeepSeek-V4.1-Flash-1017.workbuddy.1/snake.DeepSeek-V4.1-Flash-1017.workbuddy.1.html",
          "shot": "snake/snake.DeepSeek-V4.1-Flash-1017.workbuddy.1/snake.DeepSeek-V4.1-Flash-1017.workbuddy.1.webp",
          "tone": "green"
        },
        {
          "id": "deepseek-v41-flash.codex.1",
          "model": "deepseek-v41-flash",
          "harness": "codex",
          "attempt": 1,
          "file": "snake/snake.deepseek-v41-flash.codex.1/snake.deepseek-v41-flash.codex.1.html",
          "shot": "snake/snake.deepseek-v41-flash.codex.1/snake.deepseek-v41-flash.codex.1.webp",
          "tone": "green"
        },
        {
          "id": "deepseek-v41-flash.workbuddy.1",
          "model": "deepseek-v41-flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.deepseek-v41-flash.workbuddy.1/snake.deepseek-v41-flash.workbuddy.1.html",
          "shot": "snake/snake.deepseek-v41-flash.workbuddy.1/snake.deepseek-v41-flash.workbuddy.1.webp",
          "tone": "red"
        },
        {
          "id": "glm-5.3-flash.workbuddy.1",
          "model": "glm-5.3-flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.glm-5.3-flash.workbuddy.1/snake.glm-5.3-flash.workbuddy.1.html",
          "shot": "snake/snake.glm-5.3-flash.workbuddy.1/snake.glm-5.3-flash.workbuddy.1.webp",
          "tone": "red"
        },
        {
          "id": "hy4-preview.workbuddy.1",
          "model": "hy4-preview",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.hy4-preview.workbuddy.1/snake.hy4-preview.workbuddy.1.html",
          "shot": "snake/snake.hy4-preview.workbuddy.1/snake.hy4-preview.workbuddy.1.webp",
          "tone": "yellow"
        },
        {
          "id": "mimo-v2.6-pro.workbuddy.1",
          "model": "mimo-v2.6-pro",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.mimo-v2.6-pro.workbuddy.1/snake.mimo-v2.6-pro.workbuddy.1.html",
          "shot": "snake/snake.mimo-v2.6-pro.workbuddy.1/snake.mimo-v2.6-pro.workbuddy.1.webp",
          "tone": "yellow"
        },
        {
          "id": "MiniMax-M3.1-Flash.workbuddy.1",
          "model": "MiniMax-M3.1-Flash",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.MiniMax-M3.1-Flash.workbuddy.1/snake.MiniMax-M3.1-Flash.workbuddy.1.html",
          "shot": "snake/snake.MiniMax-M3.1-Flash.workbuddy.1/snake.MiniMax-M3.1-Flash.workbuddy.1.webp",
          "tone": "green"
        },
        {
          "id": "space-bunny.workbuddy.1",
          "model": "space-bunny",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.space-bunny.workbuddy.1/snake.space-bunny.workbuddy.1.html",
          "shot": "snake/snake.space-bunny.workbuddy.1/snake.space-bunny.workbuddy.1.webp",
          "tone": "yellow"
        },
        {
          "id": "step-5-preview.workbuddy.1",
          "model": "step-5-preview",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.step-5-preview.workbuddy.1/snake.step-5-preview.workbuddy.1.html",
          "shot": "snake/snake.step-5-preview.workbuddy.1/snake.step-5-preview.workbuddy.1.webp",
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
        "hy4-preview.workbuddy": "第 1 轮运动逻辑和空间位置都正确，鹈鹕画的略微丑。",
        "space-bunny.workbuddy": "两次机会内没修好：第 1 轮背景（山、树、路虚线）会跳变，第 2 轮路肩又跳变。",
        "step-5-preview.workbuddy": "两次机会都没过：第 1 轮腿像纸片一样翻转，第 2 轮画蛇添足把两条腿连成了橙色三角形。",
        "mimo-v2.6-pro.workbuddy": "第 1 轮腿在摆动，没有随踏板一起移动；第 2 轮代表脚的那个椭圆放得太靠上，小腿在脚之下还多出一截。",
        "DeepSeek-V4.1-Flash-1017.codex": "第 1 轮就做出了空间位置和运动逻辑正确的作品，唯一不足的是鹈鹕是白眼，勉强过关。",
        "DeepSeek-V4.1-Flash-1017.workbuddy": "第 1 轮运动逻辑和空间位置都正确，不足的是踏板旋转速度过慢，看起来像老年人中的老年人骑自行车，勉强过关。",
        "DeepSeek-V4.1-Flash-1017.trae-cn": "第 1 轮运动逻辑和空间位置都正确，甚至还细心的做了气门芯，非常不错，一轮过关。",
        "DeepSeek-V4.1-Flash-1017.deepseek-harness": "第 1 轮运动逻辑正确，但是路中心虚线和海浪滚动方向不对；第 2 轮修正，过关。",
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
          "id": "DeepSeek-V4.1-Flash-1017.deepseek-harness.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "deepseek-harness",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.DeepSeek-V4.1-Flash-1017.deepseek-harness.1/pelican-bicycle.DeepSeek-V4.1-Flash-1017.deepseek-harness.1.html",
          "tone": "red"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.deepseek-harness.2",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "deepseek-harness",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.DeepSeek-V4.1-Flash-1017.deepseek-harness.2/pelican-bicycle.DeepSeek-V4.1-Flash-1017.deepseek-harness.2.html",
          "tone": "green"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.trae-cn.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "trae-cn",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.DeepSeek-V4.1-Flash-1017.trae-cn.1/pelican-bicycle.DeepSeek-V4.1-Flash-1017.trae-cn.1.html",
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
    },
    {
      "id": "panda-waimai",
      "title": "熊猫送外卖",
      "summary": "",
      "prompt": "写一个html，内容是svg的2D动画：熊猫骑电动车送外卖，佩戴交规要求的安全装备，带外卖箱，在有很多商铺的街上行驶，商铺至少3家有招牌，不要重复路过同一家店，最终停在一个居民楼楼下，并显示文字“外卖已送达！”，可允许用户手动重播动画，但不得自动重播。",
      "promptUrl": "panda-waimai/panda-waimai.prompt.txt",
      "tier": "gold",
      "chances": 3,
      "order": 3,
      "entryOrder": [
        "DeepSeek-V4.1-Flash-1017.codex",
        "DeepSeek-V4.1-Flash-1017.workbuddy",
        "hy4-preview.workbuddy",
        "DeepSeek-V4.1-Flash-1017.trae-cn"
      ],
      "reviews": {
        "DeepSeek-V4.1-Flash-1017.codex": "第 1 轮，自动车停在了面馆，离居民楼还有一段距离就显示已送达，第 2 轮修复完毕。",
        "DeepSeek-V4.1-Flash-1017.workbuddy": "第 1 轮逻辑全部正常，一轮通关。",
        "hy4-preview.workbuddy": "一轮通过，逻辑没有问题！",
        "DeepSeek-V4.1-Flash-1017.trae-cn": "前两轮均因思考过程太长超出限制，被Harness异常打断，两轮均无成品即视为放弃第3轮参赛，最终没有成品。"
      },
      "reviewsUrl": "panda-waimai/panda-waimai.reviews.json",
      "runs": [
        {
          "id": "DeepSeek-V4.1-Flash-1017.codex.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "codex",
          "attempt": 1,
          "file": "panda-waimai/panda-waimai.DeepSeek-V4.1-Flash-1017.codex.1/panda-waimai.DeepSeek-V4.1-Flash-1017.codex.1.html",
          "tone": "red"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.codex.2",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "codex",
          "attempt": 2,
          "file": "panda-waimai/panda-waimai.DeepSeek-V4.1-Flash-1017.codex.2/panda-waimai.DeepSeek-V4.1-Flash-1017.codex.2.html",
          "tone": "green"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.trae-cn.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "trae-cn",
          "attempt": 1,
          "abnormal": true,
          "dump": "TRAE异常打断模型思考：输出过长，请输入「继续」以获取更多内容。因此本轮无输出。",
          "dumpExcerpt": "TRAE异常打断模型思考：输出过长，请输入「继续」以获取更多内容。因此本轮无输出。",
          "tone": "red"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.trae-cn.2",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "trae-cn",
          "attempt": 2,
          "abnormal": true,
          "dump": "TRAE异常打断模型思考：输出过长，请输入「继续」以获取更多内容。因此本轮无输出。",
          "dumpExcerpt": "TRAE异常打断模型思考：输出过长，请输入「继续」以获取更多内容。因此本轮无输出。",
          "tone": "red"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.trae-cn.3",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "trae-cn",
          "attempt": 3,
          "forfeit": true,
          "message": "由于前两轮模型均在异常状态，第三轮视为放弃参赛。",
          "tone": "red"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017.workbuddy.1",
          "model": "DeepSeek-V4.1-Flash-1017",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "panda-waimai/panda-waimai.DeepSeek-V4.1-Flash-1017.workbuddy.1/panda-waimai.DeepSeek-V4.1-Flash-1017.workbuddy.1.html",
          "tone": "green"
        },
        {
          "id": "hy4-preview.workbuddy.1",
          "model": "hy4-preview",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "panda-waimai/panda-waimai.hy4-preview.workbuddy.1/panda-waimai.hy4-preview.workbuddy.1.html",
          "tone": "green"
        }
      ]
    }
  ]
};
