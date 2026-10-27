/* Trek journey engine: 3D terrain, story cards, trail, weather, sound and almanac widgets.
   A trek page provides the hero and almanac HTML; trek.js and the terrain files sit beside it. */
const isMobile = matchMedia('(max-width: 720px), (hover: none) and (pointer: coarse)').matches;
{   // first paint: a still rendered from this trek's 3D sits behind the hero text until the terrain is ready
  const id = location.pathname.split('/').filter((s) => s && !s.endsWith('.html')).pop();
  document.documentElement.style.setProperty('--poster', `url(${new URL(`../img/${isMobile ? 'poster-m' : 'hero'}/${id}.webp`, location.href)})`);
}
// dynamic imports, so the poster goes up before three.js arrives (static imports hold the whole module)
// the page supplies the content (hero, almanac); trek.js beside it supplies the data
const LIB = window.TREQZ_LIB || '/vendor/npm/';   // the iPhone app points this at copies inside the app
const [THREE, { default: Lenis }, { default: TREK }] = await Promise.all([
  import(LIB + 'three@0.160.0/build/three.module.min.js'),
  import(LIB + 'lenis@1.3.26/dist/lenis.mjs'),
  import(new URL('trek.js', location.href)),
]);
{   // the fixed UI around the hero is the same for every trek
  const hero = document.querySelector('#top');
  hero.insertAdjacentHTML('beforebegin', `<canvas id="gl" aria-hidden="true"></canvas>
<div class="vignette"></div>
<div id="labels" aria-hidden="true"></div>
<a class="brand" href="../" aria-label="Treqz home"><img src="../img/logo-cream.svg" alt="Treqz" width="82" height="22"></a>
<div class="topbar">
  <select class="btn" id="weather" aria-label="Weather"><option value="clear">☀ Clear</option><option value="light" selected>❄ Light snow</option><option value="heavy">❄ Heavy snow</option><option value="fog">☁ Fog</option><option value="blizzard">🌨 Blizzard</option></select>
  <button class="btn" id="soundBtn" aria-pressed="false" title="Sound"><span class="dot"></span><span class="txt">Sound</span></button>
  <button class="btn infoBtn" id="skipBtn" type="button" hidden>Skip to info ↓</button>
  <button class="btn primary" id="playBtn2" aria-pressed="false">▶ <span class="txt">Auto-climb</span></button>
</div>
<nav class="rail" id="rail" aria-label="Stages"></nav>`);
  hero.insertAdjacentHTML('afterend', `<div id="story"></div>
<div id="cards"></div>
<dialog id="gallery" aria-labelledby="galTitle"><header><h3 id="galTitle"></h3><button class="btn" type="button" id="galClose">Close</button></header><div id="galGrid"></div><p class="label galSrc">Photos from Wikimedia Commons · tap a photo for its author and licence</p></dialog>
<div class="hud" id="hud" aria-live="off">
  <div><div class="k">Altitude m</div><div class="v" id="hAlt">1,950</div></div>
  <div><div class="k">Air vs sea lvl</div><div class="v ice" id="hO2">80<small>%</small></div></div>
  <div><div class="k">Est. temp °C</div><div class="v ice" id="hT">6</div></div>
  <div><div class="k">Trail km</div><div class="v" id="hKm">0.0</div></div>
  <div><div class="k" id="hTodK">Evening</div><div class="v" id="hTod">17:20</div></div>
  <div><div class="k">Trek</div><div class="v accent" id="hDay">Day 1</div></div>
</div>`);
}

const $ = (s) => document.querySelector(s);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const fmt = (n) => Math.round(n).toLocaleString('en-IN');

/* ---------------- smooth scroll (Lenis, driven from the render loop) ---------------- */
// native scroll stays the source of truth, so every 'scroll' listener below keeps working
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const lenis = still ? null : new Lenis({
  autoRaf: false, lerp: 0.09, anchors: true,   // anchors honour .sec-head scroll-margin-top
  // let modals and overflowing story cards scroll natively
  prevent: (n) => n.nodeName === 'DIALOG' || (n.classList?.contains('card') && n.scrollHeight > n.clientHeight),
});
// glide time grows with distance (about 2.3 s a stop), so a jump never whips the camera through the trek
const scrollToY = (y) => lenis ? lenis.scrollTo(y, { duration: clamp(Math.abs(y - scrollY) / innerHeight * 1.2, 1.6, 8) }) : window.scrollTo({ top: y, behavior: 'smooth' });

/* ---------------- story stages ---------------- */
// hr = absolute hours since Day 1 00:00
const STAGES = TREK.stages;

/* ---------------- DOM: story beats, cards, rail ---------------- */
const story = $('#story'), cardsEl = $('#cards'), rail = $('#rail');
STAGES.forEach((s, i) => {
  const b = document.createElement('section'); b.className = 'beat'; b.id = 'beat-' + s.id; b.setAttribute('aria-label', s.name); story.appendChild(b);
  if (i === 0) { b.remove(); return; }
  // a long leg gets a taller beat, so the walk to the next stop never rushes: about the same scroll per kilometre
  b.style.height = (190 * clamp(0.7 + Math.abs((STAGES[i + 1] || s).km - s.km) / 9, 1, 3)).toFixed(0) + 'vh';
  const c = document.createElement('article'); c.className = 'card'; c.dataset.i = i;
  c.innerHTML = `<div class="stagecode"><span class="label">${s.code}</span><span class="label">${i}/${STAGES.length - 1}</span></div>
    <h2>${s.title}</h2><div class="deva">${s.deva}</div>
    <div class="stats">${s.stats.map(([k, v, u, d]) => `<div><div class="label">${k}</div><div class="big">${v}${u ? `<small>${u}</small>` : ''}</div><div class="sub">${d}</div></div>`).join('')}</div>
    <p>${s.body[0]}</p>
    <details class="more"><summary>More about ${s.name}</summary>
      ${s.body.slice(1).map((p) => `<p>${p}</p>`).join('')}
      ${s.legend ? `<div class="legend"><span class="label">The legend</span>${s.legend}</div>` : ''}
      <dl>${s.dl.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
      <button class="btn photos" type="button">See photos of ${s.name}</button>
    </details>`;
  c.querySelector('.photos').addEventListener('click', () => openGallery(s));
  cardsEl.appendChild(c);
  const r = document.createElement('button'); r.innerHTML = `<span>${s.name}</span><i></i>`; r.dataset.i = i;
  r.addEventListener('click', () => scrollToStage(i)); rail.appendChild(r);
});
const cards = [...cardsEl.children], railBtns = [...rail.children];

/* ---------------- photo gallery (Wikimedia Commons search, live) ---------------- */
const gal = $('#gallery'), galGrid = $('#galGrid');
$('#galClose').addEventListener('click', () => gal.close());
gal.addEventListener('click', (e) => { if (e.target === gal) gal.close(); });
async function openGallery(s) {
  $('#galTitle').textContent = s.name;
  galGrid.innerHTML = '<p>Loading photos…</p>';
  gal.showModal();
  const u = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrlimit=12'
    + '&prop=imageinfo&iiprop=url&iiurlwidth=900&gsrsearch=' + encodeURIComponent(s.q + ' filemime:image/jpeg');
  try {
    const pages = Object.values((await (await fetch(u)).json()).query?.pages ?? {}).sort((a, b) => a.index - b.index);
    galGrid.innerHTML = pages.length ? '' : '<p>No photos found for this stop.</p>';
    for (const p of pages) {
      const a = document.createElement('a'); a.href = p.imageinfo[0].descriptionurl; a.target = '_blank'; a.rel = 'noopener';
      const img = new Image(); img.src = p.imageinfo[0].thumburl; img.loading = 'lazy';
      img.alt = p.title.replace(/^File:|\.\w+$/g, '');
      a.append(img); galGrid.append(a);
    }
  } catch { galGrid.innerHTML = '<p>Could not load photos. Check your connection.</p>'; }
}

// beats differ in height: story position s (0 hero, 1 first stop, fractions between) <-> page scroll
const beatTop = (el) => el.getBoundingClientRect().top + scrollY;
function yToS(y) {
  const bs = story.children, top = beatTop(bs[0]); if (y < top) return y / top;
  let k = 0; while (k < bs.length - 1 && beatTop(bs[k + 1]) <= y) k++;
  return 1 + k + (y - beatTop(bs[k])) / bs[k].offsetHeight;
}
function sToY(s) { const bs = story.children, k = clamp(Math.floor(s) - 1, 0, bs.length - 1); return beatTop(bs[k]) + (s - 1 - k) * bs[k].offsetHeight; }
function scrollToStage(i) { scrollToY(sToY(i) + 2); }

