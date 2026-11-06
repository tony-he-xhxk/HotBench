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
      "MiniMax-M3.1-Flash": "MiniMax-M3.1-Flash",
      "Hy4": "Hy4"
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
        "glm-5.3-flash.trae-cn",
        "hy4-preview.workbuddy",
        "space-bunny.workbuddy",
        "mimo-v2.6-pro.workbuddy",
        "mimo-v2.6-pro.trae-cn",
        "step-5-preview.workbuddy",
        "step-5-preview.trae-cn",
        "DeepSeek-V4.1-Flash-1017.codex",
        "DeepSeek-V4.1-Flash-1017.workbuddy",
        "DeepSeek-V4.1-Flash-1017.trae-cn",
        "DeepSeek-V4.1-Flash-1017.deepseek-harness",
        "MiniMax-M3.1-Flash.workbuddy",
        "MiniMax-M3.1-Flash.trae-cn",
        "Hy4.workbuddy"
      ],
      "reviews": {
        "deepseek-v41-flash.codex": "一轮通过。蛇是一格一格跳的复古手感，但蛇身连贯、画面干净。",
        "deepseek-v41-flash.workbuddy": "蛇的每节之间间隙较大，实测有可感知的延迟。",
        "glm-5.3-flash.workbuddy": "逻辑基本正确，但只能用上/下键开始，左/右键无效；移动端页面还显示不全。",
        "glm-5.3-flash.trae-cn": "逻辑基本正确，但是未做移动端适配，移动端滑动无响应。",
        "hy4-preview.workbuddy": "逻辑正确，没有延迟，有一个小瑕疵：蛇的两个眼睛竟然是一前一后的。",
        "Hy4.workbuddy": "一轮通过，逻辑正确，没有明显问题。",
        "space-bunny.workbuddy": "一轮通过、没有延迟，交付速度也是最快的；但蛇没有眼睛，蛇身用格子染色，UI 明显偷懒。",
        "step-5-preview.workbuddy": "逻辑正确、没有延迟，但一进页面就零帧起手、蛇直接撞墙；吃豆加速 5 次后快到无法微操，体验极差。移动端显示不全。",
        "step-5-preview.trae-cn": "逻辑正确、没有延迟，但移动端窗口无法动态适配，导致虽然滑动可以显示全，但是页面滑动与游玩时滑动逻辑冲突，并且蛇可能跑出视口。",
        "mimo-v2.6-pro.workbuddy": "逻辑正确，但蛇头没画眼睛，整体观感和 Space-Bunny 很接近。",
        "mimo-v2.6-pro.trae-cn": "一轮通过，逻辑正确，没有延迟",
        "DeepSeek-V4.1-Flash-1017.codex": "这是我见过做的最好的贪吃蛇，没有之一！移动丝滑，还做了经典和穿墙两个模式，整体界面布局很干净。",
        "MiniMax-M3.1-Flash.workbuddy": "一轮通过，逻辑正确，没有延迟",
        "MiniMax-M3.1-Flash.trae-cn": "点按任何按键都无法开始游戏，它甚至不让人开始游戏（恼）",
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
          "id": "glm-5.3-flash.trae-cn.1",
          "model": "glm-5.3-flash",
          "harness": "trae-cn",
          "attempt": 1,
          "file": "snake/snake.glm-5.3-flash.trae-cn.1/snake.glm-5.3-flash.trae-cn.1.html",
          "shot": "snake/snake.glm-5.3-flash.trae-cn.1/snake.glm-5.3-flash.trae-cn.1.webp",
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
          "id": "Hy4.workbuddy.1",
          "model": "Hy4",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "snake/snake.Hy4.workbuddy.1/snake.Hy4.workbuddy.1.html",
          "shot": "snake/snake.Hy4.workbuddy.1/snake.Hy4.workbuddy.1.webp",
          "tone": "green"
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
          "id": "mimo-v2.6-pro.trae-cn.1",
          "model": "mimo-v2.6-pro",
          "harness": "trae-cn",
          "attempt": 1,
          "file": "snake/snake.mimo-v2.6-pro.trae-cn.1/snake.mimo-v2.6-pro.trae-cn.1.html",
          "shot": "snake/snake.mimo-v2.6-pro.trae-cn.1/snake.mimo-v2.6-pro.trae-cn.1.webp",
          "tone": "green"
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
          "id": "MiniMax-M3.1-Flash.trae-cn.1",
          "model": "MiniMax-M3.1-Flash",
          "harness": "trae-cn",
          "attempt": 1,
          "file": "snake/snake.MiniMax-M3.1-Flash.trae-cn.1/snake.MiniMax-M3.1-Flash.trae-cn.1.html",
          "shot": "snake/snake.MiniMax-M3.1-Flash.trae-cn.1/snake.MiniMax-M3.1-Flash.trae-cn.1.webp",
          "tone": "red"
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
          "id": "step-5-preview.trae-cn.1",
          "model": "step-5-preview",
          "harness": "trae-cn",
          "attempt": 1,
          "file": "snake/snake.step-5-preview.trae-cn.1/snake.step-5-preview.trae-cn.1.html",
          "shot": "snake/snake.step-5-preview.trae-cn.1/snake.step-5-preview.trae-cn.1.webp",
          "tone": "red"
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
        "glm-5.3-flash.workbuddy": "第 1 轮踏板直接飞出、脚在左右摆荡，根本没在转；第 2 轮修好了踏板和脚，但是远端腿与车架的遮挡关系不对，不通过。",
        "glm-5.3-flash.trae-cn": "第 1 轮腿与身体脱节，远侧腿在某时刻会因为长度而伸直，不符合逻辑，背景的树木跳变；第 2 轮修复完毕。",
        "hy4-preview.workbuddy": "第 1 轮完全崩坏，头、尾翼全飞到左上角，膝盖向后弯，还多了个碍眼的骑行水壶；第 2 轮修复完毕，但是真的感觉超级丑。",
        "Hy4.workbuddy": "第 1 轮翅膀太短，只用脚骑车不现实，远侧腿在某时刻会因为长度而伸直，不符合逻辑，马路虚线移动方向错误，远端腿与车架遮挡关系不对；第 2 轮修复完毕。",
        "space-bunny.workbuddy": "两次机会内没修好：第 1 轮背景（山、树、路虚线）会跳变，第 2 轮路肩又跳变。",
        "step-5-preview.workbuddy": "两次机会都没过：第 1 轮腿像纸片一样翻转，第 2 轮画蛇添足把两条腿连成了橙色三角形。",
        "step-5-preview.trae-cn": "第 1 轮因为思考过程超出长度被Harness异常打断，第 2 轮写了文件，但是踏板与踏板转轴脱节（转动速度不同），鹈鹕翅膀过短，背景树木会突然出现，不通过。",
        "mimo-v2.6-pro.workbuddy": "第 1 轮腿在摆动，没有随踏板一起移动；第 2 轮代表脚的那个椭圆放得太靠上，小腿在脚之下还多出一截，而且远端腿与车架的遮挡关系不对，仍然不通过。",
        "mimo-v2.6-pro.trae-cn": "第 1 轮背景树木和路面虚线会突然跳出而非连续移过去，第 2 轮修复完毕。",
        "DeepSeek-V4.1-Flash-1017.codex": "第 1 轮就做出了空间位置和运动逻辑正确的作品，唯一不足的是鹈鹕是白眼，勉强过关。",
        "DeepSeek-V4.1-Flash-1017.workbuddy": "第 1 轮运动逻辑和空间位置都正确，不足的是踏板旋转速度过慢，看起来像老年人中的老年人骑自行车，勉强过关。",
        "DeepSeek-V4.1-Flash-1017.trae-cn": "第 1 轮运动逻辑和空间位置都正确，甚至还细心的做了气门芯，非常不错，一轮过关。",
        "DeepSeek-V4.1-Flash-1017.deepseek-harness": "第 1 轮运动逻辑正确，但是路中心虚线和海浪滚动方向不对；第 2 轮修正，过关。",
        "MiniMax-M3.1-Flash.workbuddy": "两次机会都没过：第 1 轮看起来踏板只有一侧，另一条腿看起来悬空转；第 2 轮加了膝盖，并把踏板修好了，但是膝盖是向后弯的。",
        "MiniMax-M3.1-Flash.trae-cn": "第 1 轮远端腿和车架的遮挡关系不对，翅膀太短，白云和风移动方向错误；第 2 轮修复完毕。"
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
          "id": "glm-5.3-flash.trae-cn.1",
          "model": "glm-5.3-flash",
          "harness": "trae-cn",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.glm-5.3-flash.trae-cn.1/pelican-bicycle.glm-5.3-flash.trae-cn.1.html",
          "tone": "red"
        },
        {
          "id": "glm-5.3-flash.trae-cn.2",
          "model": "glm-5.3-flash",
          "harness": "trae-cn",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.glm-5.3-flash.trae-cn.2/pelican-bicycle.glm-5.3-flash.trae-cn.2.html",
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
          "tone": "red"
        },
        {
          "id": "Hy4.workbuddy.1",
          "model": "Hy4",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.Hy4.workbuddy.1/pelican-bicycle.Hy4.workbuddy.1.html",
          "tone": "red"
        },
        {
          "id": "Hy4.workbuddy.2",
          "model": "Hy4",
          "harness": "workbuddy",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.Hy4.workbuddy.2/pelican-bicycle.Hy4.workbuddy.2.html",
          "tone": "green"
        },
        {
          "id": "hy4-preview.workbuddy.1",
          "model": "hy4-preview",
          "harness": "workbuddy",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.hy4-preview.workbuddy.1/pelican-bicycle.hy4-preview.workbuddy.1.html",
          "tone": "red"
        },
        {
          "id": "hy4-preview.workbuddy.2",
          "model": "hy4-preview",
          "harness": "workbuddy",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.hy4-preview.workbuddy.2/pelican-bicycle.hy4-preview.workbuddy.2.html",
          "tone": "green"
        },
        {
          "id": "mimo-v2.6-pro.trae-cn.1",
          "model": "mimo-v2.6-pro",
          "harness": "trae-cn",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.mimo-v2.6-pro.trae-cn.1/pelican-bicycle.mimo-v2.6-pro.trae-cn.1.html",
          "tone": "red"
        },
        {
          "id": "mimo-v2.6-pro.trae-cn.2",
          "model": "mimo-v2.6-pro",
          "harness": "trae-cn",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.mimo-v2.6-pro.trae-cn.2/pelican-bicycle.mimo-v2.6-pro.trae-cn.2.html",
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
          "id": "MiniMax-M3.1-Flash.trae-cn.1",
          "model": "MiniMax-M3.1-Flash",
          "harness": "trae-cn",
          "attempt": 1,
          "file": "pelican-bicycle/pelican-bicycle.MiniMax-M3.1-Flash.trae-cn.1/pelican-bicycle.MiniMax-M3.1-Flash.trae-cn.1.html",
          "tone": "red"
        },
        {
          "id": "MiniMax-M3.1-Flash.trae-cn.2",
          "model": "MiniMax-M3.1-Flash",
          "harness": "trae-cn",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.MiniMax-M3.1-Flash.trae-cn.2/pelican-bicycle.MiniMax-M3.1-Flash.trae-cn.2.html",
          "tone": "green"
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
          "id": "step-5-preview.trae-cn.1",
          "model": "step-5-preview",
          "harness": "trae-cn",
          "attempt": 1,
          "abnormal": true,
          "dump": "TRAE异常打断模型思考：输出过长，请输入「继续」以获取更多内容。因此本轮无输出。",
          "dumpExcerpt": "TRAE异常打断模型思考：输出过长，请输入「继续」以获取更多内容。因此本轮无输出。",
          "tone": "red"
        },
        {
          "id": "step-5-preview.trae-cn.2",
          "model": "step-5-preview",
          "harness": "trae-cn",
          "attempt": 2,
          "file": "pelican-bicycle/pelican-bicycle.step-5-preview.trae-cn.2/pelican-bicycle.step-5-preview.trae-cn.2.html",
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
        "DeepSeek-V4.1-Flash-1017.trae-cn"
      ],
      "reviews": {
        "DeepSeek-V4.1-Flash-1017.codex": "第 1 轮，自动车停在了面馆，离居民楼还有一段距离就显示已送达，第 2 轮修复完毕。",
        "DeepSeek-V4.1-Flash-1017.workbuddy": "第 1 轮逻辑全部正常，一轮通关。",
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
        }
      ]
    },
    {
      "id": "feihua-wenxue",
      "title": "废话文学 · 谐音梗理解",
      "summary": "",
      "type": "text",
      "order": 4,
      "prompt": "你是一位中文语义理解专家。下面共有 30 道「废话文学 / 谐音梗」题目，每一行一题。\n\n请逐题解释，要求：\n1. 严格按题号作答（第 1 题、第 2 题……），一题一段，不要合并、不要遗漏、不要自行增删题目。\n2. 每道题都要说清三件事：\n   - 字面上这句话在说什么；\n   - 它真正想表达的梗、笑点或反差是什么；\n   - 关键的谐音、双关、断句或语义反转在哪里。\n3. 解释要完整、准确、能让没看过原句的人看懂笑点；不要只复述字面，也不要跑题。\n4. 如果一句话有多种合理解读，可以把它们都写出来。\n\n输出格式示例：\n【第1题】\n解释：……\n\n题目在下方按行给出（共 30 题）：",
      "promptUrl": "feihua-wenxue/feihua-wenxue.prompt.txt",
      "questions": [
        "明知山有虎 那就别去明知山",
        "关关难过 那就哄哄关关",
        "你要稳稳的幸福 那稳稳怎么办",
        "太空才有空间站 太挤就没有空间站",
        "记住 四个周润发 就是一个月润发",
        "你歇斯底里是崩溃 底里歇斯是美味",
        "一人做事一人当 当当做事当当当",
        "是金子总会花光 慢慢急 不要来",
        "妈的表示情绪 父的表示食物",
        "失败是成功之母 扫码才成功支付",
        "驴拉磨 牛拉犁 伊拉克 马拉松 金克木 水克火 李克勤 麦克风",
        "其实我也曾经想过一了百了 可惜我 真的 了不起",
        "如果众人皆醉 那我肯定更醉",
        "退一万步来说的话 退一万步确实累",
        "普通人想要翻身 那你记得侧睡",
        "打个比方的话 比方说 你赔我医药费",
        "就像我喜欢披萨 因为它没有七片",
        "俗话说 吃一堑 那我就又长了一堑",
        "因为读书我没上兴趣班 长大没兴趣上班",
        "男儿膝下有小腿 躲得过初一 躲不过高三",
        "如果强扭的瓜不甜 你就别找强扭买瓜",
        "鲁智深倒拔垂杨柳 他赔了八千八",
        "毕竟一寸光阴一寸金 三寸光阴一个鑫",
        "我很好相处 处不好你自己找原因",
        "木兰代父从军 马尔代夫旅行",
        "一行行 行行行 一行不行 行行不行",
        "虽然我的桌子乱 可是邓紫棋",
        "成功靠后天努力 那么今天就休息",
        "毕竟 四个字 是三个字 而三个字 是四个字",
        "只要我肯放弃 这世上就无难事"
      ],
      "questionsUrl": "feihua-wenxue/feihua-wenxue.questions.txt",
      "models": [
        {
          "id": "deepseek-v41-flash",
          "name": "DeepSeek-V4.1-Flash",
          "harness": "workbuddy"
        },
        {
          "id": "DeepSeek-V4.1-Flash-1017",
          "name": "DeepSeek-V4.1-Flash-1017",
          "harness": "workbuddy"
        },
        {
          "id": "glm-5.3-flash",
          "name": "GLM-5.3-Flash",
          "harness": "workbuddy"
        },
        {
          "id": "hy4-preview",
          "name": "Hy4-Preview",
          "harness": "workbuddy"
        },
        {
          "id": "Hy4",
          "name": "Hy4",
          "harness": "workbuddy"
        },
        {
          "id": "mimo-v2.6-pro",
          "name": "MiMo-V2.6-Pro",
          "harness": "workbuddy"
        },
        {
          "id": "MiniMax-M3.1-Flash",
          "name": "MiniMax-M3.1-Flash",
          "harness": "workbuddy"
        },
        {
          "id": "space-bunny",
          "name": "Space-Bunny",
          "harness": "workbuddy"
        },
        {
          "id": "step-5-preview",
          "name": "Step-5-Preview",
          "harness": "workbuddy"
        }
      ],
      "scores": {
        "1": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "2": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 1,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 1
        },
        "3": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 0,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 0,
          "step-5-preview": 2
        },
        "4": {
          "DeepSeek-V4.1-Flash-1017": 1,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 0,
          "mimo-v2.6-pro": 2,
          "space-bunny": 0,
          "step-5-preview": 2
        },
        "5": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "6": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 0,
          "Hy4": 2,
          "glm-5.3-flash": 0,
          "mimo-v2.6-pro": 2,
          "space-bunny": 0,
          "step-5-preview": 0
        },
        "7": {
          "DeepSeek-V4.1-Flash-1017": 1,
          "hy4-preview": 0,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 0,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 0,
          "step-5-preview": 0
        },
        "8": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "9": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 0,
          "Hy4": 0,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 0,
          "step-5-preview": 0
        },
        "10": {
          "DeepSeek-V4.1-Flash-1017": 0,
          "hy4-preview": 0,
          "MiniMax-M3.1-Flash": 0,
          "Hy4": 0,
          "glm-5.3-flash": 0,
          "mimo-v2.6-pro": 0,
          "space-bunny": 0,
          "step-5-preview": 0
        },
        "11": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 0,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "12": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 1
        },
        "13": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "14": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "15": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "16": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 0,
          "step-5-preview": 2
        },
        "17": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 0,
          "MiniMax-M3.1-Flash": 0,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "18": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "19": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 1,
          "mimo-v2.6-pro": 1,
          "space-bunny": 1,
          "step-5-preview": 2
        },
        "20": {
          "DeepSeek-V4.1-Flash-1017": 1,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "21": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 0,
          "step-5-preview": 2
        },
        "22": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "23": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "24": {
          "DeepSeek-V4.1-Flash-1017": 0,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 0,
          "mimo-v2.6-pro": 0,
          "space-bunny": 2,
          "step-5-preview": 0
        },
        "25": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "26": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 0,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 0,
          "step-5-preview": 0
        },
        "27": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "28": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        },
        "29": {
          "DeepSeek-V4.1-Flash-1017": 0,
          "hy4-preview": 0,
          "MiniMax-M3.1-Flash": 0,
          "Hy4": 0,
          "glm-5.3-flash": 0,
          "mimo-v2.6-pro": 0,
          "space-bunny": 0,
          "step-5-preview": 0
        },
        "30": {
          "DeepSeek-V4.1-Flash-1017": 2,
          "hy4-preview": 2,
          "MiniMax-M3.1-Flash": 2,
          "Hy4": 2,
          "glm-5.3-flash": 2,
          "mimo-v2.6-pro": 2,
          "space-bunny": 2,
          "step-5-preview": 2
        }
      },
      "resultsUrl": "feihua-wenxue/feihua-wenxue.results.json"
    }
  ]
};
