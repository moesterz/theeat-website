/* prices.js — the ONE price table for the website.
   Web prices are what Stripe charges (the worker picks the Price by plan+period
   and the currency by country via /geo — same source used here, so what's shown
   is what's billed). Fills [data-price="plan.period"] (period = mo|yr) and
   exposes window.EatPrices for pricing/checkout/account. GBP is the fallback. */
(function () {
  var WORKER = "https://eat-claude-proxy.mohammed-alsafwani.workers.dev";
  var P = {
    gbp: { sym: "£",    mo: { solo: 4.99,  power: 9.99  }, yr: { solo: 49.99,  power: 99.99  } },
    usd: { sym: "$",    mo: { solo: 4.99,  power: 9.99  }, yr: { solo: 49.99,  power: 99.99  } },
    sar: { sym: "SAR ", mo: { solo: 19.99, power: 39.99 }, yr: { solo: 199.99, power: 399.99 } },
  };
  var cur = "gbp";
  try { cur = localStorage.getItem("eat_cur") || "gbp"; } catch (e) {}
  if (!P[cur]) cur = "gbp";
  function fmt(n, c) { c = c || cur; return P[c].sym + Number(n).toFixed(2); }
  function fill() {
    document.querySelectorAll("[data-price]").forEach(function (el) {
      var k = (el.getAttribute("data-price") || "").split(".");
      var v = P[cur][k[1]] && P[cur][k[1]][k[0]];
      if (v == null) return;
      el.textContent = fmt(v) + (el.getAttribute("data-price-suffix") || "");
    });
    document.dispatchEvent(new CustomEvent("eat:prices", { detail: { cur: cur } }));
  }
  window.EatPrices = {
    get cur() { return cur; }, table: P, fmt: fmt,
    price: function (plan, period, c) { return P[c || cur][period === "yr" || period === "annual" ? "yr" : "mo"][plan]; },
    refill: fill,
  };
  fill();
  fetch(WORKER + "/geo").then(function (r) { return r.json(); }).then(function (g) {
    if (g && P[g.currency] && g.currency !== cur) { cur = g.currency; try { localStorage.setItem("eat_cur", cur); } catch (e) {} fill(); }
  }).catch(function () {});
})();
