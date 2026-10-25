// Page veil: five light columns lift away on arrival (left first) and drop back down before leaving for another page.
// Loaded sync in <head> on every page (build_dist.py adds it in dist/); the html::after cover stops a flash before the columns exist.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const d = document, de = d.documentElement, first = !sessionStorage.vl;
  sessionStorage.vl = 1;
  de.classList.add('vl');
  d.head.insertAdjacentHTML('beforeend', `<style>
html.vl::after{content:'';position:fixed;inset:0;z-index:2147483647;background:#f2f8ec}
.veil{position:fixed;inset:0;z-index:2147483647;display:flex;pointer-events:none}
.veil i{flex:1;background:#f2f8ec;border-left:1px solid rgba(3,52,42,.08);transform-origin:top;transition:transform .9s cubic-bezier(.7,0,.2,1) calc(var(--k) * 90ms)}
.veil.up i{transform:scaleY(0)}
.veil.go{pointer-events:auto}.veil.go i{transform:scaleY(1);transition-duration:.6s}
.veil img{position:absolute;left:50%;top:50%;width:150px;translate:-50% -50%;transition:opacity .4s}
.veil.up img{opacity:0}
</style>`);
  const v = d.createElement('div');
  v.className = 'veil';
  v.setAttribute('aria-hidden', 'true');
  v.innerHTML = [0, 1, 2, 3, 4].map((k) => `<i style="--k:${k}"></i>`).join('') + '<img src="/img/logo-green.svg" alt="">';
  const lift = () => setTimeout(() => v.classList.add('up'), first ? 700 : 120);   // logo holds on the first visit only
  d.addEventListener('DOMContentLoaded', () => { d.body.append(v); de.classList.remove('vl'); void v.offsetWidth; lift(); });   // reflow first so the lift transitions; timers, not rAF, so a background tab still clears
  addEventListener('pageshow', (e) => { if (e.persisted) v.classList.remove('go'), v.classList.add('up'); });   // back button: never return to a covered page
  d.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target || a.hasAttribute('download')) return;
    const u = new URL(a.href, location);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash)) return;   // other sites and in-page jumps go straight through
    e.preventDefault();
    v.classList.remove('up'); v.classList.add('go');
    setTimeout(() => { location.href = u.href; }, 600 + 4 * 90);
  });
})();
