# HotBench

> HotBench · 有趣的 benchmark 实测
> 线上地址：https://hotbench.xingheling.cn/

把同一个 prompt 交给不同的 AI 模型与 Harness，把它们的产出原样挂在网页上实时运行，用来做横向对比。

## 架构

纯静态站点：没有构建步骤、没有依赖、没有框架，GitHub Pages 直接把仓库根目录发出去。
页面只做一件事 —— 把仓库里的实测 HTML 原样跑起来给人看。

```
<benchmark>/
├── <benchmark>.prompt.txt             原始 prompt
├── <benchmark>.meta.json              段位、机会次数、指示灯颜色（可选）
├── <benchmark>.reviews.json           每个 Model × Harness 的短评（可选）
└── <benchmark>.<model>.<harness>.<n>/ 一次实测
    ├── <benchmark>.<model>.<harness>.<n>.html
    └── <benchmark>.<model>.<harness>.<n>.png/.webp   初始界面截图（可选）

        │  tools/build-index.mjs   扫描目录、解析文件夹名、读配置和文本文件
        ▼
   data/projects.js   { site, labels, projects[].runs[] }
        │  assets/js/main.js       按 Model × Harness 聚合、懒加载、放大
        ▼
   index.html   段位徽章 + 条目短评 + 实时预览/截图卡片 + 点开大图
```

各文件分工：

| 文件 | 职责 |
| --- | --- |
| `index.html` | 页面骨架：导航、标题区、页脚、放大弹层 |
| `assets/css/style.css` | 全部样式，配色沿用 xingheling.cn |
| `assets/js/main.js` | 读数据、按 Model × Harness 聚合、懒加载预览、放大查看 |
| `data/projects.js` | 数据文件，由脚本生成（可手工微调） |
| `tools/build-index.mjs` | 扫描目录生成数据文件 |
| `tools/snapshot.mjs` | 给实测 HTML 拍初始界面截图，供截图型卡片使用 |
| `CNAME` | GitHub Pages 自定义域名 |

几处实现细节：

- **预览是实时运行的**：每张预览是一个 `iframe`，先在 1280 宽、1000 高的视口里渲染，再等比缩放到卡片大小，
  看到的是真正的动态效果而不是截图；卡片底色取该页面 body 的背景色。
- **内容没居中时自动补正**：加载后会量一次页面「常规流」内容的高度（排除 `position: absolute/fixed` 的装饰层，
  它们会跟着视口一起长高），只有当页面自己没把内容垂直居中时，才把视口裁到内容高度并居中；
  本来就居中的页面保持整屏不动。这样「忘了写 `justify-content: center`」的页面不会在下面留一大片空白，
  也不会切掉本来有意留白的页面。`file://` 下 iframe 不同源、量不到高度时会退回固定视口。
- **懒加载**：`IntersectionObserver` 让预览滚到附近才真正加载，避免一屏之外的动画空转。
- **数据文件也会复核一次**：`data/projects.js` 是 `<script>` 引入的，会被浏览器 / CDN 缓存 10 分钟
  （`max-age=600`），所以页面加载后还会用 `fetch` + `no-cache` 再校验一次，内容确实变了就整页重渲染。
  刚推上去的新实测因此不用等缓存过期，刷新即可看到。
- **放大**：点预览弹出大图（同一份 HTML 再开一个 iframe 实时运行），带「在新标签页打开」，Esc 或点背景关闭。
- **截图型实测**：实测文件夹里放了同名 png 时，卡片改显示这张截图，点击直接在新标签页打开 HTML（不跑 iframe、
  也没有放大）。适合「打开就能玩」的小游戏这类不适合内嵌的页面，用 `node tools/snapshot.mjs <html> --webp` 生成截图。
  WebP q85 的体积通常只有 PNG 的 10% 左右，肉眼几乎无差别，能明显加快图片加载。
- **条目 = Model × Harness**：每个组合一个条目，标题形如 `DeepSeek-V4.1-Flash × WorkBuddy`；
  条目里并排放该组合的前 1~2 次效果（宽度够时一行显示），下方是这个组合的一句短评。
- **段位**：`<项目名>.meta.json` 的 `tier` / `chances` 决定项目卡上的段位徽章（青铜 / 白银 / 金牌）
  和「只有 N 次机会」；超出 `chances` 的实测在生成数据时就被过滤掉，不会出现在页面上。
- **指示灯**：每个效果只显示一颗彩色圆点，颜色来自 `meta.json` 的 `lights`。
- **筛选与搜索**：顶部工具栏可以按段位筛选，也可以对赛题的中英文名做模糊搜索
  （匹配时会忽略空格、连字符、下划线和点，所以「鹈鹕」「pelican bicycle」「pelican-bicycle」都能命中）。
