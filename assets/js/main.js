/* ============================================================
   HotBench 前端逻辑
   数据来自 data/projects.js（由 tools/build-index.mjs 扫描生成）
   两种展示方式：按 Model 分组 / 按 Harness 分组
   ============================================================ */

(function () {
  'use strict';

  var DATA = window.HOTBENCH_DATA || {};
  var SITE = DATA.site || {};
  var LABELS = DATA.labels || {};
  var PROJECTS = Array.isArray(DATA.projects) ? DATA.projects : [];
  var MODE_KEY = 'hotbench-mode';
  /* 预览用的固定视口（与 style.css 里 .shot 的 1280 / 1000 对应），再等比缩放到卡片大小 */
  var FRAME_W = 1280;
  var FRAME_H = 1000;
  var FRAME_MIN_H = 520;

  var el = {
    projects: document.getElementById('projects'),
    heroNote: document.getElementById('hero-note'),
    navRepo: document.getElementById('nav-repo'),
    footRepo: document.getElementById('foot-repo'),
    footGithubWrap: document.getElementById('foot-github-wrap'),
    lightbox: document.getElementById('lightbox'),
    lbBody: document.getElementById('lightbox-body'),
    lbTitle: document.getElementById('lightbox-title'),
    lbOpen: document.getElementById('lightbox-open'),
    lbClose: document.getElementById('lightbox-close')
  };

  /* ---------- 通用工具 ---------- */

  function escapeHtml(value) {
    return String(value === null || value === undefined ? '' : value)
      .replace(/[&<>"']/g, function (ch) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
      });
  }

  function modelLabel(token) {
    var map = LABELS.models || {};
    return map[token] || token;
  }

  function harnessLabel(token) {
    var map = LABELS.harnesses || {};
    return map[token] || token;
  }

  function unique(values) {
    var seen = [];
    values.forEach(function (value) {
      if (seen.indexOf(value) === -1) seen.push(value);
    });
    return seen;
  }

  function storedMode() {
    try {
      var saved = window.localStorage.getItem(MODE_KEY);
      if (saved === 'model' || saved === 'harness') return saved;
    } catch (error) { /* 隐私模式下忽略 */ }
    return 'model';
  }

  function rememberMode(mode) {
    try { window.localStorage.setItem(MODE_KEY, mode); } catch (error) { /* 忽略 */ }
  }

  /* ---------- 分组 ---------- */

  /* 返回 [{ key, label, runs: [{ run, caption, tag, title }] }] */
  function groupRuns(project, mode) {
    var runs = project.runs || [];
    var order = [];
    var buckets = {};

    runs.forEach(function (run) {
      var key = mode === 'harness' ? run.harness : run.model;
      if (!buckets[key]) {
        buckets[key] = [];
        order.push(key);
      }
      buckets[key].push(run);
    });

    return order.map(function (key) {
      var list = buckets[key].slice();

      list.sort(function (a, b) {
        var left = mode === 'harness' ? modelLabel(a.model) : harnessLabel(a.harness);
        var right = mode === 'harness' ? modelLabel(b.model) : harnessLabel(b.harness);
        return left.localeCompare(right) || a.attempt - b.attempt;
      });

      var repeated = {};
      list.forEach(function (run) {
        var counter = mode === 'harness' ? run.model : run.harness;
        repeated[counter] = (repeated[counter] || 0) + 1;
      });

      return {
        key: key,
        label: mode === 'harness' ? harnessLabel(key) : modelLabel(key),
        runs: list.map(function (run) {
          var counter = mode === 'harness' ? run.model : run.harness;
          return {
            run: run,
            caption: mode === 'harness'
              ? modelLabel(run.model) + ' 的效果'
              : '在 ' + harnessLabel(run.harness) + ' 上跑的效果',
            tag: repeated[counter] > 1 ? '第 ' + run.attempt + ' 次' : '',
            title: project.id + ' · ' + modelLabel(run.model) + ' × ' + harnessLabel(run.harness)
              + ' · 第 ' + run.attempt + ' 次'
          };
        })
      };
    });
  }

  /* ---------- 渲染 ---------- */

  /* 状态标签：文字里含「通过」且不含「未 / 没 / 不」显示绿色，其余一律红色 */
  function statusChip(run) {
    var text = run && run.status ? String(run.status).trim() : '';
    if (!text) return '';
    var pass = text.indexOf('通过') !== -1 && !/[未没不]/.test(text);
    return '<span class="cap-status ' + (pass ? 'is-pass' : 'is-fail') + '">' +
      escapeHtml(text) + '</span>';
  }

  function previewCard(item) {
    var run = item.run;
    return '' +
      '<figure class="preview">' +
        '<div class="shot">' +
          '<iframe class="shot-frame" data-src="' + escapeHtml(run.file) + '" title="' +
            escapeHtml(item.title) + '" scrolling="no" loading="lazy"></iframe>' +
          '<button class="shot-mask" type="button" data-file="' + escapeHtml(run.file) +
            '" data-title="' + escapeHtml(item.title) + '" aria-label="放大查看 ' +
            escapeHtml(item.title) + '">' +
            '<span class="shot-zoom">点击放大</span>' +
          '</button>' +
        '</div>' +
        '<figcaption class="preview-cap">' +
          '<span class="cap-main">' + escapeHtml(item.caption) + '</span>' +
          (item.tag ? '<span class="cap-tag">' + escapeHtml(item.tag) + '</span>' : '') +
          statusChip(item.run) +
        '</figcaption>' +
      '</figure>';
  }

  function renderGroups(container, project, mode) {
    var html = '';

    groupRuns(project, mode).forEach(function (group) {
      html += '<section class="group">' +
        '<h3 class="group-title">' + escapeHtml(group.label) +
          '<span class="group-count">' + group.runs.length + ' 个效果</span>' +
        '</h3>' +
        '<div class="previews">' + group.runs.map(previewCard).join('') + '</div>' +
      '</section>';
    });

    container.innerHTML = html || '<p class="empty-tip">这个 benchmark 还没有实测结果。</p>';
  }

  function buildProject(project) {
    var runs = project.runs || [];
    var models = unique(runs.map(function (run) { return run.model; }));
    var harnesses = unique(runs.map(function (run) { return run.harness; }));

    var chips = [
      runs.length + ' 次实测',
      models.length + ' 个模型',
      harnesses.length + ' 个 Harness'
    ].map(function (text) {
      return '<span class="chip">' + escapeHtml(text) + '</span>';
    }).join('');

    var promptBox = '';
    if (project.prompt) {
      promptBox = '<details class="prompt-box">' +
        '<summary>查看原始 prompt</summary>' +
        '<p class="prompt-text">' + escapeHtml(project.prompt) + '</p>' +
      '</details>';
    }

    var commentBox = '';
    if (project.comment) {
      commentBox = '<section class="comment-box">' +
        '<p class="comment-label">评语</p>' +
        '<p class="comment-text">' + escapeHtml(project.comment) + '</p>' +
      '</section>';
    }

    var node = document.createElement('article');
    node.className = 'project';
    node.dataset.project = project.id;
    node.innerHTML = '' +
      '<div class="project-head">' +
        '<div class="project-info">' +
          '<h2 class="project-name">' + escapeHtml(project.title || project.id) + '</h2>' +
          (project.title && project.title !== project.id
            ? '<p class="project-title">' + escapeHtml(project.id) + '</p>'
            : '') +
          '<div class="project-meta">' + chips + '</div>' +
        '</div>' +
        '<div class="mode-picker">' +
          '<label for="mode-' + escapeHtml(project.id) + '">展示方式</label>' +
          '<select class="mode-select" id="mode-' + escapeHtml(project.id) +
            '" data-project="' + escapeHtml(project.id) + '">' +
            '<option value="model">按 Model 显示</option>' +
            '<option value="harness">按 Harness 显示</option>' +
          '</select>' +
        '</div>' +
      '</div>' +
      promptBox +
      '<div class="groups"></div>' +
      commentBox;

    var groupsBox = node.querySelector('.groups');
    var select = node.querySelector('.mode-select');
    var mode = storedMode();
    select.value = mode;
    renderGroups(groupsBox, project, mode);

    select.addEventListener('change', function () {
      rememberMode(select.value);
      renderGroups(groupsBox, project, select.value);
      loadFrames(groupsBox);
    });

    return node;
  }

  /* ---------- iframe 懒加载（滚到附近才运行动画） ---------- */

  /* 量出页面自身需要的高度（body.scrollHeight）。内容比视口矮的页面，
     比如 body 用 min-height:100% 时内容会贴着顶部、下面留一大片背景色，
     量出来之后把视口裁到内容高度并垂直居中，卡片里就不会出现一大条空白。
     用 body 而不是 documentElement：后者对 height:100% 的页面永远等于视口高度。
     量不到（file:// 下 iframe 不同源）就沿用固定视口。 */
  function measurePageHeight(frame) {
    try {
      var doc = frame.contentDocument;
      if (!doc) return 0;
      var height = doc.body ? doc.body.scrollHeight : 0;
      if (!height && doc.documentElement) height = doc.documentElement.scrollHeight;
      return height || 0;
    } catch (error) {
      return 0;
    }
  }

  function pageBackground(frame) {
    try {
      var color = frame.contentWindow.getComputedStyle(frame.contentDocument.body).backgroundColor;
      if (color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)') return color;
    } catch (error) { /* 忽略 */ }
    return '';
  }

  function frameHeight(frame) {
    var value = Number(frame.getAttribute('data-frame-height'));
    if (!value || !isFinite(value)) return FRAME_H;
    return Math.max(FRAME_MIN_H, Math.min(FRAME_H, value));
  }

  function fitShot(box) {
    var frame = box.querySelector('.shot-frame');
    if (!frame || !box.clientWidth) return;
    var scale = box.clientWidth / FRAME_W;
    var height = frameHeight(frame);
    var offset = Math.max(0, (box.clientHeight - height * scale) / 2);
    frame.style.width = FRAME_W + 'px';
    frame.style.height = height + 'px';
    frame.style.transform = 'translateY(' + offset + 'px) scale(' + scale + ')';
  }

  /* iframe 载入后：量高度、取背景色、重新摆放 */
  function tuneFrame(frame, box) {
    var height = measurePageHeight(frame);
    if (height) frame.setAttribute('data-frame-height', String(height));

    var background = pageBackground(frame);
    if (background) box.style.background = background;

    fitShot(box);

    /* 少数页面布局晚一拍才稳定，再量一次（只补大，不缩小） */
    window.setTimeout(function () {
      var again = measurePageHeight(frame);
      if (again > frameHeight(frame) + 8 && again <= FRAME_H) {
        frame.setAttribute('data-frame-height', String(again));
        fitShot(box);
      }
    }, 800);
  }

  /* 卡片尺寸变化时重新等比缩放预览 */
  var sizeObserver = typeof window.ResizeObserver === 'function'
    ? new ResizeObserver(function (entries) {
      entries.forEach(function (entry) { fitShot(entry.target); });
    })
    : null;

  var observer = null;
  if (typeof window.IntersectionObserver === 'function') {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var frame = entry.target;
        observer.unobserve(frame);
        var src = frame.getAttribute('data-src');
        if (src && frame.getAttribute('src') !== src) frame.setAttribute('src', src);
      });
    }, { rootMargin: '400px 0px' });
  }

  function loadFrames(scope) {
    Array.prototype.forEach.call(scope.querySelectorAll('.shot'), function (box) {
      fitShot(box);
      if (sizeObserver) sizeObserver.observe(box);
      else window.addEventListener('resize', function () { fitShot(box); });

      var frame = box.querySelector('.shot-frame');
      if (!frame) return;
      frame.addEventListener('load', function () { tuneFrame(frame, box); });
      if (observer) observer.observe(frame);
      else frame.setAttribute('src', frame.getAttribute('data-src'));
    });
  }

  /* ---------- 放大查看 ---------- */

  function openLightbox(file, title) {
    el.lbTitle.textContent = title || '';
    el.lbOpen.setAttribute('href', file);
    el.lbBody.innerHTML = '<iframe src="' + escapeHtml(file) + '" title="' +
      escapeHtml(title || '') + '"></iframe>';
    el.lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    el.lbClose.focus();
  }

  function closeLightbox() {
    el.lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    el.lbBody.innerHTML = '';
  }

  /* ---------- 启动 ---------- */

  function init() {
    var repo = SITE.repo || '';
    if (repo) {
      [el.navRepo, el.footRepo].forEach(function (link) {
        if (!link) return;
        link.setAttribute('href', repo);
        link.hidden = false;
      });
      if (el.footGithubWrap) el.footGithubWrap.hidden = false;
    }

    if (!PROJECTS.length) {
      el.projects.innerHTML = '<p class="empty-tip">还没有 benchmark 数据，' +
        '在 <code>data/projects.js</code> 里添加即可。</p>';
      return;
    }

    PROJECTS.forEach(function (project) {
      var node = buildProject(project);
      el.projects.appendChild(node);
      /* 必须挂到页面上再测量：脱开的节点宽度为 0，iframe 会按默认尺寸加载 */
      loadFrames(node);
    });

    var totalRuns = 0;
    var modelSet = [];
    var harnessSet = [];
    PROJECTS.forEach(function (project) {
      (project.runs || []).forEach(function (run) {
        totalRuns += 1;
        if (modelSet.indexOf(run.model) === -1) modelSet.push(run.model);
        if (harnessSet.indexOf(run.harness) === -1) harnessSet.push(run.harness);
      });
    });
    el.heroNote.textContent = PROJECTS.length + ' 个 benchmark · ' + totalRuns + ' 次实测 · ' +
      modelSet.length + ' 个模型 × ' + harnessSet.length + ' 个 Harness';
  }

  /* 事件委托：点预览图放大 */
  el.projects.addEventListener('click', function (event) {
    var mask = event.target.closest ? event.target.closest('.shot-mask') : null;
    if (!mask) return;
    openLightbox(mask.getAttribute('data-file'), mask.getAttribute('data-title'));
  });

  el.lbClose.addEventListener('click', closeLightbox);
  el.lightbox.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-close')) closeLightbox();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !el.lightbox.hidden) closeLightbox();
  });

  init();
})();
