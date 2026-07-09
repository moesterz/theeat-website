// Shared favicon. Coral by default; blue once we know the signed-in user is on
// Power. The tier is cached in localStorage by account.html / welcome.html after
// a real /subscription/status check, so we don't have to load Firebase on every
// page just to colour the browser-tab icon.
(function () {
  var tier = null;
  try { tier = localStorage.getItem('eat_tier'); } catch (e) {}
  var href = tier === 'power' ? 'favicon-eat-power.png' : 'favicon-eat.png';
  var link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    document.head.appendChild(link);
  }
  link.href = href;
})();
