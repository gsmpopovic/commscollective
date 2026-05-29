/**
 * Mobile navigation toggle
 */
(function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    nav.classList.toggle('is-open');
    var expanded = nav.classList.contains('is-open');
    toggle.setAttribute('aria-expanded', expanded);
    toggle.textContent = expanded ? 'Close' : 'Menu';
  });
})();

/**
 * Render events from data/events.json into any <ul data-events-list="…"> on the page.
 * The attribute value is a comma-separated list of event types to include
 * (e.g. "flagship" or "networking,coffee-corner").
 */
(function () {
  var lists = document.querySelectorAll('[data-events-list]');
  if (!lists.length) return;

  fetch('data/events.json', { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error('events.json HTTP ' + r.status);
      return r.json();
    })
    .then(function (data) {
      var events = (data && data.events) || [];
      events.sort(function (a, b) {
        var ad = a.date || '\uFFFF';
        var bd = b.date || '\uFFFF';
        return ad.localeCompare(bd);
      });

      lists.forEach(function (ul) {
        var types = (ul.getAttribute('data-events-list') || '')
          .split(',')
          .map(function (s) { return s.trim(); })
          .filter(Boolean);
        var filtered = events.filter(function (e) { return types.indexOf(e.type) !== -1; });
        ul.innerHTML = filtered.length
          ? filtered.map(renderEventCard).join('')
          : '<li class="event-cards__item"><p class="event-cards__meta">No events scheduled yet.</p></li>';
      });
    })
    .catch(function (err) {
      console.error('Failed to load events:', err);
      lists.forEach(function (ul) {
        ul.innerHTML = '<li class="event-cards__item"><p class="event-cards__meta">Events list unavailable. Please check back soon.</p></li>';
      });
    });

  function renderEventCard(event) {
    var dateLabel = formatDate(event.date);
    var metaParts = [dateLabel, event.location].filter(Boolean);
    return ''
      + '<li class="event-cards__item">'
      + '<h4 class="event-cards__title">' + escapeHtml(event.title || 'Untitled event') + '</h4>'
      + '<p class="event-cards__meta">' + escapeHtml(metaParts.join(' · ')) + '</p>'
      + '</li>';
  }

  function formatDate(iso) {
    if (!iso) return 'Date TBC';
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return 'Date TBC';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s == null ? '' : String(s);
    return div.innerHTML;
  }
})();
