/* Shruti Singh Baghel — portfolio: nav + theme toggles (no dependencies). */
(function () {
  'use strict';

  var root = document.documentElement;

  /* Dark-mode toggle (initial theme is set by the inline <head> script). */
  var themeBtn = document.getElementById('theme-toggle');

  /* Reflect the active theme on the toggle button (a11y state) and in the
     browser-chrome color, so both follow data-theme exactly. */
  function reflectTheme(theme) {
    var dark = theme === 'dark';
    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    }
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) {
      metas[i].setAttribute('content', dark ? '#14161a' : '#ffffff');
    }
  }

  reflectTheme(root.getAttribute('data-theme') || 'light');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      reflectTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });
  }

  /* Mobile hamburger menu. */
  var navBtn = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (navBtn && menu) {
    navBtn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    /* Close the menu after choosing a section link. */
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('open');
        navBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Scrollspy: highlight the nav link of the section currently in view. */
  var navLinks = document.querySelectorAll('.nav-link');
  var spySections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && navLinks.length && spySections.length) {
    var linkById = {};
    for (var i = 0; i < navLinks.length; i++) {
      var href = navLinks[i].getAttribute('href') || '';
      if (href.charAt(0) === '#') { linkById[href.slice(1)] = navLinks[i]; }
    }
    var spy = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        var entry = entries[j];
        if (entry.isIntersecting && linkById[entry.target.id]) {
          for (var k = 0; k < navLinks.length; k++) {
            navLinks[k].classList.remove('active');
          }
          linkById[entry.target.id].classList.add('active');
        }
      }
    }, { rootMargin: '-30% 0px -60% 0px' });
    for (var s = 0; s < spySections.length; s++) { spy.observe(spySections[s]); }
  }
})();
