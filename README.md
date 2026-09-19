# HotBench

> HotBench · 有趣的 benchmark 实测
> 线上地址：https://hotbench.xingheling.cn/

把同一个 prompt 交给不同的 AI 模型与 Harness，把它们的产出原样挂在网页上实时运行，用来做横向对比。

## 目录结构

```
HotBench/
├── CNAME                      # GitHub Pages 自定义域名
├── index.html                 # 页面骨架
├── assets/
│   ├── css/style.css          # 样式（配色沿用 xingheling.cn）
│   └── js/main.js             # 分组切换、懒加载、放大查看
├── data/projects.js           # 数据文件（由脚本生成，可手工微调）
├── tools/build-index.mjs      # 扫描目录生成数据文件
└── pelican-bicycle/
    ├── pelican-bicycle.prompt.txt
    └── pelican-bicycle.<model>.<harness>.<第几次>/
        └── pelican-bicycle.<model>.<harness>.<第几次>.html
```

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

## 加一个新 benchmark

1. 在仓库根目录建文件夹 `新benchmark名/`；
2. 放入 `新benchmark名.prompt.txt`（页面上会折叠展示）；
3. 把每次实测的 HTML 按上面的命名约定放进去；
4. 生成数据文件：

   ```bash
   node tools/build-index.mjs
   ```

5. 想改显示名（例如把 `deepseek-v41-flash` 显示成 `deepseek-v4.1-flash`），
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