/* ---------------- renderer ---------------- */
const canvas = $('#gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
let pixelRatio = Math.min(devicePixelRatio, isMobile ? 1.25 : 1.6);
renderer.setPixelRatio(pixelRatio);
renderer.setSize(innerWidth, innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(isMobile ? 62 : 50, innerWidth / innerHeight, 5, 120000);   // far enough for the outer ring's corners

const U = {
  uSunDir: { value: new THREE.Vector3(0.5, 0.5, 0.2).normalize() },
  uSunCol: { value: new THREE.Color(1, 1, 1) },
  uSky: { value: new THREE.Color(0.5, 0.6, 0.8) },
  uGround: { value: new THREE.Color(0.2, 0.2, 0.2) },
  uFogCol: { value: new THREE.Color(0.7, 0.8, 0.9) },
  uZenith: { value: new THREE.Color(0.2, 0.4, 0.8) },
  uFogDen: { value: 0.00004 },
  uTime: { value: 0 },
  uNight: { value: 0 },
  uKm: { value: 0 },
  uSnow: { value: TREK.theme?.snow ?? 1 },   // 0 for a summer or monsoon trek: only permanent snow up high stays
  uSnowLine: { value: 0 },   // metres the snowline drops (weather)
  uAccent: { value: new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--buransh').trim() || '#e5586f') },   // the trek page sets --buransh
};

const COMMON = /* glsl */`
uniform vec3 uSunDir; uniform vec3 uSunCol; uniform vec3 uSky; uniform vec3 uGround;
uniform vec3 uFogCol; uniform float uFogDen; uniform float uNight;
vec3 toLin(vec3 c){ return pow(c, vec3(2.2)); }
vec3 toSrgb(vec3 c){ return pow(c, vec3(1.0/2.2)); }
vec3 shade(vec3 alb, vec3 n, float ao){
  float d = max(dot(n, uSunDir), 0.0);
  vec3 hemi = mix(uGround, uSky, n.y*0.5+0.5);
  return alb * (uSunCol * d + hemi * ao);
}
vec3 fogit(vec3 c, float dist, float wy){
  float f = 1.0 - exp(-pow(dist * uFogDen, 1.6));
  float hf = exp(-max(wy - 1800.0, 0.0) / 2600.0) * 0.18 * smoothstep(0.0, 4000.0, dist);
  return mix(c, uFogCol, clamp(f + hf, 0.0, 1.0));
}
vec3 tone(vec3 c){ c = c / (1.0 + c * 0.35); return toSrgb(c * 1.12); }
`;

/* ---------------- load assets ---------------- */
const loadbar = $('#loadbar'), loadtxt = $('#loadtxt');
let loaded = 0; const step = (t) => { loaded++; loadbar.style.width = (loaded / 5 * 100) + '%'; if (t) loadtxt.textContent = t; };
const texLoader = new THREE.TextureLoader();
const loadTex = (u) => new Promise((res, rej) => texLoader.load(u, res, undefined, rej));
const loadImg = (u) => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = u; });

const [geo, hImg, satTex, farImg, farTex] = await Promise.all([
  fetch('geo.json').then((r) => r.json()).then((g) => { step('Tracing the trail'); return g; }),
  loadImg('height.png').then((x) => { step('Raising the mountains'); return x; }),
  // phones get the half-resolution imagery (about a quarter of the bytes); older folders without it fall back
  (isMobile ? loadTex('sat_m.jpg').catch(() => loadTex('sat.jpg')) : loadTex('sat.jpg')).then((x) => { step('Laying the forest'); return x; }),
  loadImg('far.png').then((x) => { step('Finding the horizon'); return x; }),
  loadTex('far.jpg').then((x) => { step(); return x; }),
]);
satTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
satTex.colorSpace = farTex.colorSpace = THREE.NoColorSpace;

/* ---------------- heights ---------------- */
const [WM, HM] = geo.extent;
const N = hImg.width;
const hc = document.createElement('canvas'); hc.width = hc.height = N;
const hctx = hc.getContext('2d', { willReadFrequently: true }); hctx.drawImage(hImg, 0, 0);
const px = hctx.getImageData(0, 0, N, N).data;
const HT = new Float32Array(N * N);
for (let k = 0; k < N * N; k++) HT[k] = (px[k * 4] * 256 + px[k * 4 + 1]) / 10;
function heightAt(x, z) {
  const u = clamp((x / WM + 0.5) * (N - 1), 0, N - 1.001), v = clamp((z / HM + 0.5) * (N - 1), 0, N - 1.001);
  const j = Math.floor(u), i = Math.floor(v), fu = u - j, fv = v - i;
  const a = HT[i * N + j], b = HT[i * N + j + 1], c = HT[(i + 1) * N + j], d = HT[(i + 1) * N + j + 1];
  return lerp(lerp(a, b, fu), lerp(c, d, fu), fv);
}

/* ---------------- terrain ---------------- */
const SEG = isMobile ? 255 : N - 1;
const tg = new THREE.PlaneGeometry(WM, HM, SEG, SEG); tg.rotateX(-Math.PI / 2);
{
  const p = tg.attributes.position;
  for (let k = 0; k < p.count; k++) p.setY(k, heightAt(p.getX(k), p.getZ(k)));
  tg.computeVertexNormals();
}
const terrainMat = new THREE.ShaderMaterial({
  uniforms: { ...U, uSat: { value: satTex }, uFogScale: { value: 1 } },
  vertexShader: /* glsl */`
    varying vec2 vUv; varying vec3 vN; varying vec3 vW;
    void main(){ vUv = uv; vN = normal; vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
  fragmentShader: /* glsl */`
    ${COMMON}
    uniform sampler2D uSat; uniform float uSnow; uniform float uSnowLine; uniform float uFogScale;
    varying vec2 vUv; varying vec3 vN; varying vec3 vW;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<4;i++){ s+=a*noise(p); p*=2.03; a*=0.5; } return s; }
    void main(){
      vec3 n = normalize(vN);
      vec3 sat = toLin(texture2D(uSat, vUv).rgb);
      float lum = dot(sat, vec3(0.3,0.59,0.11));
      float forest = smoothstep(0.0, 0.03, sat.g - sat.r) * (1.0 - smoothstep(0.05, 0.14, lum));
      float nz = fbm(vW.xz * 0.004);
      float alt = vW.y + (nz - 0.5) * 260.0;
      float flatF = smoothstep(0.55, 0.85, n.y);
      float snowAlt = smoothstep(2350.0 - uSnowLine, 2950.0 - uSnowLine, alt);
      float snow = snowAlt * flatF * uSnow;
      snow *= mix(1.0, 0.45 + 0.35 * smoothstep(3200.0, 3500.0, alt), forest);
      float perm = (1.0 - uSnow) * 1200.0;   // without seasonal snow, only the permanent snow above ~4,500 m remains
      snow = max(snow, smoothstep(3350.0 + perm, 3600.0 + perm, alt) * smoothstep(0.25, 0.55, n.y));
      vec3 snowCol = vec3(0.86, 0.9, 0.96) * (0.92 + 0.08 * fbm(vW.xz * 0.05));
      vec3 alb = mix(sat * 1.15, snowCol, clamp(snow, 0.0, 1.0));
      vec3 c = shade(alb, n, 0.85);
      float dist = length(cameraPosition - vW);
      c = fogit(c, dist * uFogScale, vW.y);
      gl_FragColor = vec4(tone(c), 1.0);
    }`,
});
const terrain = new THREE.Mesh(tg, terrainMat); scene.add(terrain);

/* ---------------- surroundings: real terrain out to the horizon ---------------- */
const FAR_PEAKS = TREK.farPeaks;   // labels; bearings th from east toward south, distance r
{
  const [FW, FD] = geo.far, FN = farImg.width, R = 6371000;
  const c = document.createElement('canvas'); c.width = c.height = FN; const cx = c.getContext('2d', { willReadFrequently: true }); cx.drawImage(farImg, 0, 0);
  const fp = cx.getImageData(0, 0, FN, FN).data, FHT = new Float32Array(FN * FN);
  for (let k = 0; k < FN * FN; k++) FHT[k] = (fp[k * 4] * 256 + fp[k * 4 + 1]) / 5;   // fifths of a metre
  const farAt = (x, z) => FHT[Math.round(clamp((z / FD + 0.5) * (FN - 1), 0, FN - 1)) * FN + Math.round(clamp((x / FW + 0.5) * (FN - 1), 0, FN - 1))];
  const drop = (x, z) => (x * x + z * z) / (2 * R);   // the earth curving away
  const fg = new THREE.PlaneGeometry(FW, FD, 255, 255); fg.rotateX(-Math.PI / 2);
  const p = fg.attributes.position, cell = FW / 255;
  for (let k = 0; k < p.count; k++) {
    const x = p.getX(k), z = p.getZ(k), inside = Math.abs(x) < WM / 2 - cell && Math.abs(z) < HM / 2 - cell;
    p.setY(k, farAt(x, z) - drop(x, z) - (inside ? 400 : 0));   // under the detailed map, sink out of sight
  }
  fg.computeVertexNormals();
  const farMat = new THREE.ShaderMaterial({ uniforms: { ...U, uSat: { value: farTex }, uFogScale: { value: 0.3 } },   // thinner haze: the big peaks should read at 60 km
    vertexShader: terrainMat.vertexShader, fragmentShader: terrainMat.fragmentShader, polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 4 });
  scene.add(new THREE.Mesh(fg, farMat));
  FAR_PEAKS.forEach((pk) => {   // pin each label to the highest real point within 3 km of where it is listed
    let x = Math.cos(pk.th) * pk.r, z = Math.sin(pk.th) * pk.r, best = -1e9;
    if (pk.r < FW / 2) for (let dx = -3000; dx <= 3000; dx += 150) for (let dz = -3000; dz <= 3000; dz += 150) { const h = farAt(x + dx, z + dz); if (h > best) best = h, pk.x = x + dx, pk.z = z + dz; }
    if (best > 0) { x = pk.x; z = pk.z; }
    pk.pos = new THREE.Vector3(x, (best > 0 ? best : pk.h ?? pk.alt) - drop(x, z) + 250, z);   // beyond the ring (Everest from Sandakphu): h keeps its true angle
  });
}

/* ---------------- sky ---------------- */
const sky = new THREE.Mesh(new THREE.SphereGeometry(80000, 48, 24), new THREE.ShaderMaterial({
  uniforms: U, side: THREE.BackSide, depthWrite: false,
  vertexShader: `varying vec3 vD; void main(){ vD = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position = p.xyww; }`,
  fragmentShader: `${COMMON}
    uniform vec3 uZenith; uniform float uTime;
    varying vec3 vD;
    float hash3(vec3 p){ p = fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
    void main(){
      vec3 d = normalize(vD);
      float h = clamp(d.y, -0.2, 1.0);
      vec3 c = mix(uFogCol, uZenith, pow(smoothstep(-0.02, 0.6, h), 0.7));
      float sd = max(dot(d, uSunDir), 0.0);
      c += uSunCol * (pow(sd, 900.0) * 18.0 + pow(sd, 12.0) * 0.25) * (1.0 - uNight);
      // stars
      vec3 sp = floor(d * 420.0);
      float s = hash3(sp); float tw = 0.6 + 0.4*sin(uTime*2.0 + s*50.0);
      c += vec3(step(0.9965, s) * tw * smoothstep(0.0, 0.25, h)) * uNight * 1.2;
      // milky band
      float band = exp(-pow(dot(d, normalize(vec3(0.3,0.25,-0.9))), 2.0) * 18.0);
      c += vec3(0.08,0.09,0.12) * band * uNight * smoothstep(0.0,0.3,h);
      gl_FragColor = vec4(toSrgb(c), 1.0);
    }` }));
sky.frustumCulled = false; scene.add(sky);

/* ---------------- trees ---------------- */
{
  const cone1 = new THREE.ConeGeometry(5.2, 15, 6, 1); cone1.translate(0, 13, 0);
  const cone2 = new THREE.ConeGeometry(3.6, 11, 6, 1); cone2.translate(0, 21, 0);
  const trunk = new THREE.CylinderGeometry(0.7, 0.9, 7, 5, 1); trunk.translate(0, 3.5, 0);
  const merge = (gs) => { const out = new THREE.BufferGeometry(); const P = [], Nn = [], C = [];
    gs.forEach(([g, col]) => { const gi = g.toNonIndexed(); gi.computeVertexNormals(); const p = gi.attributes.position.array, n = gi.attributes.normal.array;
      for (let k = 0; k < p.length; k++) { P.push(p[k]); Nn.push(n[k]); } for (let k = 0; k < p.length / 3; k++) C.push(...col); });
    out.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); out.setAttribute('normal', new THREE.Float32BufferAttribute(Nn, 3)); out.setAttribute('color', new THREE.Float32BufferAttribute(C, 3)); return out; };
  const tgeo = merge([[trunk, [0.18, 0.12, 0.08]], [cone1, [0.07, 0.15, 0.1]], [cone2, [0.08, 0.17, 0.11]]]);
  const list = isMobile ? geo.trees.filter((_, i) => i % 3 === 0) : geo.trees;
  const tm = new THREE.ShaderMaterial({ uniforms: U,
    vertexShader: `attribute vec3 color; varying vec3 vC; varying vec3 vN; varying vec3 vW;
      void main(){ vC=color; vN = normalize(mat3(modelMatrix * instanceMatrix) * normal); vec4 w = modelMatrix * instanceMatrix * vec4(position,1.0); vW=w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `${COMMON} uniform float uSnow; uniform float uSnowLine; varying vec3 vC; varying vec3 vN; varying vec3 vW;
      void main(){ vec3 n=normalize(vN);
        float sn = smoothstep(0.15, 0.6, n.y) * smoothstep(2100.0 - uSnowLine, 2600.0 - uSnowLine, vW.y) * 0.8 * uSnow;
        vec3 alb = mix(vC, vec3(0.8,0.85,0.9), sn);
        vec3 c = shade(alb, n, 0.8);
        c = fogit(c, length(cameraPosition-vW), vW.y);
        gl_FragColor = vec4(tone(c),1.0); }` });
  const im = new THREE.InstancedMesh(tgeo, tm, list.length);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), e = new THREE.Euler();
  list.forEach(([x, z], i) => {
    const r = Math.sin(i * 91.7) * 0.5 + 0.5, sc = 0.75 + r * 0.7;
    p.set(x, heightAt(x, z) - 1.5, z); e.set(0, r * 6.28, 0); q.setFromEuler(e); s.set(sc, sc * (0.9 + r * 0.4), sc);
    m4.compose(p, q, s); im.setMatrixAt(i, m4);
  });
  im.frustumCulled = false; scene.add(im);
}

