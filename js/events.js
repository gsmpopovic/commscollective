/**
 * Load and render events from data/events.json
 */
(function () {
  var container = document.getElementById('events-list');
  if (!container) return;

  if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
    container.innerHTML = '<p class="empty-state">Events load from JSON and require a web server. Run <code>npx serve</code> or <code>python3 -m http.server 8000</code> in this folder, then open the URL (e.g. http://localhost:3000/events.html).</p>';
    return;
  }

  var basePath = container.getAttribute('data-base') || '';
  var path = basePath + 'data/events.json';

  container.innerHTML = '<p class="loading">Loading events…</p>';

  fetch(path)
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load events');
      return res.json();
    })
    .then(function (events) {
      if (!events || !events.length) {
        container.innerHTML = '<p class="empty-state">No upcoming events at the moment. Check back soon.</p>';
        return;
      }
      container.innerHTML = events.map(function (event) {
        var dateStr = formatDate(event.date);
        var link = event.link
          ? '<p><a href="' + escapeHtml(event.link) + '" rel="noopener noreferrer">Sign up or learn more →</a></p>'
          : '';
        return (
          '<article class="event-item">' +
          '<p class="meta">' + escapeHtml(dateStr) + ' · ' + escapeHtml(event.location) + '</p>' +
          '<h3>' + escapeHtml(event.title) + '</h3>' +
          '<p>' + escapeHtml(event.description) + '</p>' +
          link +
          '</article>'
        );
      }).join('');
    })
    .catch(function () {
      container.innerHTML = '<p class="empty-state">We couldn’t load events right now. Please try again later.</p>';
    });

  function formatDate(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
