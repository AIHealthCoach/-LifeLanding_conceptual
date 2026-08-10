(function(){
  "use strict";

  /* ============================================================
     NAV — sticky opacity state + mobile menu (shared with index.html)
     ============================================================ */
  var navEl = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var mobileNavQuery = window.matchMedia('(max-width: 900px)');

  function onScroll(){
    if (window.scrollY > 8) navEl.classList.add('scrolled');
    else navEl.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  function syncNavInert(){
    navLinks.inert = mobileNavQuery.matches && navEl.getAttribute('data-open') !== 'true';
  }
  function closeMenu(){
    navEl.setAttribute('data-open','false');
    navToggle.setAttribute('aria-expanded','false');
    navToggle.setAttribute('aria-label','Открыть меню');
    syncNavInert();
  }
  function openMenu(){
    navEl.setAttribute('data-open','true');
    navToggle.setAttribute('aria-expanded','true');
    navToggle.setAttribute('aria-label','Закрыть меню');
    syncNavInert();
  }
  syncNavInert();
  if (mobileNavQuery.addEventListener) mobileNavQuery.addEventListener('change', syncNavInert);
  if (navToggle){
    navToggle.addEventListener('click', function(){
      var isOpen = navEl.getAttribute('data-open') === 'true';
      if (isOpen) closeMenu(); else openMenu();
    });
    navLinks.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeMenu(); });
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  var reveal = document.querySelectorAll('.sr');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var revealObs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('vis');
          revealObs.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    reveal.forEach(function(el){ revealObs.observe(el); });
  } else {
    reveal.forEach(function(el){ el.classList.add('vis'); });
  }
})();
