/**
 * CAREER-LOADER.JS — Nowl Vision Games
 * Reads the vacancies from career-data.html for the careers list and detail pages.
 * window.NVG_loadJobs() resolves to an array of job objects, or rejects if the file can't be fetched.
 */
(function () {
  'use strict';

  var DATA_FILE = 'career-data.html';

  // Hand-edited HTML may wrap long text across lines, so inner whitespace is collapsed too
  function clean(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function attr(el, name) {
    return clean(el.getAttribute(name));
  }

  function sectionItems(article, name) {
    var items = article.querySelectorAll('[data-section="' + name + '"] li');
    return Array.prototype.map.call(items, function (li) {
      return clean(li.textContent);
    }).filter(Boolean);
  }

  function toJob(article) {
    var title  = article.querySelector('.job-title');
    var howTo  = article.querySelector('[data-section="how-to-apply"]');
    return {
      id:               attr(article, 'data-id'),
      title:            clean(title && title.textContent),
      department:       attr(article, 'data-department'),
      division:         attr(article, 'data-division'),
      contract:         attr(article, 'data-contract'),
      location:         attr(article, 'data-location'),
      datePosted:       attr(article, 'data-date'),
      responsibilities: sectionItems(article, 'responsibilities'),
      requirements:     sectionItems(article, 'requirements'),
      benefits:         sectionItems(article, 'benefits'),
      howToApply:       clean(howTo && howTo.textContent),
      applyUrl:         attr(article, 'data-apply') || '#'
    };
  }

  function parseJobs(html) {
    var doc  = new DOMParser().parseFromString(html, 'text/html');
    var seen = {};
    var jobs = [];

    Array.prototype.forEach.call(doc.querySelectorAll('article.job'), function (article, i) {
      var job   = toJob(article);
      var block = DATA_FILE + ': blok ke-' + (i + 1) + ' ("' + (job.title || job.id || 'tanpa judul') + '")';

      if (!job.id) {
        console.warn(block + ' dilewati karena data-id kosong.');
      } else if (!job.title) {
        console.warn(block + ' dilewati karena judul kosong.');
      } else if (Object.prototype.hasOwnProperty.call(seen, job.id)) {
        console.warn(block + ' dilewati karena data-id "' + job.id + '" sudah dipakai blok ke-' + seen[job.id] + '.');
      } else {
        seen[job.id] = i + 1;
        jobs.push(job);
      }
    });
    return jobs;
  }

  window.NVG_loadJobs = function () {
    return fetch(DATA_FILE, { cache: 'no-cache' }).then(function (res) {
      if (!res.ok) throw new Error(DATA_FILE + ' responded with ' + res.status);
      return res.text();
    }).then(parseJobs);
  };
})();
