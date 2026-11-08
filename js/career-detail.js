/**
 * CAREER-DETAIL.JS — Nowl Vision Games
 * Renders one job from window.NVG_JOBS (js/careers-data.js) via career_detail.html?id=<slug>
 */
(function () {
  'use strict';

  var SITE_NAME = 'Nowl Vision Games';

  function byId(id) { return document.getElementById(id); }

  function formatDate(iso, lang) {
    var p = String(iso).split('-');
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    if (isNaN(d.getTime())) return String(iso);
    return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  function fillList(ul, items) {
    (items || []).forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
  }

  function addBadge(wrap, text) {
    var badge = document.createElement('span');
    badge.className = 'job-badge';
    badge.textContent = text;
    wrap.appendChild(badge);
  }

  function setApplyLink(link, url) {
    var target = url || '#';
    link.setAttribute('href', target);
    if (target === '#') {
      // Placeholder link: stay where we are instead of jumping to the top
      link.addEventListener('click', function (e) { e.preventDefault(); });
    } else {
      link.target = '_blank';
      link.rel = 'noopener';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var id  = new URLSearchParams(window.location.search).get('id');
    var job = (window.NVG_JOBS || []).filter(function (j) { return j.id === id; })[0];

    if (!job) {
      var setNotFoundTitle = function () {
        document.title = window.NVG_t('careers-not-found') + ' — ' + SITE_NAME;
      };
      byId('jobNotFound').hidden = false;
      setNotFoundTitle();
      document.addEventListener('nvg:langchange', setNotFoundTitle);
      return;
    }

    document.title = job.title + ' — ' + SITE_NAME;
    document.querySelector('meta[name="description"]').setAttribute('content',
      job.title + ' at ' + SITE_NAME + ' (' + job.department + ', ' + job.division + ', ' + job.contract + '). Remote position.');

    byId('jobTitle').textContent = job.title;

    var dateEl = byId('jobDate');
    var renderDate = function () {
      dateEl.textContent = formatDate(job.datePosted, window.NVG_getLang());
    };
    renderDate();
    document.addEventListener('nvg:langchange', renderDate);

    var badges = byId('jobBadges');
    addBadge(badges, job.department);
    addBadge(badges, job.division);
    addBadge(badges, job.contract);

    fillList(byId('jobResponsibilities'), job.responsibilities);
    fillList(byId('jobRequirements'), job.requirements);
    fillList(byId('jobBenefits'), job.benefits);
    byId('jobHowToApply').textContent = job.howToApply;

    setApplyLink(byId('jobApply'), job.applyUrl);
    setApplyLink(byId('jobApplyForm'), job.applyUrl);

    byId('jobDetail').hidden = false;
  });
})();
