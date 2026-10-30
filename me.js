// The Treqz Trek Passport on every page: the saved passport (this device only), Google sign-in, the header's sign-in panel
// and the full-screen 3D passport (/passport/book.html). Loaded by header.js and by /passport/, which share everything here.
(() => {
  if (window.TQPass) return;
  const d = document;
  const KEY = 'tq-passport';
  const CLIENT_ID = '458572792185-07592113so3ojqm0usinq3nv6eebsnbv.apps.googleusercontent.com';   // public OAuth Client ID (Google Cloud project Treqz); allowed origins: treqz.com, www.treqz.com, localhost:8001
  const GF = 'https://docs.google.com/forms/d/e/1FAIpQLSdxfB55MurcN-h_KehAHOoOeBqokggc0UqFgxB8u8ztoWXQqQ/formResponse';   // the waitlist form every page uses
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const REGIONS = [   // the app's region list; the atlas has 21 Uttarakhand and 12 Himachal treks
    { name: 'Uttarakhand', totalTreks: 21, icon: 'flags', art: 'temple' }, { name: 'Himachal', totalTreks: 12, icon: 'house' },
    { name: 'Kashmir', icon: 'shikara' }, { name: 'Ladakh', icon: 'stupa' }, { name: 'Sikkim', icon: 'flags' }, { name: 'Northeast', icon: 'bridge' },
    { name: 'Karnataka', icon: 'tea', art: 'ghats' }, { name: 'Maharashtra', icon: 'flags', art: 'fort' }, { name: 'Nilgiris', icon: 'tea' }];

  // shortcut: the number is a hash of the email, so it is stable per person but not guaranteed unique; real numbers come with app accounts
  const L = 'ABCDEFGHJKLMNPQRSTUVWXYZ';   // no I or O, so a number is never misread
  const number = (email) => { let h = 2166136261; for (const c of String(email).trim().toLowerCase()) h = Math.imul(h ^ c.charCodeAt(0), 16777619); h >>>= 0;
    const a = Math.floor(h / 10000); return `TQZ-${String(h % 10000).padStart(4, '0')}-${L[a % 24]}${L[Math.floor(a / 24) % 24]}${L[Math.floor(a / 576) % 24]}`; };
  const trail = (name) => (String(name).trim().toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean).map((w, i, a) => i === a.length - 1 && a.length > 1 ? w[0] : w).join('.') || 'you');
  const today = () => { const t = new Date(); return `${t.getDate()} ${MON[t.getMonth()]} ${t.getFullYear()}`; };
  console.assert(number('a@b.co') === number(' A@B.co ') && /^TQZ-\d{4}-[A-HJ-NP-Z]{3}$/.test(number('a@b.co')) && trail('Aakash Trivedi') === 'aakash.t', 'passport helpers');

  const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } };
  const save = (p) => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} dispatchEvent(new Event('tq-passport')); };
  const signOut = () => { try { localStorage.removeItem(KEY); } catch {} dispatchEvent(new Event('tq-passport')); };
  // the details go to the waitlist sheet, like every other form; true when the request left (no-cors can't see the reply)
  const send = (p) => fetch(GF, { method: 'POST', mode: 'no-cors', body: new URLSearchParams({ 'entry.257845312': p.email.trim(),
    'entry.1319691017': `${location.pathname} | passport ${number(p.email)} | name: ${p.name} | city: ${p.city || ''} | born for: ${p.born || 'Trekker'}${p.google ? ' | google' : ''}`.slice(0, 1500) }) }).then(() => true, () => false);
  // WebGL can't draw another site's image, so a Google photo is copied into the page first ('' if Google refuses)
  const toData = async (url) => { try { const b = await (await fetch(url, { mode: 'cors' })).blob(); return await new Promise((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(b); }); } catch { return ''; } };
  const data3d = (p, photo) => ({ profile: { name: (p.name || '').trim(), trailName: (p.name || '').trim() ? trail(p.name) : '', baseCamp: (p.city || '').trim(),
    bornFor: (p.born || 'Trekker').toLowerCase(), crew: '', passportNo: /@.+\./.test(p.email || '') ? number(p.email) : '', issuedAt: p.date || '', photo: photo || undefined },
    summits: [], regions: REGIONS, endorsements: [], stats: {} });

  // ---- Google sign-in (Google Identity Services) ----
  let gisP = null, onCred = null;
  const gis = () => gisP || (gisP = new Promise((ok, fail) => { const s = d.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.onload = ok; s.onerror = fail; d.head.append(s); }).then(() => {
    // shortcut: the token is read, not verified (there is no server); fine for filling a passport, never for granting access
    google.accounts.id.initialize({ client_id: CLIENT_ID, callback: ({ credential }) => onCred && onCred(JSON.parse(decodeURIComponent(escape(atob(credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))))) });
  }));
  // Google's white button in `el`; cb gets {name, email, picture} once someone signs in
  const googleButton = async (el, cb, width) => { await gis(); onCred = cb; google.accounts.id.renderButton(el, { theme: 'outline', size: 'large', shape: 'pill', text: 'signup_with', width: Math.round(width || 260) }); };
  // a passport straight from a Google profile (base camp can be added later on /passport/)
  const fromGoogle = async (t) => { const p = { name: t.name || '', email: t.email || '', city: '', born: 'Trekker', picture: t.picture || '', google: true, date: today() };
    if (!(await send(p))) return null; save(p); return p; };

  // ---- shared styles for the panel and the overlay ----
  const css = () => { if (d.getElementById('tq-pass-css')) return; d.head.insertAdjacentHTML('beforeend', `<style id="tq-pass-css">
    .tq-panel{position:fixed;z-index:60;width:min(320px,calc(100vw - 32px));padding:22px;border-radius:22px;background:#f4ead2;color:#14332a;box-shadow:0 30px 70px rgba(0,0,0,.45);font-family:'Google Sans Flex',system-ui,sans-serif;opacity:0;translate:0 -8px;transition:opacity .25s,translate .3s cubic-bezier(.2,.8,.2,1)}
    .tq-panel.on{opacity:1;translate:0 0}
    .tq-panel b{display:block;font-size:19px;letter-spacing:-.01em}.tq-panel p{margin:6px 0 16px;font-size:14px;color:#4f5f57;line-height:1.4}
    .tq-panel .g{display:flex;justify-content:center;min-height:44px}.tq-panel a{display:block;margin-top:14px;text-align:center;font-size:14px;font-weight:600;color:#14332a}
    .tq-panel .x{position:absolute;top:10px;right:12px;border:0;background:none;font-size:22px;line-height:1;color:#4f5f57;cursor:pointer}
    .tq-ov{width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:transparent;color:#fff;font-family:'Google Sans Flex',system-ui,sans-serif}
    .tq-ov::backdrop{background:rgba(1,22,16,.86);backdrop-filter:blur(6px)}
    .tq-ov[open]{display:grid;grid-template-rows:auto 1fr auto;animation:tqin .4s cubic-bezier(.2,.8,.2,1)}
    @keyframes tqin{from{opacity:0;scale:.96}}
    .tq-ov header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px clamp(16px,4vw,40px)}
    .tq-ov header b{font-size:18px}.tq-ov header small{display:block;font-size:13px;color:rgba(255,255,255,.65)}
    .tq-ov .close{width:48px;height:48px;border:0;border-radius:50%;background:#e5fcc9;color:#054634;font-size:26px;line-height:1;cursor:pointer}
    .tq-ov iframe{width:100%;height:100%;border:0;background:none;color-scheme:normal;opacity:0;transition:opacity .4s}   /* shown once it holds this passport, not the sample */
    .tq-ov iframe.ready{opacity:1}
    .tq-ov footer{display:flex;justify-content:center;flex-wrap:wrap;gap:8px 20px;padding:14px 16px 22px;font-size:14px;color:rgba(255,255,255,.7)}
    .tq-ov footer button{background:none;border:0;padding:0;color:#e5fcc9;font:600 14px inherit;font-family:inherit;text-decoration:underline;cursor:pointer}
    .tq-ov footer a{color:#e5fcc9;font-weight:600}
    @media (prefers-reduced-motion:reduce){.tq-ov[open]{animation:none}.tq-panel{transition:none}}
  </style>`); };

  // ---- the header's sign-in panel: Google, or email on /passport/ ----
  let panel = null;
  const closePanel = () => { panel?.remove(); panel = null; d.removeEventListener('pointerdown', outside, true); };
  const outside = (e) => { if (panel && !panel.contains(e.target) && !e.target.closest('.me')) closePanel(); };
  function signInPanel(anchor) {
    if (panel) return closePanel();
    css();
    panel = d.createElement('div'); panel.className = 'tq-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Sign in to Treqz');
    panel.innerHTML = '<button class="x" type="button" aria-label="Close">×</button><b>Get your Trek Passport</b><p>Free, in one tap. Your summits get stamped in the Treqz app.</p><div class="g"></div><a href="/passport/">Or sign up with email →</a>';
    const r = anchor.getBoundingClientRect();
    panel.style.top = `${Math.round(r.bottom + 10)}px`;
    d.body.append(panel);
    panel.style.left = `${Math.round(Math.min(Math.max(16, r.right - panel.offsetWidth), innerWidth - panel.offsetWidth - 16))}px`;   // under the button, never off-screen
    void panel.offsetWidth; panel.classList.add('on');   // fade in now; waiting for an animation frame left it invisible when frames were skipped 
    panel.querySelector('.x').onclick = closePanel;
    d.addEventListener('pointerdown', outside, true);
    googleButton(panel.querySelector('.g'), async (t) => {
      panel.querySelector('p').textContent = 'Making your passport…';
      const p = await fromGoogle(t);
      if (!p) { panel.querySelector('p').textContent = 'We could not reach our list. Check your connection and try again.'; return; }
      closePanel(); openPassport(true);
    }, Math.min(276, panel.clientWidth - 44)).catch(() => { panel.querySelector('.g').textContent = 'Google sign-in could not load here.'; });
  }

  // ---- the passport, full screen over the page ----
  function openPassport(fresh) {
    const p = get(); if (!p) return void (location.href = '/passport/');
    css();
    const ov = d.createElement('dialog'); ov.className = 'tq-ov'; ov.setAttribute('aria-label', 'Your Treqz Trek Passport');
    ov.innerHTML = `<header><div><b></b><small></small></div><button class="close" type="button" aria-label="Close passport">×</button></header>
      <iframe title="Your Trek Passport in 3D: drag a page to turn it" src="/passport/book.html"></iframe>
      <footer><span>${fresh ? "You're in. " : ''}Drag a page to turn it.</span>${p.city ? '' : '<a href="/passport/">Add your base camp</a>'}<button type="button" class="out">Sign out</button></footer>`;
    ov.querySelector('b').textContent = fresh ? `Welcome, ${(p.name || '').split(/\s+/)[0]}!` : (p.name || 'Your passport');
    ov.querySelector('small').textContent = `Trek Passport ${number(p.email)}`;
    const tidy = () => { ov.remove(); d.documentElement.style.overflow = ''; };
    const close = () => { if (ov.open) ov.close(); tidy(); };
    ov.querySelector('.close').onclick = close;
    ov.querySelector('.out').onclick = () => { signOut(); close(); };
    ov.addEventListener('cancel', (e) => { e.preventDefault(); close(); });   // Esc
    ov.addEventListener('close', tidy);   // any other way it closes
    ov.addEventListener('click', (e) => { if (e.target === ov) close(); });   // a click on the dimmed edge closes it
    d.body.append(ov); ov.showModal(); d.documentElement.style.overflow = 'hidden';
    const fr = ov.querySelector('iframe');
    fr.addEventListener('load', async () => {
      const w = fr.contentWindow; fr.contentDocument.documentElement.classList.remove('preview');
      const photo = p.picture ? await toData(p.picture) : '';
      const ready = () => { if (!w.TrekPassport) return setTimeout(ready, 60); w.dispatchEvent(new Event('resize')); w.TrekPassport.setData(data3d(p, photo)); setTimeout(() => { fr.classList.add('ready'); w.TrekPassport.open(); }, 350); };
      ready();
    });
  }

  window.TQPass = { KEY, CLIENT_ID, REGIONS, number, trail, today, get, save, signOut, send, toData, data3d, googleButton, signInPanel, openPassport };
})();
