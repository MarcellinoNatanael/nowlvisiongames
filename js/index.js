/**
 * HOME.JS — Nowl Vision Games
 * Division filter tabs (Projects carousel is handled by global.js's generic initCarousel)
 * Our Projects: tap-to-reveal overlay on touch devices
 */
(function () {
  'use strict';

  /* ---- Our Projects: tap-to-reveal overlay (touch only, see index.css) ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var track = document.getElementById('projTrack');
    if (!track) return;

    var touchMode = window.matchMedia('(hover: none), (pointer: coarse)');
    var cards = track.querySelectorAll('.project-card');

    function hideAll(except) {
      cards.forEach(function (c) {
        if (c !== except) c.classList.remove('is-active');
      });
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (!touchMode.matches || e.target.closest('.btn-project-view')) return;
        hideAll(card);
        card.classList.toggle('is-active');
      });
    });

    // Tap anywhere else (including carousel arrows and dots) hides the overlay
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.project-card')) hideAll();
    });

    // A swipe fires no click, so it needs its own check
    var startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (Math.abs(startX - e.changedTouches[0].clientX) > 10) hideAll();
    }, { passive: true });
  });

  /* ---- Division filter tabs ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('#careers-preview .tab-btn');
    var rows = document.querySelectorAll('#jobTableBody .job-row');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var f = tab.dataset.filter;
        rows.forEach(function (r) {
          r.style.display = (f === 'all' || r.dataset.division === f) ? '' : 'none';
        });
      });
    });
  });

})();
