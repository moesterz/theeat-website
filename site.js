/* Eat site v2 — shared motion helpers */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll reveals — fail-open: never leave content hidden */
  const rvEls = Array.from(document.querySelectorAll('.rv, .rv-scale'));
  const vh = () => window.innerHeight || document.documentElement.clientHeight || 0;
  const inView = (el) => {
    const h = vh();
    if (!h) return false; /* not measurable yet — retry later */
    const r = el.getBoundingClientRect();
    return r.top < h * 0.96 && r.bottom > 0;
  };
  const sweep = () => rvEls.forEach(el => { if (!el.classList.contains('in') && inView(el)) el.classList.add('in'); });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rvEls.forEach(el => io.observe(el));
  }
  /* Failsafe sweeps: IO can silently never fire in some embedded contexts,
     and layout may not be measurable at script time. Sweep on every
     lifecycle event + a repeating timer for the first few seconds. */
  sweep();
  window.addEventListener('scroll', sweep, { passive: true });
  window.addEventListener('resize', sweep);
  window.addEventListener('load', sweep);
  document.addEventListener('DOMContentLoaded', sweep);
  document.addEventListener('visibilitychange', sweep);
  let sweeps = 0;
  const tick = setInterval(() => {
    sweep();
    if (++sweeps >= 10 || rvEls.every(el => el.classList.contains('in'))) clearInterval(tick);
  }, 400);

  /* Nav: shadow on scroll + hide on scroll-down, reveal on scroll-up */
  const nav = document.querySelector('.nav');
  if (nav) {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 24);
      /* only hide once past the nav itself; always reveal when scrolling up */
      if (y > lastY && y > 120) nav.classList.add('nav-hidden');
      else if (y < lastY) nav.classList.remove('nav-hidden');
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Magnetic buttons */
  if (!reduce && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* Word cycler: <span data-cycle='["a","b"]'> — fail-open: visible is the
     default state; every tick force-resets before animating, nothing can stick. */
  document.querySelectorAll('[data-cycle]').forEach(el => {
    const words = JSON.parse(el.getAttribute('data-cycle'));
    let i = 0;
    el.textContent = words[0];
    if (reduce) return;
    el.classList.add('cycle-word');
    const reset = () => { el.classList.remove('cycle-out', 'cycle-in'); };
    document.addEventListener('visibilitychange', reset);
    setInterval(() => {
      reset(); /* always start from visible state */
      if (document.hidden) return; /* don't animate while throttled */
      el.classList.add('cycle-out');
      setTimeout(() => {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        reset();
        el.classList.add('cycle-in');
        setTimeout(() => el.classList.remove('cycle-in'), 500);
      }, 260);
      /* watchdog: whatever happens, never stay hidden longer than 700ms */
      setTimeout(() => el.classList.remove('cycle-out'), 700);
    }, 2600);
  });

  window.__eatReduceMotion = reduce;
})();
