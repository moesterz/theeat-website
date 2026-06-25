/* Localized prices for static pages. Fills any [data-price="plan.period"] element
   with the visitor's currency, detected by COUNTRY via the worker's /geo
   (Cloudflare edge) — the SAME source used to set the Stripe charge currency, so
   what's shown matches what's billed. plan = solo|power, period = mo|yr.
   Optional [data-price-suffix] (e.g. "/mo"). GBP is the safe fallback.
   (iOS prices are separate — App Store Connect sets them by Apple Account country.) */
(function () {
  var WORKER = "https://eat-claude-proxy.mohammed-alsafwani.workers.dev";
  var P = {
    gbp: { sym: "£",    dp: 2, mo: { solo: 4.99, power: 9.99 }, yr: { solo: 49.99, power: 99.99 } },
    usd: { sym: "$",    dp: 2, mo: { solo: 4.99, power: 9.99 }, yr: { solo: 49.99, power: 99.99 } },
    sar: { sym: "SAR ", dp: 2, mo: { solo: 19.99, power: 39.99 }, yr: { solo: 199.99, power: 399.99 } },
  };
  function fmt(cur, n) { return P[cur].sym + Number(n).toFixed(P[cur].dp); }
  function fill(cur) {
    if (!P[cur]) cur = "gbp";
    document.querySelectorAll("[data-price]").forEach(function (el) {
      var parts = (el.getAttribute("data-price") || "").split(".");
      var period = P[cur][parts[1]]; var v = period && period[parts[0]];
      if (v == null) return;
      el.textContent = fmt(cur, v) + (el.getAttribute("data-price-suffix") || "");
    });
  }
  var cur = "gbp";
  try { cur = localStorage.getItem("eat_cur") || "gbp"; } catch (e) {}
  fill(cur);
  fetch(WORKER + "/geo").then(function (r) { return r.json(); }).then(function (g) {
    if (g && P[g.currency]) { try { localStorage.setItem("eat_cur", g.currency); } catch (e) {} fill(g.currency); }
  }).catch(function () {});
})();
