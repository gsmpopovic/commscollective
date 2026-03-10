/**
 * Load and render key dates from data/calendar.json
 */
(function () {
  var container = document.getElementById('calendar-list');
  if (!container) return;

  if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
    container.innerHTML = '<p class="empty-state">Calendar loads from JSON and requires a web server. Run <code>npx serve</code> or <code>python3 -m http.server 8000</code> in this folder, then open the URL (e.g. http://localhost:3000/calendar.html).</p>';
    return;
  }

  var basePath = container.getAttribute('data-base') || '';
  var path = basePath + 'data/calendar.json';

  container.innerHTML = '<p class="loading">Loading calendar…</p>';

  fetch(path)
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load calendar');
      return res.json();
    })
    .then(function (data) {
      var dates = data.dates || [];
      if (!dates.length) {
        container.innerHTML = '<p class="empty-state">No dates for this year yet.</p>';
        return;
      }
      var year = data.year || new Date().getFullYear();
      var byMonth = {};
      dates.forEach(function (item) {
        var d = new Date(item.date);
        var monthKey = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        if (!byMonth[monthKey]) byMonth[monthKey] = [];
        byMonth[monthKey].push({ date: item.date, label: item.label, day: d.getDate() });
      });
      var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var html = '<p class="text-secondary calendar-intro">' + escapeHtml(data.description || '') + '</p>';
      Object.keys(byMonth).sort().forEach(function (key) {
        var parts = key.split('-');
        var monthName = monthNames[parseInt(parts[1], 10) - 1];
        html += '<h2 class="calendar-month">' + escapeHtml(monthName) + ' ' + parts[0] + '</h2>';
        html += '<ul class="calendar-dates list-plain">';
        byMonth[key].sort(function (a, b) { return a.day - b.day; }).forEach(function (item) {
          var dateStr = formatDate(item.date);
          html += '<li class="calendar-item">';
          html += '<span class="calendar-date">' + escapeHtml(dateStr) + '</span>';
          html += '<span class="calendar-label">' + escapeHtml(item.label) + '</span>';
          html += '</li>';
        });
        html += '</ul>';
      });
      container.innerHTML = html;
    })
    .catch(function () {
      container.innerHTML = '<p class="empty-state">We couldn’t load the calendar. Please try again later.</p>';
    });

  function formatDate(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