/* ---------------- stops: village, temple, camps, lake, summit shrine ---------------- */
const P = geo.pts;
const LAKES = {};   // lake meshes by stop name
{
  const propMat = new THREE.ShaderMaterial({ uniforms: U,
    vertexShader: `varying vec3 vC; varying vec3 vN; varying vec3 vW;
      void main(){ vC = instanceColor; vN = normalize(mat3(modelMatrix * instanceMatrix) * normal); vec4 w = modelMatrix * instanceMatrix * vec4(position,1.0); vW=w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `${COMMON} varying vec3 vC; varying vec3 vN; varying vec3 vW;
      void main(){ vec3 n = normalize(vN); vec3 c = shade(toLin(vC), n, 0.9);
        c += toLin(vC) * 0.35 * uNight * step(0.5, vC.r - vC.b);   // warm lamps and tents glow at night
        c = fogit(c, length(cameraPosition - vW), vW.y); gl_FragColor = vec4(tone(c),1.0); }` });
  const rnd = (() => { let s = 42; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const putAt = (geom, items, mat = propMat) => {   // explicit placements: [x, z, yAboveGround, rotY, scale, color]
    const m = new THREE.InstancedMesh(geom, mat, items.length), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), col = new THREE.Color(), up = new THREE.Vector3(0, 1, 0);
    items.forEach(([x, z, y, ry, s, c], i) => { q.setFromAxisAngle(up, ry); m4.compose(new THREE.Vector3(x, heightAt(x, z) + y, z), q, new THREE.Vector3(s, s, s)); m.setMatrixAt(i, m4); m.setColorAt(i, col.set(c)); });
    m.frustumCulled = false; scene.add(m);
  };
  const place = (geom, n, center, radius, scale, colors, yOff = 0) => putAt(geom, Array.from({ length: n }, () => {   // n at random within radius
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * radius;
    return [center[0] + Math.cos(a) * r, center[2] + Math.sin(a) * r, yOff, rnd() * Math.PI, scale * (0.85 + rnd() * 0.3), colors[Math.floor(rnd() * colors.length)]];
  }));
  // ---- stop props: each trek lists its own in trek.js; scaled up so they read from the camera's 330–760 m ----
  const box = (w, h, d) => { const g = new THREE.BoxGeometry(w, h, d); g.translate(0, h / 2, 0); return g; };
  const pyramid = (r, h) => { const g = new THREE.ConeGeometry(r, h, 4, 1); g.rotateY(Math.PI / 4); g.translate(0, h / 2, 0); return g; };
  const wall = new THREE.BoxGeometry(10, 6, 8); wall.translate(0, 2.5, 0);
  const roof = new THREE.ConeGeometry(8.2, 4.5, 4, 1); roof.rotateY(Math.PI / 4); roof.scale(1, 1, 0.85); roof.translate(0, 7.7, 0);
  const tent = new THREE.ConeGeometry(4.2, 4.6, 4, 1); tent.rotateY(Math.PI / 4); tent.translate(0, 2.0, 0);
  const tentCols = ['#f2a33a', '#e5586f', '#f4c542', '#e9772f', '#3a8fd9'];
  const dining = new THREE.CylinderGeometry(5, 5, 14, 3); dining.rotateZ(Math.PI / 2); dining.rotateX(-Math.PI / 2); dining.translate(0, 2.5, 0);
  const fire = new THREE.ConeGeometry(1.6, 3, 6); fire.translate(0, 1.5, 0);
  let campN = 0;
  const PROPS = {
    village({ at, houses: n, radius }) {   // wooden houses with slate roofs (one set of positions, shared by walls and roofs)
      let s0 = 42; const gen = () => (s0 = (s0 * 16807) % 2147483647) / 2147483647;
      const houses = Array.from({ length: n }, () => { const a = gen() * 6.283, r = Math.sqrt(gen()) * radius; return [P[at][0] + Math.cos(a) * r, P[at][2] + Math.sin(a) * r, -1, gen() * 3.14, 1, gen()]; });
      const tint = (cols) => houses.map((h) => [...h.slice(0, 5), cols[Math.floor(h[5] * cols.length)]]);
      putAt(wall, tint(['#8a5a3c', '#7a4e33', '#9b6a46', '#c9b8a0']));
      putAt(roof, tint(['#5d636b', '#6c7178', '#55595e', '#d9dde2']));
    },
    temple({ at, offset: [dx, dz] }) {   // a tiered Garhwali temple
      const [tx, tz] = [P[at][0] + dx, P[at][2] + dz];
      putAt(box(9, 8, 9), [[tx, tz, -1, 0.3, 1.3, '#d8cbb5']]);
      putAt(pyramid(9, 5), [[tx, tz, 9, 0.3, 1.3, '#4a3a2c'], [tx, tz, 13.5, 0.3, 0.95, '#4a3a2c'], [tx, tz, 17, 0.3, 0.6, '#c9a24a']]);
    },
    camp({ at, offset: [dx, dz] = [0, 0], tents, radius, dining: col }) {   // sleeping tents, a dining tent, a campfire that glows at night
      const x = P[at][0] + dx, z = P[at][2] + dz;
      place(tent, tents, [x, 0, z], radius, 1.4, tentCols, -0.5);
      putAt(dining, [[x + 18, z - 10, 0, campN++ * 1.1, 1.4, col]]);
      putAt(fire, [[x - 6, z + 12, 0, 0, 1.6, '#ff7a1a']]);
    },
    lake({ at, radius: lakeR, frozen = true }) {   // a frozen lake (clear ice in the middle can mirror the scene, see moments), or open water
      const jl = P[at];
      const lg = new THREE.CircleGeometry(lakeR, 48); lg.rotateX(-Math.PI / 2); lg.scale(1.35, 1, 0.8);
      const lake = new THREE.Mesh(lg, new THREE.ShaderMaterial({ uniforms: { ...U, uRefl: { value: null }, uTexMat: { value: new THREE.Matrix4() }, uReflAmt: { value: 0 } },
        vertexShader: `varying vec3 vW; varying vec2 vL; void main(){ vL = position.xz; vec4 w = modelMatrix*vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
        fragmentShader: `${COMMON} varying vec3 vW; varying vec2 vL; uniform sampler2D uRefl; uniform mat4 uTexMat; uniform float uReflAmt;
          float h(vec2 p){ return fract(sin(dot(p, vec2(41.3,289.1)))*43758.5); }
          void main(){ vec3 n = vec3(0.0,1.0,0.0);
            float r = length(vL / vec2(1.35, 0.8)) / ${lakeR.toFixed(1)};
            vec3 ice = ${frozen ? 'mix(toLin(vec3(0.62,0.78,0.86)), toLin(vec3(0.86,0.92,0.96)), smoothstep(0.55, 1.0, r) + h(floor(vL*0.6))*0.12)'
                                : 'mix(toLin(vec3(0.07,0.20,0.26)), toLin(vec3(0.22,0.40,0.42)), smoothstep(0.6, 1.0, r))'};
            vec3 c = shade(ice, n, 1.0);
            vec3 v = normalize(cameraPosition - vW); vec3 hv = normalize(v + uSunDir);
            c += uSunCol * pow(max(dot(n, hv), 0.0), 120.0) * 0.6;
            c = fogit(c, length(cameraPosition - vW), vW.y);
            vec3 outc = tone(c);
            if (uReflAmt > 0.0) {   // mirror: strongest at grazing angles and over the clear ice in the middle
              vec4 rp = uTexMat * vec4(vW, 1.0);
              float fres = 0.25 + 0.75 * pow(1.0 - max(dot(n, v), 0.0), 3.0);
              outc = mix(outc, texture2D(uRefl, rp.xy / rp.w).rgb, uReflAmt * fres * (1.0 - smoothstep(0.45, 0.95, r)));
            }
            gl_FragColor = vec4(outc, 1.0); }` }));
      lake.position.set(jl[0], 0, jl[2]); scene.add(lake); LAKES[at] = lake;
      lake.position.y = Math.max(...[0, 1, 2, 3, 4, 5].map((k) => heightAt(lake.position.x + Math.cos(k) * lakeR * 0.7, lake.position.z + Math.sin(k) * lakeR * 0.5)), heightAt(jl[0], jl[2])) + 0.8;
    },
    walkers({ from, to }) {   // a line of trekkers on the route, headlamps lit
      const walkers = []; for (let k = from; k < to; k += 0.1) { const r = geo.route.reduce((b, p) => Math.abs(p[3] - k) < Math.abs(b[3] - k) ? p : b); walkers.push([r[0], r[2]]); }
      putAt(new THREE.CylinderGeometry(0.7, 1, 3.4, 6).translate(0, 1.7, 0), walkers.map(([x, z], i) => [x, z, 0, 0, 1.6, tentCols[i % tentCols.length]]));
      putAt(new THREE.SphereGeometry(0.6, 8, 6), walkers.map(([x, z]) => [x, z, 5.8, 0, 2.6, '#ffe2a0']), new THREE.MeshBasicMaterial());   // unlit: reads as light in the dark
    },
    shrine({ at }) {   // a stone Shiva shrine, a trishul, and prayer flags strung from a pole
      const [sx, sz] = [P[at][0], P[at][2]];
      putAt(box(3, 2.4, 3), [[sx + 6, sz + 4, -0.3, 0.4, 2.4, '#9a958c']]);
      putAt(pyramid(2.4, 1.6), [[sx + 6, sz + 4, 5.4, 0.4, 2.4, '#7c776f']]);
      putAt(box(0.25, 7, 0.25), [[sx + 13, sz + 2, 0, 0, 2.2, '#c9c2b4']]);                                    // trishul shaft
      putAt(box(2.4, 0.25, 0.25), [[sx + 13, sz + 2, 14.5, 0, 2.2, '#c9c2b4']]);                                // trishul crossbar
      putAt(box(0.25, 2, 0.25), [-1, 0, 1].map((o) => [sx + 13 + o * 2.4, sz + 2, 14.5, 0, 2.2, '#c9c2b4']));     // three prongs
      PROPS.flags({ at });
    },
    flags({ at, offset: [dx, dz] = [0, 0] }) {   // prayer flags: five strings sagging from a central pole
      const [sx, sz] = [P[at][0] + dx, P[at][2] + dz];
      putAt(box(0.25, 7, 0.25), [[sx, sz, 0, 0, 2.2, '#c9c2b4']]);
      const FLAG = ['#2f6fd1', '#eef3f4', '#d63a3a', '#2f9a52', '#f2c230'], flags = [], top = heightAt(sx, sz) + 15;
      for (let s = 0; s < 5; s++) {
        const a = s / 5 * Math.PI * 2 + 0.3, ex = sx + Math.cos(a) * 42, ez = sz + Math.sin(a) * 42, ey = heightAt(ex, ez) + 1.5;
        for (let f = 1; f < 14; f++) { const t = f / 14, x = lerp(sx, ex, t), z = lerp(sz, ez, t), y = lerp(top, ey, t) - Math.sin(t * Math.PI) * 4;   // sagging line
          flags.push([x, z, y - heightAt(x, z), Math.PI / 2 - a, 1.8, FLAG[f % 5]]); }
      }
      putAt(new THREE.BoxGeometry(0.15, 1.4, 1.8).translate(0, -0.7, 0), flags);
    },
  };
  TREK.props.forEach((p) => PROPS[p.type](p));
}

