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
