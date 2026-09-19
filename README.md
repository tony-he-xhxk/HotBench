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
├── <benchmark>.comment.txt            评语（可选）
└── <benchmark>.<model>.<harness>.<n>/ 一次实测
    └── <benchmark>.<model>.<harness>.<n>.html

        │  tools/build-index.mjs   扫描目录、解析文件夹名、读两个 txt
        ▼
   data/projects.js   { site, labels, projects[].runs[] }
        │  assets/js/main.js       分组、懒加载、放大
        ▼
   index.html   下拉框切换 + 实时预览 + 点开大图
```

各文件分工：

| 文件 | 职责 |
| --- | --- |
| `index.html` | 页面骨架：导航、标题区、页脚、放大弹层 |
| `assets/css/style.css` | 全部样式，配色沿用 xingheling.cn |
| `assets/js/main.js` | 读数据、分组、懒加载预览、放大查看 |
| `data/projects.js` | 数据文件，由脚本生成（可手工微调） |
| `tools/build-index.mjs` | 扫描目录生成数据文件 |
| `CNAME` | GitHub Pages 自定义域名 |

几处实现细节：

- **预览是实时运行的**：每张预览是一个 `iframe`，按 1280×1000 的固定视口渲染，再等比缩放到卡片大小。
  所以看到的是真正的动态效果而不是截图，也不会被卡片尺寸裁掉构图。
- **懒加载**：`IntersectionObserver` 让预览滚到附近才真正加载，避免一屏之外的动画空转。
- **放大**：点预览弹出大图（同一份 HTML 再开一个 iframe 实时运行），带「在新标签页打开」，Esc 或点背景关闭。
- **分组**：每个项目一个下拉框，可在「按 Model 显示 / 按 Harness 显示」之间切换，选择记在 localStorage 里。

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

每个 benchmark 文件夹下可以放两个与文件夹同名的 txt。它们的内容每次都由
`build-index.mjs` 重新读取，所以改了 txt 再跑一次脚本就能生效，不用动 `data/projects.js`：

| 文件 | 是否必需 | 显示位置 |
| --- | --- | --- |
| `<项目名>.prompt.txt` | 必需 | 项目卡片里的「查看原始 prompt」折叠区 |
| `<项目名>.comment.txt` | 可选 | 项目卡片底部、所有实测预览之后的评语框 |

写法：

- 都是纯文本，UTF-8 编码；
- 评语直接把整段话写进去即可，换行会保留，可以写成多段；
- 没有 `comment.txt` 就不显示评语框；
- 页面上只展示文本内容，不显示文件路径。

## 加一个新 benchmark

1. 在仓库根目录建文件夹 `新benchmark名/`；
2. 放入 `新benchmark名.prompt.txt`（页面上会折叠展示）；
3. 可选：放入 `新benchmark名.comment.txt` 写评语（显示在卡片底部）；
4. 把每次实测的 HTML 按上面的命名约定放进去；
5. 生成数据文件：

   ```bash
   node tools/build-index.mjs
   ```

6. 想改显示名（例如把 `deepseek-v41-flash` 显示成 `deepseek-v4.1-flash`），
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