/* ---------------- clouds ---------------- */
const clouds = new THREE.Mesh(new THREE.PlaneGeometry(90000, 90000, 1, 1).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({
  uniforms: U, transparent: true, depthWrite: false,
  vertexShader: `varying vec3 vW; void main(){ vec4 w=modelMatrix*vec4(position,1.0); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
  fragmentShader: `${COMMON} uniform float uTime; varying vec3 vW;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<5;i++){ s+=a*noise(p); p*=2.02; a*=0.5; } return s; }
    void main(){
      vec2 p = vW.xz * 0.00022 + vec2(uTime*0.004, uTime*0.0015);
      float d = smoothstep(0.52, 0.85, fbm(p));
      float dist = length(cameraPosition - vW);
      vec3 vd = normalize(cameraPosition - vW);
      float a = d * 0.7 * (1.0 - smoothstep(9000.0, 26000.0, dist)) * smoothstep(0.06, 0.3, abs(vd.y));
      vec3 c = mix(uSky * 0.9, uSunCol * 0.6 + uSky * 0.6, 0.6) + uFogCol*0.25;
      gl_FragColor = vec4(toSrgb(c), a);
    }` }));
clouds.position.y = 5600; scene.add(clouds);

/* ---------------- snowfall ---------------- */
const SNOWN = isMobile ? 1500 : 4000;
const snowGeo = new THREE.BufferGeometry(); {
  const a = new Float32Array(SNOWN * 3); for (let i = 0; i < SNOWN * 3; i++) a[i] = Math.random();
  snowGeo.setAttribute('position', new THREE.BufferAttribute(a, 3));
}
const snowMat = new THREE.ShaderMaterial({ uniforms: { ...U, uAmt: { value: 0 }, uBox: { value: 500 }, uCam: { value: new THREE.Vector3() } }, transparent: true, depthWrite: false,
  vertexShader: `uniform float uTime; uniform float uBox; uniform vec3 uCam; varying float vA;
    void main(){ vec3 p = position * uBox;
      p.y -= uTime * (28.0 + position.x*14.0); p.x += sin(uTime*0.7 + position.z*20.0)*8.0 + uTime*6.0;
      p = mod(p - uCam, uBox) - uBox*0.5 + uCam;
      vec4 mv = viewMatrix * vec4(p,1.0); gl_Position = projectionMatrix * mv;
      vA = smoothstep(uBox*0.5, 20.0, -mv.z);
      gl_PointSize = clamp(260.0 / -mv.z, 1.0, 6.0); }`,
  fragmentShader: `uniform float uAmt; varying float vA; void main(){ vec2 c = gl_PointCoord-0.5; float d = 1.0 - smoothstep(0.2,0.5,length(c)); gl_FragColor = vec4(vec3(0.95), d*vA*uAmt); }` });
const snowPts = new THREE.Points(snowGeo, snowMat); snowPts.frustumCulled = false; scene.add(snowPts);

/* ---------------- route sampling ---------------- */
const R = geo.route; // [x,y,z,km]
function routeAt(km) {
  km = clamp(km, 0, R[R.length - 1][3]);
  let lo = 0, hi = R.length - 1;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (R[m][3] <= km) lo = m; else hi = m; }
  const a = R[lo], b = R[hi], t = b[3] > a[3] ? (km - a[3]) / (b[3] - a[3]) : 0;
  return new THREE.Vector3(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t));
}
function routeDir(km) {
  const a = routeAt(km - 0.6), b = routeAt(km + 0.6); const d = b.sub(a); d.y = 0;
  return d.lengthSq() < 1 ? new THREE.Vector3(0, 0, 1) : d.normalize();
}
const elevAt = (km) => routeAt(km).y;

/* ---------------- trail: a draped ribbon with an exact km on every vertex ---------------- */
const TRAIL = [];   // [x, y, z, km] about every 10 m, sitting on the terrain
for (let i = 0; i < R.length - 1; i++) {
  const a = R[i], b = R[i + 1], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[2] - a[2]) / 10));
  for (let k = 0; k < n; k++) { const t = k / n, x = lerp(a[0], b[0], t), z = lerp(a[2], b[2], t); TRAIL.push([x, heightAt(x, z), z, lerp(a[3], b[3], t)]); }
}
{ const e = R[R.length - 1]; TRAIL.push([e[0], heightAt(e[0], e[2]), e[2], e[3]]); }
U.uHoverKm = { value: -99 };
{
  const n = TRAIL.length, pos = new Float32Array(n * 6), dir = new Float32Array(n * 4), side = new Float32Array(n * 2), km = new Float32Array(n * 2), idx = [];
  TRAIL.forEach(([x, y, z, k], i) => {
    const p = TRAIL[Math.max(0, i - 1)], q = TRAIL[Math.min(n - 1, i + 1)];
    let dx = q[0] - p[0], dz = q[2] - p[2]; const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
    for (let s = 0; s < 2; s++) { const v = i * 2 + s; pos.set([x, y, z], v * 3); dir.set([dx, dz], v * 2); side[v] = s ? 1 : -1; km[v] = k; }
    if (i < n - 1) idx.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aDir', new THREE.BufferAttribute(dir, 2));
  g.setAttribute('aSide', new THREE.BufferAttribute(side, 1)); g.setAttribute('aKm', new THREE.BufferAttribute(km, 1)); g.setIndex(idx);
  const m = new THREE.Mesh(g, new THREE.ShaderMaterial({ uniforms: U, transparent: true, depthWrite: false,
    vertexShader: /* glsl */`attribute vec2 aDir; attribute float aSide; attribute float aKm; varying float vSide; varying float vKm; varying vec3 vW;
      void main(){
        float d = distance(cameraPosition, position);
        vec3 p = position + normalize(vec3(-aDir.y, 0.0, aDir.x)) * aSide * clamp(d * ${isMobile ? '0.003' : '0.0016'}, ${isMobile ? '5.0' : '2.0'}, ${isMobile ? '54.0' : '36.0'});   // ~constant width on screen; wider on phones (lower pixel ratio, no antialias)
        p.y += ${isMobile ? '7.0' : '1.5'} + d * 0.0015;   // lift grows with distance so ridges don't swallow it; phones' coarser ground bulges over a trail at true height
        vSide = aSide; vKm = aKm; vW = p;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0); }`,
    fragmentShader: /* glsl */`${COMMON} uniform float uKm; uniform float uHoverKm; uniform float uTime; uniform vec3 uAccent;
      varying float vSide; varying float vKm; varying vec3 vW;
      void main(){
        float edge = 1.0 - smoothstep(0.45, 1.0, abs(vSide));
        float walked = step(vKm, uKm);
        float head = exp(-pow((vKm - uKm) / 0.08, 2.0));       // the walker, at the exact position
        float hover = exp(-pow((vKm - uHoverKm) / 0.2, 2.0));
        vec3 path = mix(vec3(0.1, 0.12, 0.15), vec3(0.78, 0.8, 0.84), 1.0 - smoothstep(0.0, 0.6, abs(vSide)));   // dark edge, pale core: reads on snow and forest
        vec3 c = mix(path, uAccent * mix(1.3, 1.0, uNight), walked);
        c += uAccent * head * (1.5 + 0.5 * sin(uTime * 5.0)) + vec3(0.9) * hover;
        c = fogit(c, length(cameraPosition - vW), vW.y);
        gl_FragColor = vec4(tone(c), edge * min(1.0, 0.65 + 0.35 * walked + head + hover)); }` }));
  m.renderOrder = 2; m.frustumCulled = false; scene.add(m);
}

/* ---------------- labels ---------------- */
const labelsEl = $('#labels');
const LABELS = [
  ...TREK.labels.map(([t, s, at]) => ({ t, s, p: new THREE.Vector3(...P[at]), cls: 'camp' })),
  ...FAR_PEAKS.map((f) => ({ t: f.name, s: fmt(f.alt) + ' m', p: f.pos, cls: 'far' })),
];
LABELS.forEach((l) => { const d = document.createElement('div'); d.className = 'tag ' + l.cls; d.innerHTML = `<div class="t">${l.t}<b>${l.s}</b></div><div class="stem"></div>`; labelsEl.appendChild(d); l.el = d; l.p.y += l.cls === 'far' ? 0 : 25; });
const tmpV = new THREE.Vector3();
function updateLabels(fade) {
  for (const l of LABELS) {
    tmpV.copy(l.p).project(camera);
    const dist = camera.position.distanceTo(l.p);
    const vis = tmpV.z < 1 && Math.abs(tmpV.x) < 1.1 && Math.abs(tmpV.y) < 1.1;
    let o = vis ? 1 : 0;
    if (l.cls !== 'far') o *= (1 - smooth(9000, 14000, dist)) * smooth(120, 260, dist); else o *= 0.95;   // fade far labels, and the one you're standing at
    o *= fade;
    l.el.style.opacity = o.toFixed(2);
    if (o > 0.01) l.el.style.transform = `translate(${((tmpV.x * 0.5 + 0.5) * innerWidth).toFixed(1)}px, ${((-tmpV.y * 0.5 + 0.5) * innerHeight).toFixed(1)}px) translate(-50%,-100%)`;
  }
}

/* ---------------- time of day ---------------- */
const C = (h) => new THREE.Color(h);
const PAL = {
  night: { zen: C('#050913'), hor: C('#152033'), sun: C('#8a9cc0'), sky: C('#1f2b40'), gnd: C('#080b10') },
  dawn: { zen: C('#27447a'), hor: C('#e8b996'), sun: C('#ffc896'), sky: C('#8193b8'), gnd: C('#3a322e') },
  day: { zen: C('#2c63ad'), hor: C('#b9d1e6'), sun: C('#fff3e0'), sky: C('#9ab8d8'), gnd: C('#3c3a33') },
};
for (const t in TREK.theme?.sky || {}) for (const k in TREK.theme.sky[t]) PAL[t][k] = C(TREK.theme.sky[t][k]);   // the trek's own sky mood
const tmpC = new THREE.Color();
function mix3(a, b, c, wa, wb, wc, key) { return tmpC.setRGB(0, 0, 0).add(a[key].clone().multiplyScalar(wa)).add(b[key].clone().multiplyScalar(wb)).add(c[key].clone().multiplyScalar(wc)).clone(); }
function setTime(hr) {
  const h = ((hr % 24) + 24) % 24;
  const a = (h - 6) / 12 * Math.PI;
  const el = Math.sin(a);
  const sunDir = new THREE.Vector3(Math.cos(a), Math.max(el, -0.3) * 1.05, Math.sin(a) * 0.55 + 0.25).normalize();
  const dayW = smooth(-0.02, 0.28, el), nightW = smooth(0.0, -0.14, el), dawnW = Math.max(0, 1 - dayW - nightW);
  const k = (key) => mix3(PAL.night, PAL.dawn, PAL.day, nightW, dawnW, dayW, key);
  const zen = k('zen'), hor = k('hor'), sun = k('sun'), skyc = k('sky'), gnd = k('gnd');
  const toL = (c) => new THREE.Color(Math.pow(c.r, 2.2), Math.pow(c.g, 2.2), Math.pow(c.b, 2.2));
  U.uZenith.value.copy(toL(zen)); U.uFogCol.value.copy(toL(hor));
  const sunI = lerp(0.0, 2.6, smooth(-0.05, 0.3, el)) + nightW * 0.75;
  U.uSunCol.value.copy(toL(sun)).multiplyScalar(sunI);
  U.uSky.value.copy(toL(skyc)).multiplyScalar(lerp(0.9, 1.0, nightW));
  U.uGround.value.copy(toL(gnd)).multiplyScalar(0.6);
  // at night, light comes from a high moon in the south-east
  const moon = new THREE.Vector3(0.4, 0.75, 0.5).normalize();
  U.uSunDir.value.copy(sunDir.lerp(moon, nightW).normalize());
  if (el < 0.02 && nightW < 1) U.uSunDir.value.y = Math.max(U.uSunDir.value.y, 0.05);
  U.uNight.value = nightW;
  U.uFogDen.value = lerp(0.000034, 0.000044, nightW);
  return { h, el, nightW };
}

/* ---------------- scroll → journey ---------------- */
let sTarget = 0, sCur = 0;
function readScroll() {
  // clamp and drop NaN (0/0 before layout, negative overscroll): a NaN here would stick in sCur for good
  sTarget = clamp(yToS(scrollY), 0, STAGES.length - 1 + 0.999) || 0;
}
addEventListener('scroll', readScroll, { passive: true });
readScroll(); sCur = sTarget;

const UP = new THREE.Vector3(0, 1, 0);
const camPos = new THREE.Vector3(), camTgt = new THREE.Vector3(), curPos = new THREE.Vector3(), curTgt = new THREE.Vector3();
const CAM_PULL = isMobile ? 1.6 : 1.8;
function shot(i) {
  const s = STAGES[i], c = s.cam, onRoute = routeAt(s.km), p = c.at ? new THREE.Vector3(...P[c.at]) : onRoute.clone();
  if (LAKES[c.at]) p.y = LAKES[c.at].position.y;   // an anchored shot frames a named point; its height counts from the ice
  const F = c.yaw != null ? new THREE.Vector3(Math.cos(c.yaw), 0, Math.sin(c.yaw)) : routeDir(s.km);
  const S = new THREE.Vector3(-F.z, 0, F.x);
  const k = c.dist < 1800 ? CAM_PULL : 1;   // trek stops sat 640 m behind and 280 m above the trail: too close to read the climb. The wide hero shots stay as drawn
  const pos = p.clone().addScaledVector(F, -c.dist * k).addScaledVector(S, c.side * k); pos.y = p.y + c.h * k;
  const tgt = p.clone().addScaledVector(F, c.look); tgt.y = p.y + c.lookUp;
  return { pos, tgt, p: onRoute, pivot: p };   // journey() rides along the route relative to p; look-around swings around pivot
}
const SHOTS = STAGES.map((_, i) => shot(i));
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const cam = { yaw: 0, pitch: 0, len: 1 };   // the rendered view direction (see the end of frame())
function journey(s) {
  const n = STAGES.length - 1;
  const i = Math.min(Math.floor(s), n), f = s - i;
  const j = Math.min(i + 1, n);
  const e = i === n ? 0 : smooth(0.42, 1.0, f);   // hold, then travel
  const A = STAGES[i], B = STAGES[j];
  const km = lerp(A.km, B.km, e);
  const ha = ((A.hr % 24) + 24) % 24, dh = ((((B.hr % 24) - ha) % 24) + 24) % 24;
  // a leg that spans a night (camp → next day's stop): let the night pass quickly, then walk in daylight
  const walk = clamp(Math.abs(B.km - A.km) * 0.9, 2, 8);   // ponytail: ~0.9 h per km; give stages a walk time if this reads wrong
  const te = dh > 12 ? (e < 0.2 ? (e / 0.2) * (dh - walk) / dh : (dh - walk + ((e - 0.2) / 0.8) * walk) / dh) : e;
  const hr = Math.floor(lerp(A.hr, B.hr, te) / 24) * 24 + ((ha + dh * te) % 24);
  // camera: blend the two composed shots, but ride along the route between them
  const a = SHOTS[i], b = SHOTS[j];
  const rp = routeAt(km);
  const base = a.p.clone().lerp(b.p, e);
  const off = rp.clone().sub(base);
  const pos = a.pos.clone().lerp(b.pos, e).add(off.clone().multiplyScalar(i === 0 ? 0 : 1));
  const tgt = a.tgt.clone().lerp(b.tgt, e).add(off.multiplyScalar(i === 0 ? 0 : 0.6));
  // mid-leg, hand over to a chase shot behind the walker, aimed just ahead on the trail, so every leg
  // (descents included) keeps the path in frame; at the stops (e = 0 or 1) the composed shots are untouched
  // slow hand-overs, paced on the scroll itself (not on e, whose own easing bunched the turn into a moment):
  // ease out of the last stop's shot, then over the final third of the beat ease into the next stop's shot
  const w = i === 0 ? 0 : smooth(0.42, 0.62, f) * (1 - smooth(0.68, 1, f));
  if (w > 0) {
    // ride on the trail just walked, not 520 m 'behind' along the trail's direction: that direction flips at every
    // out-and-back turnaround and swung the camera round the walker; a point on the path moves continuously
    const chase = routeAt(km - 0.52); chase.y = Math.max(chase.y, rp.y) + 240;
    const ahead = routeAt(km + 0.3); ahead.y += 10;
    pos.lerp(chase, w);
    // blend where the camera looks, not the target points: a far horizon target would otherwise dominate the turn
    // and turn between them in yaw (the short way round) with pitch eased apart: a plain lerp of two near-opposite
    // directions collapses through zero, and a 3D slerp picks a noisy axis; both spin the view
    const d0 = tgt.clone().sub(pos), d1 = ahead.clone().sub(pos), len = lerp(d0.length(), d1.length(), w);
    const y0 = Math.atan2(d0.z, d0.x), yaw = y0 + wrap(Math.atan2(d1.z, d1.x) - y0) * w;
    const pitch = lerp(Math.asin(d0.y / d0.length()), Math.asin(d1.y / d1.length()), w);
    tgt.copy(pos).add(new THREE.Vector3(Math.cos(pitch) * Math.cos(yaw), Math.sin(pitch), Math.cos(pitch) * Math.sin(yaw)).multiplyScalar(len));
  }
  const ground = heightAt(pos.x, pos.z);
  const low = lerp(+(A.cam.h < 90), +(B.cam.h < 90), e);   // 1 at an ice-level stop, 0 for normal shots
  // never aim inside a slope, at the stops too: the sight-line check below would lift the camera hundreds of metres,
  // then drop it the moment the walk starts
  if (low < 0.5) tgt.y = Math.max(tgt.y, heightAt(tgt.x, tgt.z) + 20);
  pos.y = Math.max(pos.y, ground + lerp(90, 2, low));
  // keep the line of sight above ridges between camera and target
  for (let t = 0.1; t < 0.71; t += 0.05) {   // dense samples (sparse ones let a ridge slip between them); stop at 0.7, where the lift is x3.3, or it lurches
    const q = pos.clone().lerp(tgt, t); const g = heightAt(q.x, q.z) + 40;
    if (q.y < g) pos.y += (1 - low) * (g - q.y) / (1 - t);
  }
  // keep the walker (the destination, at a stop) in frame: when the camera ends up high above it (a pass or shore
  // backed by higher ground), tilt the view down until the walker sits no lower than 18° below centre
  const view = tgt.clone().sub(pos), flat = Math.hypot(view.x, view.z), toW = rp.clone().sub(pos);
  const floor = Math.atan2(toW.y, Math.hypot(toW.x, toW.z)) + 0.31;
  if (Math.atan2(view.y, flat) > floor) tgt.y = pos.y + Math.tan(floor) * flat;
  const active = clamp(Math.floor(s + 0.3), 0, n);
  return { km, hr, pos, tgt, active, alt: elevAt(km) };
}

/* ---------------- trail interaction: hover for km and altitude, click to walk there ---------------- */
function kmToS(km) {   // invert journey(): the story position that puts the walker at this km
  const n = STAGES.length - 1; let i = 1;
  while (i < n && STAGES[i + 1].km <= km) i++;
  if (i === n) return n;
  const e = clamp((km - STAGES[i].km) / (STAGES[i + 1].km - STAGES[i].km), 0, 1);
  const lo = 0.5 - Math.sin(Math.asin(1 - 2 * e) / 3);   // inverse of smoothstep t*t*(3-2t)
  return i + (e > 0 ? 0.42 + 0.58 * lo : 0);
}
{ const k0 = STAGES[1].km, k1 = STAGES[STAGES.length - 1].km;   // self-check across this trek's own stages
  [0.05, 0.3, 0.5, 0.7, 0.95].map((f) => k0 + (k1 - k0) * f).forEach((k) => console.assert(Math.abs(journey(kmToS(k)).km - k) < 0.02, 'kmToS round-trip failed at km', k)); }
const tip = document.createElement('div'); tip.className = 'tag'; tip.style.opacity = 0; labelsEl.appendChild(tip);
const NOPICK = '.card,.hud,.topbar,.rail,.epilogue,.hero-inner,dialog';
let ptr = null, hoverKm = -99, tipKm = '';
addEventListener('pointermove', (e) => { ptr = e.pointerType === 'mouse' && !e.target.closest(NOPICK) ? e : null; }, { passive: true });
document.documentElement.addEventListener('mouseleave', () => { ptr = null; });
/* ---------------- look around: at a stop, drag to swing the view 360° around it ---------------- */
const look = { yaw: 0, pitch: 0, wantYaw: 0, wantPitch: 0, drag: null, moved: 0, tried: false };
addEventListener('pointerdown', (e) => { if (!e.target.closest(NOPICK + ',a,button,select,input') && e.button === 0) look.drag = { x: e.clientX, y: e.clientY, mouse: e.pointerType === 'mouse' }, look.moved = 0; });
addEventListener('pointermove', (e) => {
  if (!look.drag || !look.atStop) return;
  const dx = e.clientX - look.drag.x, dy = e.clientY - look.drag.y; look.drag.x = e.clientX; look.drag.y = e.clientY;
  look.moved += Math.abs(dx) + Math.abs(dy); look.wantYaw -= dx * 0.006; look.tried = true; if (auto) setAuto(false);
  if (look.drag.mouse) look.wantPitch = clamp(look.wantPitch + dy * 0.003, -0.35, 0.35);   // on touch, vertical swipes keep scrolling the story
}, { passive: true });
addEventListener('pointerup', () => { look.drag = null; }); addEventListener('pointercancel', () => { look.drag = null; });
function lookAround(J, dt) {   // swings J's camera around the stop it is holding at; eases back as the story moves on
  const i = Math.floor(sCur); look.atStop = i >= 1 && sCur - i < 0.4;
  if (!look.atStop) look.wantYaw = look.wantPitch = 0;
  const k = 1 - Math.exp(-dt * 5); look.yaw += (look.wantYaw - look.yaw) * k; look.pitch += (look.wantPitch - look.pitch) * k;
  if (Math.abs(look.yaw) + Math.abs(look.pitch) < 1e-4) return;
  const pv = SHOTS[clamp(i, 1, STAGES.length - 1)].pivot;
  J.pos.sub(pv).applyAxisAngle(UP, look.yaw).add(pv); J.tgt.sub(pv).applyAxisAngle(UP, look.yaw).add(pv);
  J.tgt.y -= look.pitch * J.pos.distanceTo(J.tgt);
  J.pos.y = Math.max(J.pos.y, heightAt(J.pos.x, J.pos.z) + Math.min(40, STAGES[clamp(i, 1, STAGES.length - 1)].cam.h));   // never swing into a hillside
}
const lookHint = document.createElement('div'); lookHint.className = 'lookhint'; lookHint.textContent = '↔ Drag to look around'; document.body.appendChild(lookHint);
addEventListener('click', (e) => {
  if (look.moved > 6) { look.moved = 0; return; }   // that was a drag, not a click
  if (hoverKm < 0 || e.target.closest(NOPICK + ',a,button,select')) return;
  setAuto(false); scrollToY(sToY(kmToS(hoverKm)) + 2);
});
function pickTrail(ui) {   // nearest trail point to the mouse, on screen, within 26 px
  hoverKm = -99;
  if (ptr && ui > 0.5) {
    let best = 26 * 26;
    for (let i = 0; i < TRAIL.length; i += 3) {
      const p = TRAIL[i]; tmpV.set(p[0], p[1], p[2]).project(camera); if (tmpV.z > 1) continue;
      const x = (tmpV.x * 0.5 + 0.5) * innerWidth, y = (-tmpV.y * 0.5 + 0.5) * innerHeight, d = (x - ptr.clientX) ** 2 + (y - ptr.clientY) ** 2;
      if (d < best) { best = d; hoverKm = p[3]; tip.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%,-100%)`; }
    }
  }
  U.uHoverKm.value = hoverKm; tip.style.opacity = hoverKm < 0 ? 0 : 1; document.body.style.cursor = hoverKm < 0 ? '' : 'pointer';
  const k = hoverKm.toFixed(1);
  if (hoverKm >= 0 && k !== tipKm) { tipKm = k; tip.innerHTML = `<div class="t">${k} km<b>${fmt(elevAt(hoverKm))} m</b></div><div class="stem"></div>`; }
}

