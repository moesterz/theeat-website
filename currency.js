(function () {
  function applyUSD() {
    walkText(document.body, function (t) {
      return t.replace(/£/g, '$');
    });
  }

  function walkText(root, transform) {
    (function walk(node) {
      if (node.nodeType === 3) {
        var next = transform(node.textContent);
        if (next !== node.textContent) node.textContent = next;
      } else if (node.nodeType === 1) {
        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;
        Array.from(node.childNodes).forEach(walk);
      }
    }(root));
  }

  fetch('https://ipapi.co/country/')
    .then(function (r) { return r.text(); })
    .then(function (code) {
      if (code.trim() === 'US') applyUSD();
    })
    .catch(function () { /* silently keep GBP */ });
}());
