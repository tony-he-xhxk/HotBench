/* ============================================================
   HotBench 前端逻辑
   数据来自 data/projects.js（由 tools/build-index.mjs 扫描生成）
   每个条目 = 一个「Model × Harness」，下面是该组合的 1~2 次效果 + 一句短评
   ============================================================ */

(function () {
  'use strict';

  var DATA = window.HOTBENCH_DATA || {};
  /* 首页 body 没有 data-project；详情页（/<项目>/index.html）有 */
  var PAGE_PROJECT = document.body.getAttribute('data-project') || '';
  /* 预览用的固定视口（与 style.css 里 .shot 的 1280 / 1000 对应），再等比缩放到卡片大小 */
  var FRAME_W = 1280;
  var FRAME_H = 1000;
  var FRAME_MIN_H = 520;

  /* 赛题段位：bronze / silver / gold */
  var TIERS = {
    bronze: { label: '青铜', className: 'tier-bronze' },
    silver: { label: '白银', className: 'tier-silver' },
    gold: { label: '黄金', className: 'tier-gold' }
  };

  var el = {
    projects: document.getElementById('projects'),
    heroNote: document.getElementById('hero-note'),
    tierFilter: document.getElementById('tier-filter'),
    search: document.getElementById('project-search'),
    filterEmpty: document.getElementById('filter-empty'),
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
    var map = (DATA.labels && DATA.labels.models) || {};
    return map[token] || token;
  }

  function harnessLabel(token) {
    var map = (DATA.labels && DATA.labels.harnesses) || {};
    return map[token] || token;
  }

  function projectList() {
    return Array.isArray(DATA.projects) ? DATA.projects : [];
  }

  function unique(values) {
    var seen = [];
    values.forEach(function (value) {
      if (seen.indexOf(value) === -1) seen.push(value);
    });
    return seen;
  }

  /* ---------- 数据整理 ---------- */

  /* 按「Model × Harness」聚合成条目；键和 reviews.json 里的键一致（模型.harness） */
  function entriesOf(project) {
    var runs = (project.runs || []).slice().sort(function (a, b) {
      return modelLabel(a.model).localeCompare(modelLabel(b.model)) ||
        harnessLabel(a.harness).localeCompare(harnessLabel(b.harness)) ||
        a.attempt - b.attempt;
    });

    var keys = [];
    var buckets = {};
    var reviews = project.reviews || {};

    runs.forEach(function (run) {
      var key = run.model + '.' + run.harness;
      if (!buckets[key]) {
        buckets[key] = { key: key, model: run.model, harness: run.harness, runs: [] };
        keys.push(key);
      }
      buckets[key].runs.push(run);
    });

    var preferred = Array.isArray(project.entryOrder) ? project.entryOrder : [];

    return keys.map(function (key) {
      var entry = buckets[key];
      entry.title = modelLabel(entry.model) + ' × ' + harnessLabel(entry.harness);
      entry.review = String(reviews[key] || '').trim();
      return entry;
    }).sort(function (a, b) {
      var indexA = preferred.indexOf(a.key);
      var indexB = preferred.indexOf(b.key);
      if (indexA < 0) indexA = 9999;
      if (indexB < 0) indexB = 9999;
      return indexA - indexB || a.title.localeCompare(b.title);
    });
  }

  /* ---------- 总得分率 ----------
     白银：每个条目满分 2 分（第 1 轮做对 2 分，第 2 轮才做对 1 分，两轮没做对 0 分）
     青铜：每个条目满分 1 分（第 1 轮做对 1 分，否则 0 分）
     做对 = 绿灯或黄灯 */
  function isCorrect(run) {
    return !!run && (run.tone === 'green' || run.tone === 'yellow');
  }

  /* 单个条目得分：第 N 轮才做对 → (剩余机会 + 1) 分：青铜 1、白银 2/1、黄金 3/2/1 */
  function entryScore(entry, chances) {
    var byAttempt = {};
    entry.runs.forEach(function (run) { byAttempt[run.attempt] = run; });

    for (var attempt = 1; attempt <= chances; attempt += 1) {
      if (isCorrect(byAttempt[attempt])) return chances - attempt + 1;
    }
    return 0;
  }

  function scoreOf(project, entries) {
    var chances = Number(project.chances) || 0;
    var total = 0;

    entries.forEach(function (entry) {
      total += entryScore(entry, chances);
    });

    var max = chances * entries.length;
    return { total: total, max: max, rate: max ? (total / max) * 100 : 0 };
  }

  function formatRate(rate) {
    var rounded = Math.round(rate * 10) / 10;
    return (rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1)) + '%';
  }

  /* ---------- 指示灯 ---------- */

  /* 颜色来自 meta.json 的 lights；没有颜色的效果不显示指示灯 */
  function statusLight(run) {
    var tone = String((run && run.tone) || '').trim().toLowerCase();
    if (tone !== 'green' && tone !== 'red' && tone !== 'yellow') return '';
    return '<span class="status-light is-' + tone + '" aria-hidden="true"></span>';
  }

  /* ---------- 渲染 ---------- */

  function previewCard(entry, run) {
    var title = entry.title + ' · 第 ' + run.attempt + ' 次';
    /* 异常 / 放弃：淡红底深红字，点击看完整文本；截图：点击新标签页；其余：实时预览 + 放大 */
    var stage;

    if (run.abnormal || run.forfeit) {
      var preview = run.forfeit
        ? String(run.message || '')
        : String(run.dumpExcerpt || run.dump || '');
      var full = run.forfeit ? preview : String(run.dump || preview);
      stage = '<button class="shot shot-abnormal" type="button" data-title="' + escapeHtml(title) +
        '" data-dump="' + escapeHtml(full).replace(/\r?\n/g, '&#10;') + '">' +
        '<span class="dump-preview">' + escapeHtml(preview) + '</span>' +
        '<span class="shot-zoom">点击查看完整内容</span>' +
      '</button>';
    } else if (run.shot) {
      stage = '<a class="shot shot-link" href="' + escapeHtml(run.file) + '" target="_blank" rel="noopener" ' +
          'aria-label="在新标签页打开 ' + escapeHtml(title) + '">' +
          '<img class="shot-img" src="' + escapeHtml(run.shot) + '" alt="' + escapeHtml(title) +
            '" loading="lazy" decoding="async">' +
          '<span class="shot-zoom">在新标签页打开</span>' +
        '</a>';
    } else {
      stage = '<div class="shot">' +
          '<iframe class="shot-frame" data-src="' + escapeHtml(run.file) + '" title="' +
            escapeHtml(title) + '" scrolling="no" loading="lazy"></iframe>' +
          '<button class="shot-mask" type="button" data-file="' + escapeHtml(run.file) +
            '" data-title="' + escapeHtml(title) + '" aria-label="放大查看 ' + escapeHtml(title) + '">' +
            '<span class="shot-zoom">点击放大</span>' +
          '</button>' +
        '</div>';
    }

    return '' +
      '<figure class="preview" data-run="' + escapeHtml(run.id || '') + '">' +
        stage +
        '<figcaption class="preview-cap">' +
          statusLight(run) +
          '<span class="cap-main">第 ' + run.attempt + ' 次</span>' +
        '</figcaption>' +
      '</figure>';
  }

  function renderEntries(container, entries) {
    var html = '';

    entries.forEach(function (entry) {
      var searchText = normalizeName([
        entry.model, entry.harness,
        modelLabel(entry.model), harnessLabel(entry.harness),
        entry.title
      ].join(' '));
      html += '<section class="entry" data-key="' + escapeHtml(entry.key) +
        '" data-search="' + escapeHtml(searchText) + '">' +
        '<h3 class="entry-title">' + escapeHtml(entry.title) + '</h3>' +
        '<div class="previews" data-count="' + entry.runs.length + '">' +
          entry.runs.map(function (run) { return previewCard(entry, run); }).join('') +
        '</div>' +
        (entry.review
          ? '<p class="entry-review">' + escapeHtml(entry.review) + '</p>'
          : '') +
      '</section>';
    });

    container.innerHTML = html || '<p class="empty-tip">这个 benchmark 还没有实测结果。</p>';
  }

  function tierInfo(project) {
    var tier = TIERS[String(project.tier || '').toLowerCase()];
    if (!tier) return null;
    var chances = Number(project.chances) || 0;
    return {
      text: tier.label + '赛题' + (chances ? ' · 只有 ' + chances + ' 次机会' : ''),
      className: tier.className
    };
  }

  function rulesText(project) {
    var tier = String(project.tier || '').toLowerCase();
    var chances = Number(project.chances) || 0;
    if (tier === 'bronze') {
      return '青铜题：只有 1 次机会，一轮做对得 1 分（绿灯或黄灯都算对），否则 0 分。';
    }
    if (tier === 'silver') {
      return '白银题：只有 2 次机会，第 1 轮做对得 2 分、第 2 轮才做对得 1 分、两轮都没做对得 0 分。';
    }
    if (tier === 'gold') {
      return '黄金题：只有 3 次机会，第 1 / 2 / 3 轮做对分别得 3 / 2 / 1 分，三轮都没做对得 0 分；' +
        '只有在前两题（青铜、白银）都一轮通过的选手才能进入；连续两轮异常，第三轮视为放弃参赛。';
    }
    return chances ? '每个条目最多 ' + chances + ' 次机会。' : '';
  }

  function scoreSummaryHtml(project, entries) {
    var chances = Number(project.chances) || 0;
    var groups = {};

    entries.forEach(function (entry) {
      var score = entryScore(entry, chances);
      if (!groups[score]) groups[score] = [];
      groups[score].push(entry.title);
    });

    var lines = '';
    for (var score = chances; score >= 0; score -= 1) {
      var prefix = score === chances ? '斩获' : (score === 0 ? '喜提' : '获得');
      lines += '<p class="summary-line"><strong>' + prefix + score + '分</strong>的有：' +
        escapeHtml((groups[score] || []).join('；')) + '</p>';
    }

    return '<section class="score-summary">' +
      '<p class="score-summary-title">得分汇总（仅代表此次尝试，不代表真实能力）：</p>' +
      lines +
    '</section>';
  }

  /* 详情页：按模型名 / Harness 名模糊过滤已渲染的条目 */
  function bindEntrySearch(node) {
    var input = node.querySelector('#entry-search');
    if (!input) return;

    input.addEventListener('input', function () {
      var query = normalizeName(input.value);
      var shown = 0;

      Array.prototype.forEach.call(node.querySelectorAll('.entry'), function (section) {
        var ok = !query || (section.getAttribute('data-search') || '').indexOf(query) !== -1;
        section.hidden = !ok;
        if (ok) shown += 1;
      });

      var empty = node.querySelector('.entry-empty');
      if (empty) empty.hidden = shown !== 0;
    });
  }

  function buildProject(project, mode) {
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

    var tier = tierInfo(project);
    var tierBadge = tier
      ? '<span class="tier-badge ' + tier.className + '">' + escapeHtml(tier.text) + '</span>'
      : '';

    var entries = entriesOf(project);
    var detail = mode === 'detail';
    var shownEntries = detail ? entries : entries.slice(0, 2);
    var score = scoreOf(project, entries);
    var scoreBox = Number(project.chances)
      ? '<div class="score-box">' +
          '<span class="score-label">总得分率</span>' +
          '<strong class="score-value">' + formatRate(score.rate) + '</strong>' +
          '<span class="score-detail">' + score.total + ' / ' + score.max + ' 分</span>' +
        '</div>'
      : '';

    var bottom = detail ? '' : '<div class="more-row">' +
      '<a class="more-link" href="' + encodeURIComponent(project.id) + '/">查看更多 →</a></div>';

    var node = document.createElement('article');
    node.className = 'project';
    node.dataset.project = project.id;
    node.innerHTML = '' +
      '<div class="project-head">' +
        '<div class="project-info">' +
          '<div class="project-name-row">' +
            '<h2 class="project-name">' + escapeHtml(project.title || project.id) + '</h2>' +
            tierBadge +
          '</div>' +
          (project.title && project.title !== project.id
            ? '<p class="project-title">' + escapeHtml(project.id) + '</p>'
            : '') +
          '<div class="project-meta">' + chips + '</div>' +
        '</div>' +
        scoreBox +
      '</div>' +
      promptBox +
      (detail ? '<p class="project-rules">' + escapeHtml(rulesText(project)) + '</p>' +
        scoreSummaryHtml(project, entries) +
        '<div class="detail-toolbar"><span>搜索条目</span>' +
          '<label class="entry-search"><input id="entry-search" type="search" autocomplete="off" ' +
            'placeholder="模型 / Harness（模糊匹配）"></label>' +
        '</div>' +
        '<p class="entry-empty" hidden>没有匹配的条目。</p>' : '') +
      '<div class="entries"></div>' +
      bottom;

    renderEntries(node.querySelector('.entries'), shownEntries);
    if (detail) bindEntrySearch(node);
    refreshProject(node, project);

    return node;
  }

  /* ---------- 运行时读取文本文件 ---------- */

  /* prompt / 状态色 / 短评都在页面加载后再拉一次，改了文件直接 push 就生效；
     数据文件里解析出来的内容是兜底（file://、离线、或文件被删时用）。
     用 cache: 'no-cache' 让浏览器走 304 校验：改了立刻能看到，没改也不额外下载。 */
  function refreshText(url, apply) {
    if (!url || typeof window.fetch !== 'function') return;
    window.fetch(url, { cache: 'no-cache' })
      .then(function (response) { return response.ok ? response.text() : null; })
      .then(function (text) { if (text !== null) apply(text.trim()); })
      .catch(function () { /* 拉不到就用数据文件里的内容 */ });
  }

  function applyPrompt(node, text) {
    var box = node.querySelector('.prompt-box');
    if (!text) {
      if (box) box.remove();
      return;
    }
    if (!box) {
      box = document.createElement('details');
      box.className = 'prompt-box';
      box.innerHTML = '<summary>查看原始 prompt</summary><p class="prompt-text"></p>';
      node.insertBefore(box, node.querySelector('.entries'));
    }
    var target = box.querySelector('.prompt-text');
    if (target.textContent !== text) target.textContent = text;
  }

  function applyReviews(node, map) {
    Array.prototype.forEach.call(node.querySelectorAll('.entry[data-key]'), function (section) {
      var key = section.getAttribute('data-key');
      var text = String(map[key] || '').trim();
      var box = section.querySelector('.entry-review');

      if (!text) {
        if (box) box.remove();
        return;
      }
      if (!box) {
        box = document.createElement('p');
        box.className = 'entry-review';
        section.appendChild(box);
      }
      if (box.textContent !== text) box.textContent = text;
    });
  }

  function refreshProject(node, project) {
    refreshText(project.promptUrl, function (text) { applyPrompt(node, text); });

    if (project.reviewsUrl) {
      refreshText(project.reviewsUrl, function (text) {
        var map = null;
        try {
          map = JSON.parse(text);
        } catch (error) {
          return;   /* json 写坏了就沿用数据文件里的短评 */
        }
        if (map && typeof map === 'object') applyReviews(node, map);
      });
    }
  }

  /* ---------- iframe 懒加载（滚到附近才运行动画） ---------- */

  /* 量出页面自身需要的高度。做法是取 body 里「常规流」子元素的内容范围
     （排除 absolute / fixed 的装饰层，它们会跟着视口长高），再加上 body 的上下 padding。

     为什么不用 body.scrollHeight：body 写了 height/min-height:100% 的页面，
     它永远等于视口高度，量不出「内容其实只有一半高、还顶在上面」这种情况。

     量出来之后只有当页面自己没把内容垂直居中时才裁切（比如内容贴着顶部、
     下面留一大片背景色）；已经居中的页面原样保留，避免把它的留白也切掉。
     量不到（file:// 下 iframe 不同源）就沿用固定视口。 */
  function measurePageHeight(frame) {
    try {
      var doc = frame.contentDocument;
      if (!doc || !doc.body || !doc.defaultView) return 0;
      var win = doc.defaultView;
      var body = doc.body;
      var top = Infinity;
      var bottom = -Infinity;

      Array.prototype.forEach.call(body.children, function (node) {
        var position = win.getComputedStyle(node).position;
        if (position === 'absolute' || position === 'fixed') return;
        var rect = node.getBoundingClientRect();
        if (!rect.width && !rect.height) return;
        if (rect.top < top) top = rect.top;
        if (rect.bottom > bottom) bottom = rect.bottom;
      });

      if (!isFinite(top) || !isFinite(bottom)) return body.scrollHeight || 0;

      var style = win.getComputedStyle(body);
      var pad = (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0);
      var needed = Math.ceil(bottom - top + pad);

      /* 上下留白差不多 → 页面自己就是居中的，保持整屏 */
      var viewportH = frame.clientHeight;
      if (viewportH && Math.abs(top - (viewportH - bottom)) <= 24) return viewportH;

      return needed;
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
      var frame = box.querySelector('.shot-frame');
      if (!frame) return;   /* 截图卡片是静态图片，不需要 iframe 适配 */

      fitShot(box);
      if (sizeObserver) sizeObserver.observe(box);
      else window.addEventListener('resize', function () { fitShot(box); });

      frame.addEventListener('load', function () { tuneFrame(frame, box); });
      if (observer) observer.observe(frame);
      else frame.setAttribute('src', frame.getAttribute('data-src'));
    });
  }

  /* ---------- 放大查看 ---------- */

  function openLightbox(file, title) {
    el.lbTitle.textContent = title || '';
    el.lbOpen.hidden = false;
    el.lbOpen.setAttribute('href', file);
    el.lbBody.innerHTML = '<iframe src="' + escapeHtml(file) + '" title="' +
      escapeHtml(title || '') + '"></iframe>';
    el.lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    el.lbClose.focus();
  }

  /* 异常文本：放大后显示完整内容，不提供「在新标签页打开」 */
  function openLightboxText(title, text) {
    el.lbTitle.textContent = title || '';
    el.lbOpen.hidden = true;
    el.lbBody.innerHTML = '';
    var box = document.createElement('div');
    box.className = 'dump-full';
    box.textContent = text || '';
    el.lbBody.appendChild(box);
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

  var projectNodes = [];

  /* 模糊匹配用：去掉空格、连字符、下划线、点等，再做包含判断 */
  function normalizeName(text) {
    return String(text || '').toLowerCase().replace(/[\s\-_.·／/]+/g, '');
  }

  function buildTierOptions(projects) {
    if (!el.tierFilter) return;
    var tiers = [];
    projects.forEach(function (project) {
      var tier = String(project.tier || '');
      if (tier && tiers.indexOf(tier) < 0) tiers.push(tier);
    });

    var html = '<option value="all">全部赛题</option>';
    tiers.forEach(function (tier) {
      var info = TIERS[tier];
      var label = info ? info.label : tier;
      var chances = 0;
      projects.forEach(function (project) {
        if (String(project.tier || '') === tier && !chances) {
          chances = Number(project.chances) || 0;
        }
      });
      html += '<option value="' + escapeHtml(tier) + '">' +
        escapeHtml(label + '赛题' + (chances ? ' · 只有 ' + chances + ' 次机会' : '')) +
        '</option>';
    });

    var current = el.tierFilter.value;
    el.tierFilter.innerHTML = html;
    el.tierFilter.value = current && el.tierFilter.querySelector('option[value="' + current + '"]')
      ? current
      : 'all';
  }

  function applyFilter() {
    var tier = el.tierFilter ? el.tierFilter.value : 'all';
    var query = normalizeName(el.search ? el.search.value : '');
    var shown = 0;

    projectNodes.forEach(function (item) {
      var project = item.project;
      var okTier = tier === 'all' || String(project.tier || '') === tier;
      var haystack = normalizeName([project.title, project.id, project.summary].join(' '));
      var okQuery = !query || haystack.indexOf(query) !== -1;
      var visible = okTier && okQuery;

      item.node.hidden = !visible;
      if (visible) shown += 1;
    });

    if (el.filterEmpty) {
      el.filterEmpty.hidden = shown !== 0 || projectNodes.length === 0;
    }
  }

  function applySite() {
    var site = DATA.site || {};
    var repo = site.repo || '';
    if (repo) {
      [el.navRepo, el.footRepo].forEach(function (link) {
        if (!link) return;
        link.setAttribute('href', repo);
        link.hidden = false;
      });
      if (el.footGithubWrap) el.footGithubWrap.hidden = false;
    }
  }

  function renderAll() {
    var projects = projectList();
    applySite();
    el.projects.innerHTML = '';
    projectNodes = [];

    /* 详情页：只渲染当前项目，且展示全部条目 */
    if (PAGE_PROJECT) {
      var current = null;
      projects.forEach(function (project) {
        if (project.id === PAGE_PROJECT) current = project;
      });
      if (!current) {
        el.projects.innerHTML = '<p class="empty-tip">找不到这个 benchmark。</p>';
        return;
      }
      document.title = (current.title || current.id) + ' · HotBench';
      var detailNode = buildProject(current, 'detail');
      el.projects.appendChild(detailNode);
      loadFrames(detailNode);
      return;
    }

    if (!projects.length) {
      el.projects.innerHTML = '<p class="empty-tip">还没有 benchmark 数据，' +
        '在 <code>data/projects.js</code> 里添加即可。</p>';
      el.heroNote.textContent = '';
      buildTierOptions([]);
      applyFilter();
      return;
    }

    projects.forEach(function (project) {
      var node = buildProject(project, 'summary');
      el.projects.appendChild(node);
      projectNodes.push({ project: project, node: node });
      /* 必须挂到页面上再测量：脱开的节点宽度为 0，iframe 会按默认尺寸加载 */
      loadFrames(node);
    });

    buildTierOptions(projects);
    applyFilter();

    var totalRuns = 0;
    var modelSet = [];
    var harnessSet = [];
    projects.forEach(function (project) {
      (project.runs || []).forEach(function (run) {
        totalRuns += 1;
        if (modelSet.indexOf(run.model) === -1) modelSet.push(run.model);
        if (harnessSet.indexOf(run.harness) === -1) harnessSet.push(run.harness);
      });
    });
    el.heroNote.textContent = projects.length + ' 个 benchmark · ' + totalRuns + ' 次实测 · ' +
      modelSet.length + ' 个模型 × ' + harnessSet.length + ' 个 Harness';
  }

  /* 数据文件虽然是 <script> 引入的，但它会被浏览器 / CDN 缓存 10 分钟（max-age=600），
     刚推上去的新实测会看不见。这里再 fetch 一次做校验，真变了就整页重渲染。 */
  function refreshData() {
    if (typeof window.fetch !== 'function') return;
    window.fetch('data/projects.js', { cache: 'no-cache' })
      .then(function (response) { return response.ok ? response.text() : null; })
      .then(function (text) {
        if (!text) return;
        var fresh = null;
        try {
          fresh = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
        } catch (error) {
          return;
        }
        if (!fresh || !fresh.projects) return;
        if (JSON.stringify(fresh) === JSON.stringify(DATA)) return;
        DATA = fresh;
        renderAll();
      })
      .catch(function () { /* 拉不到就用页面里这份 */ });
  }

  function init() {
    renderAll();
    refreshData();
  }

  /* 事件委托：点预览图放大 */
  el.projects.addEventListener('click', function (event) {
    var dump = event.target.closest ? event.target.closest('.shot-abnormal') : null;
    if (dump) {
      openLightboxText(dump.getAttribute('data-title'), dump.getAttribute('data-dump'));
      return;
    }

    var mask = event.target.closest ? event.target.closest('.shot-mask') : null;
    if (!mask) return;
    openLightbox(mask.getAttribute('data-file'), mask.getAttribute('data-title'));
  });

  el.lbClose.addEventListener('click', closeLightbox);
  el.lightbox.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-close')) closeLightbox();
  });
  if (el.tierFilter) el.tierFilter.addEventListener('change', applyFilter);
  if (el.search) el.search.addEventListener('input', applyFilter);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !el.lightbox.hidden) closeLightbox();
  });

  init();
})();
