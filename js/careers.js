/**
 * CAREERS.JS — Nowl Vision Games
 * Vacancy list: renders the jobs from career-data.html (js/career-loader.js), live search + dropdown filters
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var form      = document.getElementById('vacancyFilters');
    var search    = document.getElementById('vacancySearch');
    var selDept   = document.getElementById('vacancyDept');
    var selDiv    = document.getElementById('vacancyDiv');
    var selCon    = document.getElementById('vacancyContract');
    var head      = document.getElementById('vacancyHead');
    var list      = document.getElementById('vacancyList');
    var emptyMsg  = document.getElementById('vacancyEmpty');
    var noneMsg   = document.getElementById('vacancyNone'); // static HTML; its links come from T, never from job data
    if (!list) return;

    var jobs = null; // stays null until career-data.html has loaded

    /* ---- Dropdown options from unique data values ---- */
    function fillSelect(select, field) {
      var seen = {};
      jobs.forEach(function (job) { seen[job[field]] = true; });
      Object.keys(seen).sort().forEach(function (value) {
        var opt = document.createElement('option');
        opt.value = value;
        opt.textContent = value;
        select.appendChild(opt);
      });
    }

    /* ---- DOM helpers: job data only ever goes through textContent ---- */
    function span(className, text) {
      var el = document.createElement('span');
      el.className = className;
      if (text !== undefined) el.textContent = text;
      return el;
    }

    // data-t keeps the label in step with later language toggles
    function translated(className, key) {
      var el = span(className, window.NVG_t(key));
      el.setAttribute('data-t', key);
      return el;
    }

    function cell(labelKey, value) {
      var el = span('vacancy-cell');
      el.appendChild(translated('vacancy-label', labelKey));
      el.appendChild(span('vacancy-value', value));
      return el;
    }

    function buildRow(job) {
      var li = document.createElement('li');
      var a  = document.createElement('a');
      a.className = 'vacancy-row';
      a.href = 'career_detail.html?id=' + encodeURIComponent(job.id);
      a.appendChild(span('vacancy-title', job.title));
      a.appendChild(cell('careers-th-dept', job.department));
      a.appendChild(cell('careers-th-div', job.division));
      a.appendChild(cell('careers-th-contract', job.contract));
      a.appendChild(translated('vacancy-details', 'btn-details'));
      li.appendChild(a);
      return li;
    }

    function showEmpty(key) {
      emptyMsg.setAttribute('data-t', key);
      emptyMsg.textContent = window.NVG_t(key);
      emptyMsg.hidden = false;
    }

    /* ---- Filter + render ---- */
    function render() {
      if (!jobs) return; // keep the loading/error message instead of "no vacancies"

      // No vacancies at all: filters and column headers have nothing to act on
      var hasJobs = jobs.length > 0;
      form.hidden = !hasJobs;
      noneMsg.hidden = hasJobs;
      if (!hasJobs) {
        head.hidden = true;
        emptyMsg.hidden = true;
        return;
      }

      var term = search.value.trim().toLowerCase();
      var matches = jobs.filter(function (job) {
        return String(job.title).toLowerCase().indexOf(term) !== -1 &&
          (!selDept.value || job.department === selDept.value) &&
          (!selDiv.value  || job.division   === selDiv.value) &&
          (!selCon.value  || job.contract   === selCon.value);
      });

      list.textContent = '';
      matches.forEach(function (job) { list.appendChild(buildRow(job)); });

      head.hidden = matches.length === 0;
      if (matches.length) {
        emptyMsg.hidden = true;
      } else {
        showEmpty('careers-empty-filter');
      }
    }

    search.addEventListener('input', render);
    [selDept, selDiv, selCon].forEach(function (s) { s.addEventListener('change', render); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      render();
    });

    window.NVG_loadJobs().then(function (loaded) {
      jobs = loaded.slice().sort(function (a, b) {
        return String(b.datePosted).localeCompare(String(a.datePosted));
      });
      fillSelect(selDept, 'department');
      fillSelect(selDiv, 'division');
      fillSelect(selCon, 'contract');
      render();
    }, function (err) {
      console.warn(err);
      showEmpty('careers-load-error');
    });
  });
})();
