/**
 * Load and render resources from data/resources.json
 */
(function () {
  var container = document.getElementById('resources-list');
  if (!container) return;

  if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
    container.innerHTML = '<p class="empty-state">Resources load from JSON and require a web server. Run a local server from the site folder and open the URL.</p>';
    return;
  }

  var path = 'data/resources.json';

  container.innerHTML = '<p class="loading">Loading resources…</p>';

  fetch(path)
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load resources');
      return res.json();
    })
    .then(function (resources) {
      if (!resources || !resources.length) {
        container.innerHTML = '<p class="empty-state">No resources yet. Check back soon.</p>';
        return;
      }
      container.innerHTML = resources.map(function (r) {
        var link = r.link
          ? '<a href="' + escapeHtml(r.link) + '" rel="noopener noreferrer">' + escapeHtml(r.title) + ' →</a>'
          : escapeHtml(r.title);
        return (
          '<article class="resource-item">' +
          '<span class="category">' + escapeHtml(r.category) + '</span>' +
          '<h3>' + link + '</h3>' +
          '<p>' + escapeHtml(r.description) + '</p>' +
          '</article>'
        );
      }).join('');
    })
    .catch(function () {
      container.innerHTML = '<p class="empty-state">We couldn’t load resources right now. Please try again later.</p>';
    });

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