/* ---------------- offline map and "you are here" (treks with offline: true in trek.js) ---------------- */
// Download stores every file this page loaded (page, three.js, fonts, terrain, imagery, route) in a per-trek cache;
// /sw.js answers from it first, so the 3D map opens with no signal. GPS works offline too: it needs satellites, not data.
// To test away from the trek, add ?gps=<lat>,<lon> to the page address. In the iPhone app (window.TREQZ_APP) the map is
// bundled, so there is no download button, and positions come from Core Location as 'trekpeek:position' events.
const APP = !!window.TREQZ_APP;
let updateMe = () => {};
if ((TREK.offline || APP) && geo.center) {   // the app carries every map, so every trek gets Locate me there
  const ICON = {
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v10m0 0-4-4m4 4 4-4M5 19h14"/></svg>',
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
    me: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>',
  };
  const CACHE = 'trek-' + TREK.id, PAGE = location.href.split(/[?#]/)[0];
  const offBtn = document.createElement('button'); offBtn.type = 'button'; offBtn.className = 'btn big offline';
  if (!APP && 'caches' in window) $('.hero .row')?.append(offBtn);
  const mb = (b) => (b / 1e6).toFixed(1) + ' MB';
  const idle = () => { offBtn.dataset.state = ''; offBtn.innerHTML = `${ICON.dl}<span>Download offline map</span>`; };
  const saved = (b) => { offBtn.dataset.state = 'saved'; offBtn.innerHTML = `${ICON.ok}<span>Saved offline${b ? ' · ' + mb(b) : ''}</span>`; };
  idle();
  if (offBtn.isConnected) caches.open(CACHE).then((c) => c.match(PAGE)).then((hit) => hit && saved()).catch(() => {});
  if (offBtn.isConnected && navigator.serviceWorker && !navigator.serviceWorker.controller) caches.has(CACHE).then((y) => y && navigator.serviceWorker.register(new URL('../sw.js', location.href)));
  offBtn.addEventListener('click', async () => {
    if (offBtn.disabled) return;
    offBtn.disabled = true; offBtn.dataset.state = 'busy';
    try {
      await navigator.serviceWorker?.register(new URL('../sw.js', location.href));
      navigator.storage?.persist?.();   // ask the browser not to clear it when space runs low
      const urls = [...new Set([PAGE, ...performance.getEntriesByType('resource').map((r) => r.name.split('#')[0])])]
        .filter((u) => /^https?:/.test(u) && !/cloudflareinsights|wikimedia\.org|googletagmanager|google-analytics/.test(u));
      const cache = await caches.open(CACHE); let n = 0, bytes = 0;
      offBtn.innerHTML = `<i class="fill"></i><span>Saving 0%</span>`;
      const fill = offBtn.querySelector('.fill'), txt = offBtn.querySelector('span');
      await Promise.all(urls.map(async (u) => {
        try {
          const r = await fetch(u, { mode: new URL(u).origin === location.origin ? 'same-origin' : 'cors', credentials: 'omit' });
          if (r.ok) { const size = (await r.clone().blob()).size; bytes += size; await cache.put(u, r); }   // read size first: `bytes += await` races
        } catch {}   // one file failing (say, a photo host) doesn't stop the map
        const p = Math.round(++n / urls.length * 100); fill.style.width = p + '%'; txt.textContent = `Saving ${p}%`;
      }));
      saved(bytes);
    } catch { idle(); offBtn.querySelector('span').textContent = 'Could not save. Try again'; }
    offBtn.disabled = false;
  });

  // you are here: a yellow dot with an accuracy ring on the terrain, and a line saying where you are on the route
  const meBtn = document.createElement('button'); meBtn.type = 'button'; meBtn.className = 'btn'; meBtn.id = 'meBtn';
  meBtn.innerHTML = `${ICON.me}<span class="txt">Locate me</span>`; $('.topbar').prepend(meBtn);
  const meEl = document.createElement('div'); meEl.className = 'me'; meEl.hidden = true; meEl.setAttribute('aria-live', 'polite'); document.body.append(meEl);
  const say = (html) => { meEl.innerHTML = html; meEl.hidden = false; };
  const [lat0, lon0] = geo.center, mLon = 111320 * Math.cos(lat0 * Math.PI / 180);
  const dot = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), new THREE.MeshBasicMaterial({ color: 0xffe873 }));
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.82, 1, 64).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xffe873, transparent: true, opacity: 0.45, depthWrite: false }));
  dot.visible = ring.visible = false; dot.renderOrder = ring.renderOrder = 4; scene.add(dot, ring);
  let me = null, follow = false, watch = null, lastFix = null;
  function place({ latitude: la, longitude: lo, accuracy = 10, altitude = null }) {
    const x = (lo - lon0) * mLon, z = (lat0 - la) * 111320;
    if (Math.abs(x) > WM / 2 || Math.abs(z) > HM / 2) {
      dot.visible = ring.visible = false; me = null;
      return say(`You're ${fmt(Math.hypot(x, z) / 1000)} km from this trek. Your dot appears on the map once you're on it.`);
    }
    let best = Infinity, km = 0;
    for (let i = 0; i < TRAIL.length; i += 2) { const p = TRAIL[i], d = (p[0] - x) ** 2 + (p[2] - z) ** 2; if (d < best) { best = d; km = p[3]; } }
    const y = heightAt(x, z), off = Math.sqrt(best);
    me = { x, y, z, km, acc: clamp(accuracy, 5, 500) };
    dot.position.set(x, y + 3, z); ring.position.set(x, y + 1.5, z); dot.visible = ring.visible = true;
    const status = TREK.routeStatus || 'approximate', next = status !== 'approximate' && STAGES.find((s, i) => i > 0 && s.km > km + 0.05);
    say(`<b>You</b> ${off < 60 ? `are on the route at km ${km.toFixed(1)}` : `are ${fmt(off)} m from the route (nearest: km ${km.toFixed(1)})`} · ${fmt(altitude ?? y)} m`
      + (next ? ` · next: ${next.name}, ${status === 'mapped' ? 'about ' : ''}${(next.km - km).toFixed(1)} km` : '')
      + ({ verified: '', mapped: '<small>Route from OpenStreetMap, not yet checked on foot. Distances are estimates.</small>' }[status] ?? '<small>This route is approximate. Carry a map and follow your guide.</small>'));
    if (follow) { follow = false; setAuto(false); scrollToY(sToY(kmToS(km)) + 2); }   // glide the story to where you are
  }
  const q = new URLSearchParams(location.search).get('gps')?.split(',').map(Number);
  const fake = q?.length === 2 && q.every(Number.isFinite) ? { latitude: q[0], longitude: q[1], accuracy: 12 } : null;
  meBtn.addEventListener('click', () => {
    follow = true; meBtn.setAttribute('aria-pressed', 'true');
    if (fake) return place(fake);
    if (watch !== null) return lastFix ? place(lastFix) : say('Still looking for satellites. Open sky helps.');
    if (APP) { watch = 'app'; say('Finding you. This works with no signal; give it a minute under open sky.'); return window.webkit?.messageHandlers?.gps?.postMessage('start'); }
    if (!navigator.geolocation) return say('This browser can\'t read the phone\'s location.');
    say('Finding you. This works with no signal; give it a minute under open sky.');
    watch = navigator.geolocation.watchPosition((p) => { const c = { latitude: p.coords.latitude, longitude: p.coords.longitude, accuracy: p.coords.accuracy, altitude: p.coords.altitude }; lastFix = c; place(c); },
      (e) => say(e.code === 1 ? 'Location is blocked. Allow it for this site in the browser settings to see yourself on the map.' : 'No GPS fix yet. Step into the open and tap Locate me again.'),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 30000 });
  });
  addEventListener('trekpeek:position', (e) => { lastFix = e.detail; place(e.detail); });   // from the iPhone app
  addEventListener('trekpeek:gps-error', (e) => say(e.detail));
  updateMe = (t) => {   // keep the dot a readable size from any distance; the ring breathes and shows GPS accuracy
    if (!dot.visible) return;
    const s = clamp(camera.position.distanceTo(dot.position) * 0.006, 2.5, 60);
    dot.scale.setScalar(s); ring.scale.setScalar(Math.max(me.acc, s * 2.2) * (1 + 0.12 * Math.sin(t * 3)));
    ring.material.opacity = 0.32 + 0.14 * Math.sin(t * 3);
  };
}

