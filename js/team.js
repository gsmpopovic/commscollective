/**
 * Load and render team grid from data/team.json
 */
(function () {
  var container = document.getElementById('team-grid');
  if (!container) return;

  if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
    container.innerHTML = '<p class="empty-state">Team data loads from JSON and requires a web server. Run <code>npx serve</code> or <code>python3 -m http.server 8000</code> in this folder, then open the URL (e.g. http://localhost:3000/team.html).</p>';
    return;
  }

  var basePath = container.getAttribute('data-base') || '';
  var path = basePath + 'data/team.json';

  container.innerHTML = '<p class="loading">Loading team…</p>';

  fetch(path)
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load team');
      return res.json();
    })
    .then(function (members) {
      if (!members || !members.length) {
        container.innerHTML = '<p class="empty-state">Team information will appear here.</p>';
        return;
      }
      container.innerHTML = '<ul class="grid grid-2 grid-3">' + members.map(function (m) {
        var url = basePath + m.bioPage;
        var img = m.image
          ? '<img src="' + escapeHtml(basePath + m.image) + '" alt="" loading="lazy">'
          : '<span class="placeholder">' + (m.name.charAt(0) || '') + '</span>';
        return (
          '<li class="card team-card">' +
          '<a href="' + escapeHtml(url) + '">' +
          '<div class="photo-wrap">' + img + '</div>' +
          '<h3>' + escapeHtml(m.name) + '</h3>' +
          '<p class="role">' + escapeHtml(m.role) + '</p>' +
          '<p class="bio">' + escapeHtml(m.bio) + '</p>' +
          '<span>Read more</span>' +
          '</a>' +
          '</li>'
        );
      }).join('') + '</ul>';
    })
    .catch(function () {
      container.innerHTML = '<p class="empty-state">We couldn’t load team information. Please try again later.</p>';
    });

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
