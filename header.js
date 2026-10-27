// Global header: logo, button and burger, plus the full-screen ribbon menu (Home first). Same as the home page's.
// Loaded on every inner page; the home page has its own copy inline, and the iPhone app (TREKPEEK_APP) brings its own chrome.
(() => {
  if (window.TREKPEEK_APP || document.querySelector('.hd')) return;
  const d = document, join = d.getElementById('join');
  const cta = join ? [d.body.dataset.cta || 'Get early access', '#join'] : ['Download App', '/#waitlist'];
  const link = d.createElement('link'); link.rel = 'stylesheet'; link.href = '/header.css'; d.head.append(link);
  // One menu per hub, so a page only offers what belongs to it. Home is always first; the line under the list points to the other hubs.
  const p = location.pathname, month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'][new Date().getMonth()];
  const HUBS = {
    run: { name: 'Run', href: '/run/', items: [['Run', '/run/'], ['How it works', '/run/#how'], ['Rewards', '/run/#rewards'], ['Run clubs', '/run-clubs/'], ['Early access', '/run/#join']], also: [['Trek', '/treks/'], ['Crew', '/crew/'], ['Free tools', '/free-tools/']] },
    crew: { name: 'Crew', href: '/crew/', items: [['Crew', '/crew/'], ['Brands', '/crew/#brands'], ['Register', '/crew/#join']], also: [['Trek', '/treks/'], ['Run', '/run/'], ['Free tools', '/free-tools/']] },
    trek: { name: 'Trek', href: '/treks/', items: [['Trek hub', '/treks/'], ['Categories', '/treks/#featured'], ['This month', `/treks-in-${month}/`], ['Guides', '/guides/'], ['Blog', '/blog/']], also: [['Run', '/run/'], ['Crew', '/crew/'], ['Free tools', '/free-tools/']] },
    tools: { name: 'Tools', href: '/free-tools/', items: [['Free tools', '/free-tools/'], ['5 km plan', '/free-tools/5k-running-plan/'], ['Pace calculator', '/free-tools/running-pace-calculator/'], ['Trek finder', '/free-tools/trek-finder/'], ['Club names', '/free-tools/run-club-name-generator/']], also: [['Trek', '/treks/'], ['Run', '/run/'], ['Crew', '/crew/']] },
    blog: { name: 'Blog', href: '/blog/', items: [['Blog', '/blog/'], ['Trek', '/treks/'], ['Run', '/run/'], ['Run clubs', '/run-clubs/'], ['Crew', '/crew/']], also: [] },
    none: { name: '', href: '/', items: [['Trek', '/treks/'], ['Run', '/run/'], ['Crew', '/crew/']], also: [] },
  };
  const hub = HUBS[p.startsWith('/run') ? 'run' : p.startsWith('/crew/') ? 'crew' : p.startsWith('/privacy/') ? 'none' : p.startsWith('/blog/') ? 'blog' : p.startsWith('/free-tools') ? 'tools' : 'trek'];
  const items = [['Home', '/'], ...hub.items.filter(([, h]) => !h.includes('#') || h.split('#')[0] === p)];   // a section link shows only on the page that has the section
  const also = hub.also.length ? 'Also on Treqz: ' + hub.also.map(([n, h]) => `<a href="${h}" style="text-decoration:underline">${n}</a>`).join(' · ') : 'The outdoor app for India. Free, works with no network.';
  d.body.insertAdjacentHTML('afterbegin', `<header class="hd"><a class="logo" href="/" aria-label="Treqz home"><img src="/img/treqz-cream.svg" alt="Treqz" width="187" height="40"></a>${hub.name ? `<a class="hub" href="${hub.href}">${hub.name}</a>` : ''}
<div class="acts"><a class="btn" href="${cta[1]}">${cta[0]}</a><button class="burger" type="button" popovertarget="hmenu" aria-label="Open menu"><i></i></button></div></header>
<div class="hmenu" id="hmenu" popover data-lenis-prevent><button class="x" type="button" popovertarget="hmenu" popovertargetaction="hide" aria-label="Close menu">×</button>
<nav aria-label="Menu">${items.map(([n, h], i) => `<a href="${h}" style="--i:${i}">${n}</a>`).join('')}</nav><p>${also}</p></div>`);
  const hd = d.querySelector('.hd'), m = d.getElementById('hmenu');
  m.addEventListener('click', (e) => { if (e.target.closest('nav a')) m.hidePopover(); });   // a link closes the menu on its way
  const logo = hd.querySelector('.logo img'), light = d.body.dataset.hd === 'light';   // data-hd="light": a pale hero, so dark ink until the page scrolls
  const sync = () => { const s = scrollY > 40; hd.classList.toggle('s', s); hd.classList.toggle('lt', light && !s); logo.src = light && !s ? '/img/treqz-green.svg' : '/img/treqz-cream.svg'; };
  addEventListener('scroll', sync, { passive: true }); sync();
})();