/* ---------------- HUD ---------------- */
const hud = { alt: $('#hAlt'), o2: $('#hO2'), t: $('#hT'), km: $('#hKm'), tod: $('#hTod'), todK: $('#hTodK'), day: $('#hDay') };
function todName(h) { return h < 5 ? 'Night' : h < 8 ? 'Dawn' : h < 12 ? 'Morning' : h < 16.5 ? 'Afternoon' : h < 19 ? 'Evening' : 'Night'; }
let lastHud = '';
function updateHud(J) {
  const alt = J.alt, h = ((J.hr % 24) + 24) % 24;
  const o2 = Math.pow(1 - 2.25577e-5 * alt, 5.25588) * 100;
  const d = Math.sin((h - 9) / 12 * Math.PI);
  const temp = TREK.climate.temp - 0.0065 * (alt - TREK.climate.alt) + 6 * d;
  const hh = Math.floor(h), mm = Math.floor((h - hh) * 60);
  const key = [Math.round(alt), Math.round(o2), Math.round(temp), J.km.toFixed(1), hh, mm].join();
  if (key === lastHud) return; lastHud = key;
  hud.alt.textContent = fmt(alt);
  hud.o2.innerHTML = Math.round(o2) + '<small>%</small>';
  hud.t.textContent = (temp < 0 ? '−' : '') + Math.abs(Math.round(temp));
  hud.km.textContent = J.km.toFixed(1);
  hud.tod.textContent = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
  hud.todK.textContent = todName(h);
  hud.day.textContent = 'Day ' + (Math.floor(J.hr / 24) + 1);
}

/* ---------------- autoplay ---------------- */
let auto = false; const playBtns = [$('#playBtn'), $('#playBtn2')];
function setAuto(on) {
  auto = on; playBtns.forEach((b) => b.setAttribute('aria-pressed', on));
  $('#playBtn2').innerHTML = on ? '❚❚ <span class="txt">Pause</span>' : '▶ <span class="txt">Auto-climb</span>';
  $('#skipBtn').hidden = !on;
  if (on) startAudio();
}
// jump, don't glide: a smooth scroll would fly the camera through the whole trek
document.querySelectorAll('.infoBtn').forEach((b) => b.addEventListener('click', () => {
  setAuto(false);
  lenis ? lenis.scrollTo('#s-numbers', { immediate: true }) : $('#s-numbers').scrollIntoView();
}));
playBtns.forEach((b) => b.addEventListener('click', () => { if (!auto && b.id === 'playBtn' && scrollY < 10) window.scrollTo(0, 1); setAuto(!auto); }));
['wheel', 'touchstart', 'keydown'].forEach((ev) => addEventListener(ev, (e) => { if (auto && !(e.target.closest && e.target.closest('.topbar,.hero .row'))) setAuto(false); }, { passive: true }));
let autoAcc = 0;
function autoStep(dt) {
  if (!auto) return;
  const top = beatTop(story.children[0]), end = sToY(STAGES.length - 1 + 0.6);
  if (scrollY >= end) { setAuto(false); return; }
  // walk at a steady pace (a taller beat takes longer), but linger the same time while a card is up
  const base = innerHeight * 1.9, beat = story.children[clamp(Math.floor(sTarget) - 1, 0, story.children.length - 1)].offsetHeight;
  const f = sTarget % 1; const slow = f < 0.45 ? 0.55 * beat / base : 1.0;
  autoAcc += (scrollY < top ? top / 6 : base / 14 * slow) * dt;
  const stepPx = Math.floor(autoAcc); if (stepPx > 0) { autoAcc -= stepPx; window.scrollBy(0, stepPx); }
}

/* ---------------- weather: what falls, how far you see, where the snowline sits ---------------- */
const WEATHER = {   // snow = falling flakes, fog = density multiplier, line = metres the snowline drops, wind = extra gusts
  clear: { snow: 0, fog: 0.8, line: -150, wind: 0 },
  light: { snow: 1, fog: 1, line: 0, wind: 0 },
  heavy: { snow: 2.2, fog: 1.8, line: 450, wind: 0.04 },
  fog: { snow: 0.1, fog: 4, line: 100, wind: 0 },
  blizzard: { snow: 3.4, fog: 3, line: 700, wind: 0.14 },
};
if (TREK.theme?.snow === 0) { WEATHER.fog.snow = 0; ['light', 'heavy', 'blizzard'].forEach((v) => $(`#weather option[value=${v}]`).remove()); }   // green treks: mist, no snow
let Wt = WEATHER[TREK.theme?.weather || 'light']; const Wc = { ...Wt }; $('#weather').value = TREK.theme?.weather || 'light';   // target and current (eased each frame, so the terrain changes visibly)
$('#weather').addEventListener('change', (e) => { Wt = WEATHER[e.target.value]; });
function stepWeather(dt) { const k = 1 - Math.exp(-dt * 0.8); for (const key in Wc) Wc[key] += (Wt[key] - Wc[key]) * k; }

