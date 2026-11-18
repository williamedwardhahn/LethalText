(function () {
  var $ = function (id) { return document.getElementById(id); };
  var root = document.documentElement;
  var SIZES = [0.88, 1, 1.12, 1.25, 1.4];
  var KEY = 'lt-reader';

  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
  if (state.size == null || !SIZES[state.size]) state.size = 1;
  var BOOK = root.getAttribute('data-book') || 'book';
  if (!state.pos) state.pos = {};
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  var sections = [].slice.call(document.querySelectorAll('[data-section]'));
  var tocLinks = [].slice.call(document.querySelectorAll('#toc a[data-id]'));
  var bar = $('bar'), where = $('where'), pct = $('pct'), fill = $('fill');
  var current = null;

  /* ----- preferences ----- */
  function keepPlace(change) {
    // Changing type size or theme reflows the page; hold the reader's place.
    var sec = current || sections[0], r = sec.getBoundingClientRect();
    var frac = r.height ? -r.top / r.height : 0;
    change();
    var r2 = sec.getBoundingClientRect();
    window.scrollTo(0, window.scrollY + r2.top + frac * r2.height);
  }
  function paintPrefs() {
    var theme = root.getAttribute('data-theme');
    [].forEach.call(document.querySelectorAll('#themes button'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-theme') === theme));
    });
    $('smaller').disabled = state.size <= 0;
    $('larger').disabled = state.size >= SIZES.length - 1;
  }
  $('themes').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    keepPlace(function () { root.setAttribute('data-theme', b.getAttribute('data-theme')); });
    state.theme = b.getAttribute('data-theme'); save(); paintPrefs();
  });
  function resize(d) {
    var n = Math.max(0, Math.min(SIZES.length - 1, state.size + d));
    if (n === state.size) return;
    keepPlace(function () { root.style.setProperty('--scale', SIZES[n]); });
    state.size = n; save(); paintPrefs();
  }
  $('smaller').addEventListener('click', function () { resize(-1); });
  $('larger').addEventListener('click', function () { resize(1); });

  /* ----- panels ----- */
  var open = null;
  function show(name) {
    hide();
    var panel = $(name), btn = $(name + 'Btn');
    panel.hidden = false; btn.setAttribute('aria-expanded', 'true');
    $('scrim').hidden = false; open = name;
    if (name === 'toc') {
      var cur = panel.querySelector('[aria-current]');
      if (cur) cur.scrollIntoView({ block: 'center' });
      (cur || $('tocClose')).focus({ preventScroll: true });
    } else {
      panel.querySelector('[aria-pressed="true"]').focus();
    }
  }
  function hide(refocus) {
    if (!open) return;
    $(open).hidden = true; $(open + 'Btn').setAttribute('aria-expanded', 'false');
    $('scrim').hidden = true;
    if (refocus) $(open + 'Btn').focus();
    open = null;
  }
  $('tocBtn').addEventListener('click', function () { open === 'toc' ? hide() : show('toc'); });
  $('prefsBtn').addEventListener('click', function () { open === 'prefs' ? hide() : show('prefs'); });
  $('tocClose').addEventListener('click', function () { hide(true); });
  $('scrim').addEventListener('click', function () { hide(); });
  $('toc').addEventListener('click', function (e) { if (e.target.closest('a')) hide(); });

  /* ----- progress, current chapter, remembered place ----- */
  var ticking = false, loaded = false;
  function update() {
    ticking = false;
    var y = window.scrollY, line = y + 80, sec = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= line) sec = sections[i]; else break;
    }
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    pct.textContent = Math.round(p * 100) + '%';
    fill.style.width = (p * 100) + '%';
    bar.classList.toggle('on', y > window.innerHeight * 0.5);

    if (sec !== current) {
      current = sec;
      var label = sec.getAttribute('data-label'), title = sec.getAttribute('data-title');
      where.textContent = '';
      if (title) {
        var b = document.createElement('b'); b.textContent = label;
        where.appendChild(b); where.appendChild(document.createTextNode(' · ' + title));
      }
      tocLinks.forEach(function (a) {
        if (a.getAttribute('data-id') === sec.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
    if (loaded && sec.id !== 'cover') {
      state.pos[BOOK] = { id: sec.id, frac: Math.max(0, (y - sec.offsetTop) / sec.offsetHeight), p: p };
      save();
    }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);

  /* Offer to pick up where the reader left off, rather than jumping there. */
  var at = state.pos[BOOK], saved = at && $(at.id);
  if (saved && !location.hash) {
    var begin = $('begin'), frac = at.frac || 0;
    begin.textContent = 'Resume · ' + saved.getAttribute('data-label');
    begin.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo(0, saved.offsetTop + frac * saved.offsetHeight);
    });
  }

  /* ----- keyboard ----- */
  function go(d) {
    var i = sections.indexOf(current) + d;
    if (i < 0 || i >= sections.length) return;
    window.scrollTo(0, i === 0 ? 0 : sections[i].offsetTop - 44);
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { hide(true); return; }
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || open) return;
    if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
  });

  paintPrefs();
  update();
  loaded = true;
})();
