// TAILRD | Heart — site behavior
(function () {
  'use strict';

  // flag for CSS scroll-reveal (content stays visible if JS never runs)
  document.documentElement.classList.add('js');

  // --- Mobile menu ---
  var toggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.nav-mobile');

  function setMenuOpen(open) {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileMenu.hidden = !open;
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenuOpen(false);
    });
  }

  // --- Placeholder links (Privacy / Terms): no navigation, no JS errors ---
  document.querySelectorAll('a.placeholder-link').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  // --- Smooth in-page scrolling (skips bare "#" placeholders) ---
  document.querySelectorAll('a[href^="#"]:not(.placeholder-link)').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.getElementById(href.slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Nav: solid white + border once scrolled past the hero ---
  var nav = document.querySelector('.nav');
  var hero = document.querySelector('.hero');
  if (nav) {
    var updateNav = function () {
      var threshold = hero ? hero.offsetTop + hero.offsetHeight - 72 : 8;
      nav.classList.toggle('scrolled', window.scrollY > threshold);
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav, { passive: true });
    updateNav();
  }

  // --- Flip cards: hover flips on desktop (CSS); tap toggles on touch only ---
  document.querySelectorAll('.flip-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (window.matchMedia('(hover: none)').matches) {
        card.classList.toggle('flipped');
      }
    });
  });

  // --- One-shot scroll reveal ---
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('in-view');
    });
  }
})();