/* ---------------- sound: a soundscape per place ---------------- */
// villages: birds (and temple bells if the trek has them) · lakes: lapping water, or singing ice when frozen · higher up: wind
let ac = null, windGain = null, windFilter = null, soundOn = false;
let verb = null, waterGain = null, waterFilter = null, flagGain = null, nextBird = 0, nextBell = 0, nextIce = 0, nextCricket = 0, padGain = null, padFilter = null;
// every trek gets its own voice: a key from its name, a register from its summit (warm and low in the Ghats, thin and airy above 4,000 m)
const SEED = [...TREK.id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7), TOP = TREK.sound.wind[1];
const HIGH = smooth(1500, 5000, TOP);                                                  // 0 = low hill, 1 = high pass
const PAD_HZ = [98, 110, 123.5, 146.8, 164.8][SEED % 5] * (1 + HIGH);                 // pentatonic root, an octave up for the high treks
const BIRD_HZ = 2000 + (SEED % 7) * 230 + 600 * (1 - HIGH);                           // each trek's birds sing in their own range
function startAudio() {
  if (ac) return;
  try {
    ac = new (window.AudioContext || window.webkitAudioContext)();
    const len = ac.sampleRate * 3, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
    let last = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
    const src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
    windFilter = ac.createBiquadFilter(); windFilter.type = 'bandpass'; windFilter.frequency.value = 420; windFilter.Q.value = 0.8;
    windGain = ac.createGain(); windGain.gain.value = 0;
    src.connect(windFilter).connect(windGain).connect(ac.destination); src.start();
    // a soft room reverb for birds and the bell
    const ir = ac.createBuffer(2, ac.sampleRate * 3, ac.sampleRate);
    for (let c = 0; c < 2; c++) { const r = ir.getChannelData(c); for (let i = 0; i < r.length; i++) r[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / r.length, 4); }
    verb = ac.createConvolver(); verb.buffer = ir; const wet = ac.createGain(); wet.gain.value = 0.4; verb.connect(wet).connect(ac.destination);
    // water: the same noise, slower and darker
    const ws = ac.createBufferSource(); ws.buffer = buf; ws.loop = true; ws.playbackRate.value = 0.7;
    waterFilter = ac.createBiquadFilter(); waterFilter.type = 'lowpass'; waterFilter.frequency.value = 500;
    waterGain = ac.createGain(); waterGain.gain.value = 0;
    // prayer flags: the same noise, bright and fluttering
    const fs = ac.createBufferSource(); fs.buffer = buf; fs.loop = true; fs.playbackRate.value = 1.6;
    const ff = ac.createBiquadFilter(); ff.type = 'bandpass'; ff.frequency.value = 1500; ff.Q.value = 1.2;
    flagGain = ac.createGain(); flagGain.gain.value = 0; fs.connect(ff).connect(flagGain).connect(ac.destination); fs.start();
    ws.connect(waterFilter).connect(waterGain).connect(ac.destination); ws.start();
    // a quiet, breathing drone in the trek's key: root, fifth and octave, softened and sent through the reverb
    padFilter = ac.createBiquadFilter(); padFilter.type = 'lowpass'; padFilter.frequency.value = 600;
    padGain = ac.createGain(); padGain.gain.value = 0; padFilter.connect(padGain); padGain.connect(ac.destination); padGain.connect(verb);
    [[1, 0.5, -3], [1.5, 0.28, 4], [2, 0.18, -6]].forEach(([r, a, cents]) => { const o = ac.createOscillator(), g = ac.createGain();
      o.frequency.value = PAD_HZ * r; o.detune.value = cents; g.gain.value = a; o.connect(g).connect(padFilter); o.start(); });
    soundOn = true; $('#soundBtn').setAttribute('aria-pressed', 'true');
  } catch (e) { ac = null; }
}
function chirp(at, vol) {   // one songbird phrase: 2–4 quick upward sweeps, placed left or right
  const o = ac.createOscillator(), g = ac.createGain(), p = ac.createStereoPanner();
  const f = BIRD_HZ + Math.random() * 1400, n = 2 + Math.floor(Math.random() * 3);
  p.pan.value = Math.random() * 1.6 - 0.8; g.gain.value = 0;
  for (let k = 0; k < n; k++) { const s = at + k * 0.11;
    o.frequency.setValueAtTime(f, s); o.frequency.exponentialRampToValueAtTime(f * 1.35, s + 0.07);
    g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(vol, s + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.08); }
  o.connect(g).connect(p); p.connect(ac.destination); p.connect(verb);
  o.start(at); o.stop(at + n * 0.11 + 0.1);
}
function cricket(at, vol) {   // warm low-altitude nights: a short pulsed trill
  const o = ac.createOscillator(), g = ac.createGain(), p = ac.createStereoPanner(); o.frequency.value = 4200 + (SEED % 5) * 160;
  p.pan.value = Math.random() * 1.4 - 0.7; g.gain.value = 0;
  for (let k = 0; k < 4; k++) { const s = at + k * 0.06; g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(vol, s + 0.01); g.gain.linearRampToValueAtTime(0, s + 0.04); }
  o.connect(g).connect(p).connect(ac.destination); o.start(at); o.stop(at + 0.3);
}
function bell(at, vol) {   // distant temple bell: inharmonic partials with a long decay
  [[220, 1], [528, 0.5], [880, 0.3], [1188, 0.18]].forEach(([f, a]) => {
    const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = f;
    g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(vol * a, at + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, at + 4);
    o.connect(g); g.connect(verb); g.connect(ac.destination); o.start(at); o.stop(at + 4.1);
  });
}
function sing(at, vol) {   // frozen lake 'singing': the falling 'pew' of ice flexing under its own tension
  const o = ac.createOscillator(), g = ac.createGain(), f = 700 + Math.random() * 900;
  o.frequency.setValueAtTime(f, at); o.frequency.exponentialRampToValueAtTime(f * 0.12, at + 0.7 + Math.random() * 0.5);
  g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(vol, at + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, at + 1.2);
  o.connect(g); g.connect(verb); g.connect(ac.destination); o.start(at); o.stop(at + 1.3);
}
document.addEventListener('visibilitychange', () => { if (ac) document.hidden ? ac.suspend() : soundOn && ac.resume(); });
$('#soundBtn').addEventListener('click', () => {
  if (!ac) { startAudio(); return; }
  soundOn = !soundOn; $('#soundBtn').setAttribute('aria-pressed', String(soundOn));
  if (ac.state === 'suspended') ac.resume();
});
function updateAudio(J, t) {
  if (!ac) return;
  const now = ac.currentTime, on = soundOn ? 1 : 0, h = J.hr % 24;
  const day = smooth(5.5, 7, h) * (1 - smooth(18.3, 19.3, h));
  const S = TREK.sound;
  const village = Math.max(0, ...S.villages.map(([k, a, b]) => 1 - smooth(a, b, Math.abs(J.km - k))));
  const forest = 1 - smooth(2700, 3150, J.alt);                                      // birds thin out at the treeline
  const lake = Math.max(0, ...S.lakes.map(([k, w]) => Math.exp(-(((J.km - k) / w) ** 2))));
  const flags = Math.max(0, ...(S.flags || []).map(([k, w]) => Math.exp(-(((J.km - k) / w) ** 2))));   // near prayer flags
  flagGain.gain.setTargetAtTime(on * 0.05 * flags * (0.45 + 0.55 * Math.abs(Math.sin(t * 11))) * (0.6 + 0.6 * (0.5 + 0.5 * Math.sin(t * 0.37) * Math.sin(t * 0.11 + 1.3))), now, 0.02);
  const thin = clamp((J.alt - 1000) / 4000, 0.06, 1);                                 // real altitude: a breeze on a 1,600 m hill, a roar at 5,000 m
  const windy = smooth(...S.wind, J.alt) * thin;                                     // gentle low down, strongest at the top of the high treks
  const gust = 0.5 + 0.5 * Math.sin(t * 0.37) * Math.sin(t * 0.11 + 1.3);
  windGain.gain.setTargetAtTime(on * (0.01 + 0.2 * windy + Wc.wind) * (0.6 + 0.6 * gust), now, 0.4);
  windFilter.frequency.setTargetAtTime(300 + 500 * gust + 300 * windy, now, 0.5);
  padGain.gain.setTargetAtTime(on * (0.014 + 0.008 * HIGH) * (0.75 + 0.25 * Math.sin(t * 0.21)), now, 1.5);   // slow breathing
  padFilter.frequency.setTargetAtTime(380 + 1600 * thin + 300 * (1 - day), now, 2);   // brighter and airier as you climb
  waterGain.gain.setTargetAtTime(on * (S.ice ? 0 : 0.16) * lake * (0.75 + 0.25 * Math.sin(t * 1.7) * Math.sin(t * 0.6)), now, 0.3);
  waterFilter.frequency.setTargetAtTime(420 + 220 * Math.sin(t * 0.9), now, 0.3);
  const birds = Math.max(village, 0.6 * forest) * Math.max(day, 0.1) * (1 - Math.min(1, Wc.snow / 3));
  if (on && t > nextBird) { if (Math.random() < birds) chirp(now + 0.05, 0.045 * birds); nextBird = t + 0.6 + Math.random() * 2.4; }
  if (on && S.ice && lake > 0.4 && t > nextIce) { if (nextIce) sing(now + 0.05, 0.03 * lake); nextIce = t + 3 + Math.random() * 6; }
  const crickets = (1 - day) * (1 - smooth(2200, 2900, J.alt)) * (1 - Math.min(1, Wc.snow));   // only on warm nights below the treeline
  if (on && t > nextCricket) { if (Math.random() < crickets) cricket(now + 0.05, 0.012 * crickets); nextCricket = t + 0.4 + Math.random() * 1.2; }
  if (on && S.bells && village > 0.5 && t > nextBell) { if (nextBell) bell(now + 0.05, 0.04 * village); nextBell = t + (nextBell ? 14 + Math.random() * 12 : 3); }
}

/* ---------------- epilogue visuals ---------------- */
// operators: from details.json via the page's #trekExtra script (tools/detail_blocks.py), else from trek.js
const OPS = (JSON.parse($('#trekExtra')?.textContent || '{}').operators || TREK.operators || []).map(([name, url, price, basis, season, rating, count, src, hq]) => ({ name, url, price, basis, season, rating, count, src, hq }));
function buildOperators() {
  // [name, url, priceInr, basis, season, rating, count, ratingSource, hq]
  const inr = (n) => n == null ? '—' : '₹' + n.toLocaleString('en-IN');
  const num = (n) => n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : n;
  const asc = (v) => v == null ? Infinity : v, desc = (v) => v == null ? Infinity : -v; // unknowns sort last
  const SORTS = {
    rated: (a, b) => desc(a.rating) - desc(b.rating) || (b.count || 0) - (a.count || 0) || asc(a.price) - asc(b.price),
    budget: (a, b) => asc(a.price) - asc(b.price) || desc(a.rating) - desc(b.rating),
  };
  const MAXP = Math.max(...OPS.map((o) => o.price || 0));
  const host = (u) => new URL(u).hostname.replace(/^www\./, '');
  const initials = (n) => n.replace(/[†()]/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  // ponytail: logos via Google's favicon service, initials behind them if it fails. Swap in real brand logos if operators supply them.
  const logo = (o) => `<span class="ologo" data-i="${initials(o.name)}"><img src="https://www.google.com/s2/favicons?domain=${host(o.url)}&sz=128" alt="" loading="lazy" onerror="this.remove()"></span>`;

  const grid = document.getElementById('opsGrid'), q = document.getElementById('opsQ'), go = document.getElementById('cmpGo');
  const sortBtns = document.querySelectorAll('[data-sort]');
  let sortKey = 'rated'; const picked = new Set();

  function render() {
    const term = q.value.trim().toLowerCase();
    const list = OPS.filter((o) => !term || [o.name, o.hq, o.season, o.basis].join(' ').toLowerCase().includes(term)).sort(SORTS[sortKey]);
    sortBtns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.sort === sortKey));
    document.getElementById('opsCount').textContent = `${list.length} of ${OPS.length} operators`;
    grid.innerHTML = list.map((o) => `<article class="ocard${picked.has(o.name) ? ' sel' : ''}">
      <header>${logo(o)}<div><h4>${o.name}</h4><div class="note">${o.hq === '—' ? host(o.url) : o.hq}</div></div></header>
      <div class="orate">${o.rating ? `<b>★ ${o.rating}</b><span class="note">${o.count ? num(o.count) + ' reviews · ' : ''}${o.src}</span>` : '<span class="note">No published rating</span>'}</div>
      <div class="bar"><i style="width:${o.rating ? (o.rating / 5) * 100 : 0}%"></i></div>
      <div class="oprice"><b>${inr(o.price)}</b><span class="note">${o.basis}</span></div>
      <div class="bar price"><i style="width:${o.price ? (o.price / MAXP) * 100 : 0}%"></i></div>
      <p class="oseason">📅 ${o.season}</p>
      <footer><a class="btn" href="${o.url}" target="_blank" rel="noopener">Visit site ↗</a>
        <button class="btn" type="button" data-cmp="${o.name}" aria-pressed="${picked.has(o.name)}">${picked.has(o.name) ? '✓ Comparing' : '+ Compare'}</button></footer>
    </article>`).join('') || '<p class="note">No operator matches that search.</p>';
    go.hidden = picked.size === 0;
    go.textContent = picked.size === 2 ? 'Compare 2 operators' : 'Pick one more to compare';
  }

  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cmp]'); if (!b) return;
    const n = b.dataset.cmp;
    if (picked.has(n)) picked.delete(n);
    else { if (picked.size === 2) picked.delete(picked.values().next().value); picked.add(n); } // keep the latest two
    render();
  });
  q.addEventListener('input', render);
  sortBtns.forEach((b) => b.addEventListener('click', () => { sortKey = b.dataset.sort; render(); }));

  const dlg = document.getElementById('cmp');
  document.getElementById('cmpClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  go.addEventListener('click', () => {
    if (picked.size < 2) return;
    const [a, b] = [...picked].map((n) => OPS.find((o) => o.name === n));
    const win = (x, y, better) => x == null || y == null || x === y ? ['', ''] : better(x, y) ? ['win', ''] : ['', 'win'];
    const pw = win(a.price, b.price, (x, y) => x < y), rw = win(a.rating, b.rating, (x, y) => x > y), cw = win(a.count, b.count, (x, y) => x > y);
    const row = (k, x, y, w = ['', '']) => `<tr><th scope="row">${k}</th><td class="${w[0]}">${x}</td><td class="${w[1]}">${y}</td></tr>`;
    document.getElementById('cmpTable').innerHTML =
      `<thead><tr><th></th><th>${logo(a)} ${a.name}</th><th>${logo(b)} ${b.name}</th></tr></thead><tbody>` +
      row('Price from', inr(a.price), inr(b.price), pw) + row('Price basis', a.basis, b.basis) +
      row('Departures', a.season, b.season) + row('Rating', a.rating ? '★ ' + a.rating : '—', b.rating ? '★ ' + b.rating : '—', rw) +
      row('Reviews', a.count ? a.count.toLocaleString('en-IN') : '—', b.count ? b.count.toLocaleString('en-IN') : '—', cw) +
      row('Rating source', a.src || '—', b.src || '—') + row('Based in', a.hq, b.hq) +
      row('Website', `<a href="${a.url}" target="_blank" rel="noopener">${host(a.url)} ↗</a>`, `<a href="${b.url}" target="_blank" rel="noopener">${host(b.url)} ↗</a>`) + '</tbody>';
    dlg.showModal();
  });
  render();
}

