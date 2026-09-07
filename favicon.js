// Tab icon: Solo orange by default, Power blue once we know the signed-in user
// is on Power. Reads the small account cache written by nav.js (only from a
// verified session) so every page can colour the icon before Firebase loads.
(function () {
  var plan = null;
  try {
    var a = JSON.parse(localStorage.getItem("eat.account") || "null");
    plan = (a && a.plan) || localStorage.getItem("eat_tier");
  } catch (e) {}
  var href = plan === "power" ? "icon-power.png" : "icon-solo.png";
  var link = document.querySelector('link[rel="icon"]');
  if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
  link.href = href;
})();
