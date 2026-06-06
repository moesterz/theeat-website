(function () {
  var PLANS = {
    '4.99':  { usd: '4.99',  sar: '24.99' },
    '9.99':  { usd: '9.99',  sar: '49.99' },
    '14.99': { usd: '14.99', sar: '74.99' },
    '20':    { usd: '20',    sar: '99'    }
  };

  function applyUSD() {
    // Simply walk all text nodes and swap £ → $
    walkText(document.body, function (t) {
      return t.replace(/£/g, '$');
    });
  }

  function applySAR() {
    // 1. Price cards: <sup>£</sup>XX<sub>/mo</sub>
    document.querySelectorAll('.price-amount').forEach(function (el) {
      var sup = el.querySelector('sup');
      var sub = el.querySelector('sub');
      var numNode = Array.from(el.childNodes).find(function (n) {
        return n.nodeType === 3 && /\d/.test(n.textContent);
      });
      var raw = numNode ? numNode.textContent.trim() : null;
      var converted = raw && PLANS[raw] ? PLANS[raw].sar : raw;
      if (sup)     sup.textContent  = '';
      if (numNode) numNode.textContent = converted;
      if (sub)     sub.textContent  = ' SAR/mo';
    });

    // 2. Walk remaining text — replace known £X.XX plan price patterns
    var replacements = Object.keys(PLANS).map(function (gbp) {
      return [new RegExp('£' + gbp.replace('.', '\\.'), 'g'), PLANS[gbp].sar + ' SAR'];
    });
    // Catch standalone £ remaining (mockup grocery prices etc.) — just swap symbol
    replacements.push([/£/g, 'SAR ']);

    walkText(document.body, function (t) {
      // Skip elements already handled (.price-amount)
      return replacements.reduce(function (s, r) { return s.replace(r[0], r[1]); }, t);
    }, '.price-amount');
  }

  // Walk text nodes under `root`, skipping descendants of `skipSelector`
  function walkText(root, transform, skipSelector) {
    (function walk(node) {
      if (node.nodeType === 3) {
        var next = transform(node.textContent);
        if (next !== node.textContent) node.textContent = next;
      } else if (node.nodeType === 1) {
        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;
        if (skipSelector && node.matches && node.matches(skipSelector)) return;
        Array.from(node.childNodes).forEach(walk);
      }
    }(root));
  }

  fetch('https://ipapi.co/country/')
    .then(function (r) { return r.text(); })
    .then(function (code) {
      code = code.trim();
      if (code === 'US') applyUSD();
      else if (code === 'SA') applySAR();
    })
    .catch(function () { /* silently keep GBP */ });
}());
