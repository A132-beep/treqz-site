// Global navigation: one bar on every page (Trek, Run, Crew, Blog, Free tools, Contact), each with a short dropdown, and a burger menu below 1200px.
// Inner pages get the whole header from here; the home page keeps its own header markup and only gets the bar's content (header.css styles both).
// The iPhone app (TREKPEEK_APP) brings its own chrome.
(() => {
  if (window.TREKPEEK_APP || document.getElementById('hmenu')) return;   // only our own menu means "already added", not any class="hd" on the page
  if (new URLSearchParams(location.search).has('embed')) {   // the 3D map inside an operator's site (/embed/): no site chrome, no rival operators, links open a new tab
    document.head.insertAdjacentHTML('beforeend', '<style>#s-ops,#s-ops~*:not(footer){display:none!important}</style>');
    document.querySelector('base')?.setAttribute('target', '_blank');
    return;
  }
  const d = document, p = location.pathname, home = p.replace(/index\.html$/, '') === '/' && d.getElementById('top');
  const month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'][new Date().getMonth()];
  const S = [   // [name, link, dropdown links]
    ['Trek', '/treks/', [['All treks', '/treks/'], ['This month', `/treks-in-${month}/`], ['Guides', '/guides/'], ['Trek finder', '/free-tools/trek-finder/']]],
    ['Run', '/run/', [['How it works', '/run/#how'], ['Run clubs', '/run-clubs/'], ['Early access', '/run/#join']]],
    ['Crew', '/crew/', [['Register your crew', '/crew/#join'], ['Brands', '/crew/#brands']]],
    ['Blog', '/blog/', [['Running', '/blog/running/'], ['Trekking', '/blog/trek-guides/'], ['All posts', '/blog/']]],
    ['Free tools', '/free-tools/', [['5 km plan', '/free-tools/5k-running-plan/'], ['Pace calculator', '/free-tools/running-pace-calculator/'], ['Trek finder', '/free-tools/trek-finder/'], ['Club names', '/free-tools/run-club-name-generator/']]],
    ['Contact', '/#contact', []],
  ];
  const cur = home || p.startsWith('/privacy/') ? -1 : p.startsWith('/run') ? 1 : p.startsWith('/crew/') ? 2 : p.startsWith('/blog/') ? 3 : p.startsWith('/free-tools') ? 4 : 0;   // the trek hub also holds the guides and month pages
  const bar = '<span class="tpill"></span>' + S.map(([n, h, k], i) => `<div class="ti"><a href="${h}"${i === cur ? ' aria-current="page"' : ''}>${n}</a>${k.length ? `<div class="dd">${k.map(([a, b], j) => `<a href="${b}" style="--i:${j}">${a}</a>`).join('')}</div>` : ''}</div>`).join('');
  const burger = S.map(([n, h], i) => `<a href="${h}" style="--i:${i}">${n}</a>`).join('');
  if (home) {
    d.querySelector('.tnav').innerHTML = bar; d.querySelector('#menu nav').innerHTML = burger;
  } else {
    const join = d.getElementById('join'), cta = join ? [d.body.dataset.cta || 'Get early access', '#join'] : ['Download App', '/#waitlist'];
    const link = d.createElement('link'); link.rel = 'stylesheet'; link.href = '/header.css'; d.head.append(link);
    d.body.insertAdjacentHTML('afterbegin', `<a class="skip" href="#main">Skip to content</a><header class="hd"><a class="logo" href="/" aria-label="Treqz home"><img src="/img/treqz-cream.svg" alt="Treqz" width="187" height="40"></a>
<nav class="tnav" aria-label="Main">${bar}</nav>
<div class="acts"><a class="btn" href="${cta[1]}">${cta[0]}</a><button class="burger" type="button" popovertarget="hmenu" aria-label="Open menu"><i></i></button></div></header>
<div class="hmenu" id="hmenu" popover data-lenis-prevent><button class="x" type="button" popovertarget="hmenu" popovertargetaction="hide" aria-label="Close menu">×</button>
<nav aria-label="Menu">${burger}</nav><p>The outdoor app for India. Free, works with no network.</p></div>`);
    const mn = d.querySelector('main'); if (mn && !mn.id) mn.id = 'main';   // the skip link's target
    const hd = d.querySelector('.hd'), m = d.getElementById('hmenu');
    hd.style.visibility = 'hidden'; m.style.visibility = 'hidden';   // until header.css lands, so the dropdown lists never flash unstyled
    const reveal = () => { hd.style.visibility = ''; m.style.visibility = ''; };
    link.addEventListener('load', reveal); link.addEventListener('error', reveal); setTimeout(reveal, 2000);
    m.addEventListener('click', (e) => { if (e.target.closest('nav a')) m.hidePopover(); });   // a link closes the menu on its way
    const logo = hd.querySelector('.logo img'), light = d.body.dataset.hd === 'light';   // data-hd="light": a pale hero, so dark ink until the page scrolls
    const sync = () => { const s = scrollY > 40; hd.classList.toggle('s', s); hd.classList.toggle('lt', light && !s); logo.src = light && !s ? '/img/treqz-green.svg' : '/img/treqz-cream.svg'; };
    addEventListener('scroll', sync, { passive: true }); sync();
  }
  // the cream pill slides to the hovered item and rests on the current section
  const tn = d.querySelector('.tnav'), pill = tn.querySelector('.tpill'), items = [...tn.querySelectorAll('.ti')];
  const at = (el, snap) => {   // snap: place it without gliding (first paint, resize, font swap), so it never animates from a size measured while the bar was hidden
    items.forEach((i) => i.classList.toggle('on', i === el)); pill.style.opacity = el ? 1 : 0;
    if (!el) return;
    if (snap) pill.style.transition = 'none';
    pill.style.left = el.offsetLeft + 'px'; pill.style.width = el.offsetWidth + 'px';
    if (snap) { void pill.offsetWidth; pill.style.transition = ''; }
  };
  const rest = (snap) => at(items[cur], snap === true);
  items.forEach((i) => i.addEventListener('mouseenter', () => at(i)));
  tn.addEventListener('mouseleave', () => rest());
  tn.addEventListener('focusin', (e) => at(e.target.closest('.ti')));
  tn.addEventListener('focusout', (e) => { if (!tn.contains(e.relatedTarget)) rest(); });
  rest(true); addEventListener('resize', () => rest(true)); d.fonts?.ready.then(() => rest(true));   // the font swap changes the widths
})();