function buildProfile() {
  const svg = $('#profile'), W = 900, H = 300, L = 54, Rr = 16, T = 18, B = 40;
  const maxKm = R[R.length - 1][3], { min: lo, max: hi, marks, peak } = TREK.profile;
  const xs = (k) => L + (k / maxKm) * (W - L - Rr), ys = (a) => T + (1 - (a - lo) / (hi - lo)) * (H - T - B);
  let d = '', area = '';
  R.forEach((r, i) => { const x = xs(r[3]).toFixed(1), y = ys(r[1]).toFixed(1); d += (i ? 'L' : 'M') + x + ' ' + y; });
  area = d + `L${xs(maxKm)} ${ys(lo)}L${xs(0)} ${ys(lo)}Z`;
  let g = '';
  for (let a = Math.ceil(lo / 500) * 500; a <= hi; a += 500) g += `<line x1="${L}" x2="${W - Rr}" y1="${ys(a)}" y2="${ys(a)}" stroke="rgba(238,243,244,.08)"/><text x="${L - 8}" y="${ys(a) + 4}" text-anchor="end">${fmt(a)}</text>`;
  for (let k = 0; k <= maxKm; k += 5) g += `<text x="${xs(k)}" y="${H - 14}" text-anchor="middle">${k} km</text>`;
  let m = '';
  marks.forEach(([n, k], i) => { const y = ys(elevAt(k)), x = xs(k); const up = i === peak;
    m += `<circle cx="${x}" cy="${y}" r="4.5" fill="${up ? 'var(--buransh)' : 'var(--snow)'}"/><text x="${x}" y="${y - 12}" text-anchor="${i === 0 ? 'start' : i === marks.length - 1 ? 'end' : 'middle'}" style="fill:${up ? 'var(--buransh)' : 'var(--snow)'}">${n}</text>`; });
  svg.innerHTML = `<defs><linearGradient id="pg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="rgba(159,211,232,.35)"/><stop offset="1" stop-color="rgba(159,211,232,0)"/></linearGradient></defs>
    ${g}<path d="${area}" fill="url(#pg)"/><path d="${d}" fill="none" stroke="var(--ice)" stroke-width="2"/>${m}`;
}
function buildSeason() {
  const NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const ICON = { 12: '❄️', 1: '❄️', 2: '❄️', 11: '🌤️', 3: '🌤️', 4: '🌸' };
  // months each operator runs, from its published season (1 = Jan); operators without dates are left out
  const RUNS = TREK.operatorRuns;
  const inRange = (m, [a, b]) => a <= b ? m >= a && m <= b : m >= a || m <= b;
  const ops = OPS;
  const runsIn = (m) => ops.filter((o) => (RUNS[o.name] || []).some((r) => inRange(m, r)));
  const box = $('#season'), out = $('#monthPick');
  box.innerHTML = NAMES.map((n, i) => { const c = runsIn(i + 1).length;
    return `<button type="button" data-m="${i + 1}" aria-pressed="false"><span class="mic" aria-hidden="true">${ICON[i + 1] || ''}</span><b>${n.slice(0, 3)}</b><small>${c ? c + (c > 1 ? ' trips' : ' trip') : 'none'}</small></button>`; }).join('');
  function pick(m) {
    box.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.m === m));
    const list = runsIn(m);
    out.innerHTML = `<h4>${ICON[m] || ''} ${NAMES[m - 1]}: ${list.length ? list.length + (list.length > 1 ? ' operators run' : ' operator runs') + ' the trek' : 'no operator runs the trek this month'}</h4>`
      + (list.length ? `<div class="chips">${list.map((o) => `<a class="chip" href="${o.url}" target="_blank" rel="noopener">${o.name.replace(' †', '')}</a>`).join('')}</div>` : '');
  }
  box.addEventListener('click', (e) => { const b = e.target.closest('[data-m]'); if (b) pick(+b.dataset.m); });
  pick(new Date().getMonth() + 1);
}
function buildPack() {
  const KEY = TREK.id + '-pack', boxes = [...document.querySelectorAll('#packList input')];
  let saved = []; try { saved = JSON.parse(localStorage.getItem(KEY)) || []; } catch {}
  boxes.forEach((b) => { b.checked = saved.includes(+b.dataset.k); });
  const update = () => {
    const done = boxes.filter((b) => b.checked);
    $('#packCount').textContent = `${done.length} of ${boxes.length} packed`;
    $('#packMeter').style.width = (done.length / boxes.length) * 100 + '%';
    try { localStorage.setItem(KEY, JSON.stringify(done.map((b) => +b.dataset.k))); } catch {}
  };
  $('#packList').addEventListener('change', update);
  $('#packReset').addEventListener('click', () => { boxes.forEach((b) => { b.checked = false; }); update(); });
  $('#rentOnly')?.addEventListener('click',   // only on lists with rentable items
    (e) => { const on = e.currentTarget.getAttribute('aria-pressed') !== 'true';
    e.currentTarget.setAttribute('aria-pressed', on); $('#packList').classList.toggle('rentonly', on); });
  update();
}
function buildNav() {
  const links = [...document.querySelectorAll('.almnav a')], heads = links.map((a) => $(a.hash));
  const mark = () => { let cur = -1; heads.forEach((h, i) => { if (h.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === cur)); };
  addEventListener('scroll', mark, { passive: true }); mark();
}
// each almanac widget is optional: a trek page only gets the ones its content includes
if ($('#opsGrid')) buildOperators();
if ($('#packList')) buildPack();
if ($('.almnav')) buildNav();
if ($('#profile')) buildProfile();
if ($('#season')) buildSeason();
$('#backTop').addEventListener('click', () => scrollToY(0));

/* ---------------- moments: per-trek set pieces, switched on in trek.js ---------------- */
// iceMirror: near its stage, render the scene again from a camera mirrored under the ice, and let the lake shader blend it in.
// ponytail: no oblique clipping; the lake bed is culled from below (back faces), which is enough for a lake in a bowl
const MIRROR = (TREK.moments || []).filter((m) => m.type === 'iceMirror').map((m) => ({ lake: LAKES[m.lake], stage: STAGES.findIndex((st) => st.id === m.stage) }))[0];
const mirrorRT = new THREE.WebGLRenderTarget(1, 1), mirrorCam = new THREE.PerspectiveCamera(), bufSize = new THREE.Vector2();
const BIAS = new THREE.Matrix4().set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);   // clip space → texture space
function renderMirror() {
  const k = 1 - smooth(0.3, 0.9, Math.abs(sCur - MIRROR.stage)), u = MIRROR.lake.material.uniforms;
  u.uReflAmt.value = k;
  if (k < 0.01) return;   // only pay for the extra render near the lake
  renderer.getDrawingBufferSize(bufSize);
  if (mirrorRT.width !== bufSize.x >> 1) mirrorRT.setSize(bufSize.x >> 1, bufSize.y >> 1);
  const y = MIRROR.lake.position.y;
  mirrorCam.copy(camera); mirrorCam.position.y = 2 * y - camera.position.y; mirrorCam.up.set(0, -1, 0);
  mirrorCam.lookAt(curTgt.x, 2 * y - curTgt.y, curTgt.z); mirrorCam.updateMatrixWorld();
  u.uTexMat.value.copy(BIAS).multiply(mirrorCam.projectionMatrix).multiply(mirrorCam.matrixWorldInverse);
  u.uRefl.value = mirrorRT.texture;
  MIRROR.lake.visible = false; renderer.setRenderTarget(mirrorRT); renderer.render(scene, mirrorCam); renderer.setRenderTarget(null); MIRROR.lake.visible = true;
}

/* ---------------- loop ---------------- */
const clock = new THREE.Clock(); let frames = 0, fpsT = 0, lowFps = 0;
const hudEl = $('#hud'), epi = $('#epilogue'), topEl = $('.topbar');
let lastIntro = '';
function frame(now) {
  lenis?.raf(now);
  const dt = Math.min(clock.getDelta(), 0.1), t = clock.elapsedTime;
  autoStep(dt); stepWeather(dt);
  sCur += (sTarget - sCur) * (1 - Math.exp(-dt * 2.2));   // the camera follows the scroll at an unhurried pace
  const J = journey(sCur);
  // opening shot: slow orbit around the view target, fading out as the climb begins
  const drift = still ? 0 : (1 - smooth(0, 0.6, sCur)) * Math.sin(t * 0.06) * 0.12;
  if (drift) J.pos.sub(J.tgt).applyAxisAngle(UP, drift).add(J.tgt);
  lookAround(J, dt);
  // epilogue coverage
  const er = epi.getBoundingClientRect(); const cover = clamp(1 - (er.top - innerHeight * 0.15) / (innerHeight * 0.6), 0, 1);
  const fade = 1 - cover;
  // climb UI (HUD, stage rail, map labels, top bar) stays off the hero until the climb starts
  const climb = auto ? 1 : smooth(0.35, 0.8, sCur), ui = fade * climb;
  hudEl.style.opacity = ui; rail.style.opacity = ui; topEl.style.opacity = climb;
  lookHint.style.opacity = look.atStop && !look.tried ? ui : 0;
  rail.style.pointerEvents = ui < 0.1 ? "none" : ""; topEl.style.pointerEvents = climb < 0.1 ? "none" : "";
  const intro = (1 - smooth(0.1, 0.7, sCur)).toFixed(2);   // hero scrim is pinned to the screen and fades out, so no edge scrolls by
  if (intro !== lastIntro) { document.documentElement.style.setProperty("--intro", intro); document.documentElement.style.setProperty("--brandvis", +intro ? "visible" : "hidden"); lastIntro = intro; }
  cards.forEach((c, k) => c.classList.toggle('on', k + 1 === J.active && fade > 0.4));
  railBtns.forEach((b, k) => { b.classList.toggle('on', k + 1 === J.active); b.classList.toggle('done', k + 1 < J.active); });
  updateHud(J); updateAudio(J, t);
  if (er.top < -10) { requestAnimationFrame(frame); return; }  // fully covered: skip rendering
  const tod = setTime(J.hr);
  U.uFogDen.value *= Wc.fog; U.uSnowLine.value = Wc.line;
  U.uKm.value = J.km; U.uTime.value = t;
  // a soft camera: the position glides; the view turns from where it is now, the short way, at a capped speed,
  // so however the composed and chase shots hand over, the picture pans and never snaps
  const view = J.tgt.clone().sub(J.pos), k = 1 - Math.exp(-dt * 3);
  const wantYaw = Math.atan2(view.z, view.x), wantPitch = Math.atan2(view.y, Math.hypot(view.x, view.z));
  if (frames === 0 && fpsT === 0) { curPos.copy(J.pos); cam.yaw = wantYaw; cam.pitch = wantPitch; cam.len = view.length(); }
  curPos.lerp(J.pos, k); cam.len += (view.length() - cam.len) * k;
  const maxTurn = 1.2 * dt;   // ponytail: ~70°/s cap; raise it if look-around drags feel sluggish
  cam.yaw += clamp(wrap(wantYaw - cam.yaw) * k, -maxTurn, maxTurn); cam.pitch += clamp((wantPitch - cam.pitch) * k, -maxTurn, maxTurn);
  curTgt.set(Math.cos(cam.pitch) * Math.cos(cam.yaw), Math.sin(cam.pitch), Math.cos(cam.pitch) * Math.sin(cam.yaw)).multiplyScalar(cam.len).add(curPos);
  camera.position.copy(curPos); camera.lookAt(curTgt);
  sky.position.copy(camera.position);
  snowMat.uniforms.uCam.value.copy(camera.position);
  snowMat.uniforms.uAmt.value = (0.25 + 0.6 * tod.nightW * smooth(2500, 3400, J.alt) + 0.25 * smooth(3300, 3800, J.alt)) * Wc.snow;
  updateLabels(ui); pickTrail(ui);
  updateMe(t);
  if (MIRROR) renderMirror();
  renderer.render(scene, camera);
  // adaptive resolution
  frames++; fpsT += dt;
  if (fpsT > 2) { const fps = frames / fpsT; frames = 0; fpsT = 0.0001;
    if (fps < 38 && pixelRatio > 0.75) { lowFps++; if (lowFps >= 1) { pixelRatio = Math.max(0.75, pixelRatio - 0.25); renderer.setPixelRatio(pixelRatio); lowFps = 0; } } }
  requestAnimationFrame(frame);
}
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); readScroll(); });
requestAnimationFrame(frame);
setTimeout(() => $('#loader').classList.add('done'), 250);
window.__kk = { journey, STAGES, routeAt, heightAt };   // debug hooks for the camera audit
