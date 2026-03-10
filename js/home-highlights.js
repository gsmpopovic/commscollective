/**
 * Load events and resources for home page highlights (first 2 each)
 */
(function () {
  var eventsEl = document.getElementById('home-events');
  var resourcesEl = document.getElementById('home-resources');
  var basePath = '';
  var isFileProtocol = typeof window !== 'undefined' && window.location && window.location.protocol === 'file:';

  if (isFileProtocol) {
    var msg = '<p class="text-secondary">To see events and resources here, run a local server (e.g. <code>npx serve</code> or <code>python3 -m http.server 8000</code> in this folder) and open the URL (e.g. <a href="http://localhost:3000">http://localhost:3000</a>).</p>';
    if (eventsEl) eventsEl.innerHTML = msg;
    if (resourcesEl) resourcesEl.innerHTML = msg;
    return;
  }

  if (eventsEl) {
    fetch(basePath + 'data/events.json')
      .then(function (res) { return res.ok ? res.json() : []; })
      .then(function (events) {
        var list = (events || []).slice(0, 2);
        if (!list.length) {
          eventsEl.innerHTML = '<p class="text-secondary">No upcoming events right now. <a href="events.html">See events</a>.</p>';
          return;
        }
        eventsEl.innerHTML = '<ul class="grid grid-2">' + list.map(function (e) {
          var d = e.date ? new Date(e.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
          return (
            '<li class="card">' +
            '<p class="meta">' + escapeHtml(d) + ' · ' + escapeHtml(e.location || '') + '</p>' +
            '<h3><a href="events.html">' + escapeHtml(e.title) + '</a></h3>' +
            '<p>' + escapeHtml(e.description || '') + '</p>' +
            '</li>'
          );
        }).join('') + '</ul><p><a href="events.html">All events →</a></p>';
      })
      .catch(function () {
        eventsEl.innerHTML = '<p class="text-secondary"><a href="events.html">View events</a></p>';
      });
  }

  if (resourcesEl) {
    fetch(basePath + 'data/resources.json')
      .then(function (res) { return res.ok ? res.json() : []; })
      .then(function (resources) {
        var list = (resources || []).slice(0, 2);
        if (!list.length) {
          resourcesEl.innerHTML = '<p class="text-secondary"><a href="resources.html">Browse resources</a>.</p>';
          return;
        }
        resourcesEl.innerHTML = '<ul class="grid grid-2">' + list.map(function (r) {
          var link = r.link ? '<a href="' + escapeHtml(r.link) + '" rel="noopener noreferrer">' + escapeHtml(r.title) + '</a>' : escapeHtml(r.title);
          return (
            '<li class="card">' +
            '<span class="category">' + escapeHtml(r.category || '') + '</span>' +
            '<h3>' + link + '</h3>' +
            '<p>' + escapeHtml(r.description || '') + '</p>' +
            '</li>'
          );
        }).join('') + '</ul><p><a href="resources.html">All resources →</a></p>';
      })
      .catch(function () {
        resourcesEl.innerHTML = '<p class="text-secondary"><a href="resources.html">View resources</a></p>';
      });
  }

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
