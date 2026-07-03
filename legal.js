/* Eat — legal page TOC scroll-spy. Fail-open, no hidden content. */
(function () {
  const links = Array.from(document.querySelectorAll('.legal-toc a'));
  const map = new Map();
  links.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) map.set(sec, a);
  });
  if (!map.size) return;

  const setActive = (a) => { links.forEach(l => l.classList.toggle('active', l === a)); };
  setActive(links[0]);

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(map.get(e.target)); });
    }, { rootMargin: '-96px 0px -70% 0px', threshold: 0 });
    map.forEach((_, sec) => io.observe(sec));
  }
})();
