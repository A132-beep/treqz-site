// Plays each collage scene's settle-in animation when it scrolls into view (styles in collage.css).
(() => {
  document.documentElement.classList.add('sc-js');
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.sc').forEach((el) => io.observe(el));
})();