- **总得分率**：白银每个条目满分 2 分（第 1 轮做对得 2 分、第 2 轮才做对得 1 分、两轮没做对得 0 分）；
  青铜每个条目满分 1 分（一轮做对得 1 分，绿灯或黄灯都算对）。页面顶部也写明了这套规则。

## 命名约定

实测目录按 `母文件夹名.model名称.harness名称.第几次` 命名，点号分隔：

```
pelican-bicycle.deepseek-v41-flash.workbuddy.2
│                │                  │         └── 第 2 次尝试
│                │                  └── Harness：workbuddy
│                └── 模型：deepseek-v41-flash
└── 所属 benchmark：pelican-bicycle
```

模型名里带点号也没关系（例如 `gpt-5.6-luna`）：解析时从右往左取，
最后一段是第几次、倒数第二段是 harness，剩下的都算模型名。

## 文本文件约定

每个 benchmark 文件夹下可以放几个与文件夹同名的配置/文本文件。**页面是运行时读取它们的**：
`build-index.mjs` 会把内容和文件路径一起写进 `data/projects.js` 当兜底，前端加载后再按路径拉一次，
所以只改内容的话直接 push 就生效，连生成脚本都不用跑；只有增删实测目录、增删这类文件或改文件夹名时，
才需要执行 `node tools/build-index.mjs` 重新生成数据文件。

| 文件 | 是否必需 | 显示位置 |
| --- | --- | --- |
| `<项目名>.prompt.txt` | 必需 | 项目卡片里的「查看原始 prompt」折叠区 |
| `<项目名>.meta.json` | 可选 | 项目卡上的段位徽章、机会次数，以及每个效果的指示灯颜色 |
| `<项目名>.reviews.json` | 可选 | 每个「Model × Harness」条目下方的短评 |

写法：

- `prompt.txt` 是纯文本，UTF-8 编码；
- `meta.json` 包含段位、机会次数和每个效果的指示灯颜色：

  ```json
  {
    "tier": "silver",
    "chances": 2,
    "order": 2,
    "entryOrder": ["deepseek-v41-flash.codex", "deepseek-v41-flash.workbuddy"],
    "lights": {
      "deepseek-v41-flash.codex.1": "red",
      "deepseek-v41-flash.codex.2": "green"
    }
  }
  ```

  - `tier` 可选 `bronze` / `silver` / `gold`（显示为青铜 / 白银 / 金牌）；
  - `chances` 是这条赛题允许的机会次数，超出的实测在生成时会被过滤掉；
  - `order` 决定赛题在页面上的先后（小的在前，不写就按文件夹名排）；
  - `entryOrder` 决定项目内「Model × Harness」条目的顺序，列出键即可，没列出的按名称排在后面；
  - `lights` 的键是「模型.harness.第几次」（也可以写完整文件夹名），值是 `green` / `red` / `yellow`；
    没写颜色的效果不显示指示灯。

- `reviews.json` 是「每个 Model × Harness 的短评」，键是 `模型.harness`：

  ```json
  {
    "deepseek-v41-flash.codex": "第 1 轮多了个水壶，第 2 轮修好，两轮内过关。"
  }
  ```

- 用 `file://` 直接打开页面时浏览器不允许 `fetch`，会退回数据文件里的内容（和预览的限制一样）；
- 页面上只展示文本内容，不显示文件路径。

## 加一个新 benchmark

1. 在仓库根目录建文件夹 `新benchmark名/`；
2. 放入 `新benchmark名.prompt.txt`（页面上会折叠展示）；
3. 可选：放入 `新benchmark名.meta.json`（段位、机会次数、指示灯颜色）和 `新benchmark名.reviews.json`（条目短评）；
4. 把每次实测的 HTML 按上面的命名约定放进去；
5. 可选：想用截图卡片就在实测文件夹里放一张同名 png/webp（比例建议与卡片一致：1280×1000 或 900×703），
   直接跑 `node tools/snapshot.mjs <那个 html> --webp` 生成即可；
6. 生成数据文件：

   ```bash
   node tools/build-index.mjs
   ```

7. 想改显示名（例如把 `deepseek-v41-flash` 显示成 `DeepSeek-V4.1-Flash`），
  直接改 `data/projects.js` 里的 `labels`，之后重新生成不会被覆盖。

## 本地预览

直接双击 `index.html` 即可（数据文件是普通 JS，不受 `file://` 限制）；
也可以在仓库根目录起一个静态服务：

```bash
python -m http.server 8080
# 然后打开 http://localhost:8080/
```

## LICENSE

MIT
