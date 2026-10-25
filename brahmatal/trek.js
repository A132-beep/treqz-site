// Brahmatal: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg
// (built by tools/build_trek.py from terrain.json). Route follows the Himalaya Shelter itinerary:
// Lohajung → Bekal Tal 4.5 km → Tilandi 3 km → Brahmatal Top → Brahmatal 5.5 km → Lohajung 8.5 km.
export default {
  id: 'brahmatal',
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    // opening shot: from behind Lohajung, facing north with Trishul (right) and the Brahmatal ridge (left) in view
    { id: 'hero', name: 'Overview', km: 0, hr: 17.4, cam: { yaw: -1.45, dist: 3000, h: 1500, side: 0, look: 6000, lookUp: 1200 } },
    { id: 'lohajung', q: 'Lohajung', name: 'Lohajung', km: 0.05, hr: 17.4, cam: { dist: 700, h: 320, side: 280, look: 600, lookUp: 60 },
      code: 'Day 1 · Lohajung · 2,331 m', title: 'The road to <em>Lohajung</em>', deva: 'लोहाजंग',
      stats: [['Altitude', '2,331', 'm', 'Roadhead village'], ['From Kathgodam', '~220', 'km', '8–10 h by road']],
      body: ['The drive from Kathgodam climbs through <b>Almora</b> and <b>Gwaldam</b> into Chamoli district. It ends at <b>Lohajung</b>, a small village of homestays where the trek begins.',
             'Most groups spend the first night here. Dewal, on the way in, has the last ATM, so carry the cash you need.'],
      dl: [['Night', 'Homestay in Lohajung'], ['Trek so far', '0 km'], ['Look for', 'The forested ridge to the north-west: tomorrow\'s climb']] },
    { id: 'bekaltal', q: 'Bekaltal', name: 'Bekal Tal', km: 4.5, hr: 24 + 15.0, cam: { dist: 560, h: 260, side: -260, look: 500, lookUp: 40 },
      code: 'Day 2 · Bekal Tal · about 3,000 m', title: 'The silent <em>forest lake</em>', deva: 'बेकलताल',
      stats: [['Gain today', '+670', 'm', '4.5 km · 4–5 h'], ['In winter', 'Frozen', '', 'In peak winter']],
      body: ['The trail leaves the village and climbs steadily through forest to <b>Bekal Tal</b>, a small lake closed in by trees.',
             'In peak winter the lake freezes and the forest goes very quiet. Groups camp beside it or at Gujreni, also called Lower Bekaltal, just below.'],
      dl: [['Night', 'Tents near the lake'], ['Trek so far', '4.5 km']] },
    { id: 'tilandi', q: 'Brahmatal trek', name: 'Tilandi', km: 7.5, hr: 48 + 16.5, cam: { dist: 600, h: 260, side: 280, look: 1200, lookUp: 260 },
      code: 'Day 3 · Tilandi · about 3,300 m', title: 'Camp on the <em>ridge</em>', deva: 'बुग्याल पर डेरा',
      stats: [['Gain today', '+330', 'm', '3 km · 3–4 h'], ['First view', 'Trishul', '', '7,120 m, to the north-east']],
      body: ['A short day. The forest thins and the trail comes out onto <b>Tilandi</b>, an open ridge at the edge of a meadow.',
             'For the first time the big peaks stand across the valley: <b>Trishul</b> and <b>Nanda Ghunti</b>. Groups often walk up to Jhandi Top nearby for sunset.'],
      dl: [['Night', 'Tents on the ridge'], ['Trek so far', '7.5 km']] },
    { id: 'top', q: 'Brahmatal trek snow', name: 'Brahmatal Top', km: 10.7, hr: 72 + 7.5, cam: { yaw: -0.63, dist: 330, h: 120, side: 0, look: 3000, lookUp: -150 },
      code: 'Day 4 · Brahmatal Top · 3,734 m', title: 'The top of the <em>ridge</em>', deva: 'ब्रह्मताल शिखर',
      stats: [['From Tilandi', '+400', 'm', 'About 3 km'], ['Air', '63', '%', 'Of sea-level oxygen']],
      body: ['Summit day starts early. The trail climbs the open snow ridge to <b>Brahmatal Top</b>, the high point of the trek at about 3,734 m (12,250 ft).',
             'The view runs from <b>Trishul</b> (7,120 m) and <b>Nanda Ghunti</b> (6,309 m) to <b>Chaukhamba</b>, and on clear days <b>Kamet</b> and <b>Neelkanth</b>.'],
      dl: [['Altitude', '3,734 m (12,250 ft); one operator lists 3,846 m'], ['Trek so far', '10.7 km']] },
    // signature moment: the camera drops to the ice and the summit ridge you crossed hangs upside down in it
    { id: 'brahmatal', q: 'Brahmatal lake', name: 'Brahmatal', km: 13, hr: 72 + 16.8, cam: { at: 'brahmatal_lake', yaw: -1.67, dist: 45, h: 5, side: 0, look: 1000, lookUp: 110 },
      code: 'Day 4 · Brahmatal · about 3,230 m', title: 'Brahma\'s <em>lake</em>', deva: 'ब्रह्मताल',
      stats: [['Down from the top', '−500', 'm', 'About 2.5 km'], ['In winter', 'Frozen', '', 'Partly or fully']],
      body: ['From the top the trail drops along the ridge to <b>Brahmatal</b>, a small lake in a bowl below the summit.',
             'In winter it is partly or fully frozen. Where the ice is clear, the summit ridge you crossed in the morning hangs upside down in it. Camp is pitched a short walk from the water.'],
      legend: 'Locals say Lord Brahma meditated beside this lake, and it carries his name.',
      dl: [['Night', 'Tents near the lake'], ['Trek so far', '13 km']] },
    { id: 'return', q: 'Lohajung', name: 'Back to Lohajung', km: 21.45, hr: 96 + 14.0, cam: { dist: 1000, h: 460, side: -320, look: 700, lookUp: 60 },
      code: 'Day 5 · Lohajung · 2,331 m', title: 'The long way <em>down</em>', deva: 'वापसी',
      stats: [['Descent', '−900', 'm', '8.5 km · 7–8 h'], ['Trek total', '21.5', 'km', 'Over 4 days']],
      body: ['The last day is the longest. The trail drops off the ridge past Tilandi and down through forest, joining the first day\'s path above Lohajung.',
             'Groups are usually back by afternoon for a hot meal and a last night in the village before the drive out.'],
      dl: [['Night', 'Homestay in Lohajung'], ['Next', 'Drive back to Kathgodam or Dehradun']] },
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [['Lohajung', '2,331 m', 'lohajung'], ['Bekal Tal', '3,000 m', 'bekaltal_lake'], ['Tilandi', '3,360 m', 'tilandi'], ['Brahmatal Top', '3,734 m', 'top'], ['Brahmatal', '3,230 m', 'brahmatal_lake']],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  // (Chaukhamba is 72 km away; it sits on the edge of the drawn horizon in its true direction)
  farPeaks: [
    { name: 'Trishul', alt: 7120, th: -0.77, r: 24000 },
    { name: 'Nanda Ghunti', alt: 6309, th: -1.06, r: 24000 },
    { name: 'Chaukhamba', alt: 7138, th: -1.99, r: 56000 },
  ],
  // what stands at each stop (types are built by the engine); camps are drawn in this order
  props: [
    { type: 'village', at: 'lohajung', houses: 34, radius: 200 },
    { type: 'camp', at: 'bekaltal', offset: [-40, 30], tents: 12, radius: 45, dining: '#3a8fd9' },
    { type: 'camp', at: 'tilandi', tents: 14, radius: 60, dining: '#f2a33a' },
    { type: 'camp', at: 'brahmatal', tents: 14, radius: 55, dining: '#2f8f5b' },
    { type: 'lake', at: 'bekaltal_lake', radius: 34 },
    { type: 'lake', at: 'brahmatal_lake', radius: 44 },
    { type: 'walkers', from: 8.2, to: 10.6 },
  ],
  // set pieces the engine stages for this trek
  moments: [{ type: 'iceMirror', stage: 'brahmatal', lake: 'brahmatal_lake' }],
  // look: accent is set in index.html (--buransh); sky mood tints the engine's dawn/day/night palette toward blue hour
  theme: { sky: { night: { zen: '#060c1f', hor: '#17254a' }, dawn: { zen: '#263c86', hor: '#d6a3b8', sun: '#ffd0a6' }, day: { zen: '#2458b8' } } },
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: { ice: true, villages: [[0, 0.4, 2.0], [21.5, 0.4, 2.0]], lakes: [[4.5, 1.0], [13, 1.0]], wind: [2900, 3734] },
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: { alt: 2331, temp: 4 },
  // elevation profile in the almanac: axis range, labelled stops, which one is the summit
  profile: { min: 2000, max: 4000, peak: 3, marks: [['Lohajung', 0], ['Bekal Tal', 4.5], ['Tilandi', 7.5], ['Top 3,734 m', 10.7], ['Brahmatal', 13], ['Lohajung', 21.5]] },
};
