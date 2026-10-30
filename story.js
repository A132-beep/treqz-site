// Mockup motion: reveals, counters and bars play once as their block scrolls into view (styles in d.css).
document.documentElement.classList.add('js');
addEventListener('DOMContentLoaded', () => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = (el) => {   // data-count="2462": counts up from 0 with thousands commas
    const to = +el.dataset.count, t0 = performance.now(), dur = still ? 0 : 1400;
    const step = (t) => { const k = dur ? Math.min(1, (t - t0) / dur) : 1; el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString('en-IN'); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    e.target.querySelectorAll('[data-count]').forEach(count);
  }), { rootMargin: '0px 0px -12% 0px' });
  document.querySelectorAll('.rv,.ln,.pop,[data-anim]').forEach((el) => io.observe(el));
});
