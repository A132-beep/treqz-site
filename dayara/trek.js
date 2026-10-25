// Dayara Bugyal: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg
// (built by tools/build_trek.py from terrain.json). Route follows the Bikat Adventures itinerary:
// Raithal → Gui 6 km → Chilapada 6 km → Dayara Top → Nayata 9 km → Raithal 4 km.
export default {
  id: 'dayara',
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    // opening shot: from behind Raithal, facing north toward Bandarpoonch over the meadows
    { id: 'hero', name: 'Overview', km: 0, hr: 17.4, cam: { yaw: -1.8, dist: 3000, h: 1500, side: 0, look: 6000, lookUp: 1300 } },
    { id: 'raithal', q: 'Raithal village', name: 'Raithal', km: 0.05, hr: 17.4, cam: { dist: 700, h: 320, side: 280, look: 600, lookUp: 60 },
      code: 'Day 1 · Raithal · 2,100 m', title: 'A village above the <em>Bhagirathi</em>', deva: 'रैथल',
      stats: [['Altitude', '2,100', 'm', 'Village of homestays'], ['From Dehradun', '~190', 'km', 'About 8 h by road']],
      body: ['The road from Dehradun climbs to Uttarkashi and on toward Gangotri. <b>Raithal</b> sits on the slope above the Bhagirathi valley, 30–40 km past Uttarkashi.',
             'Most groups spend the first night in a village homestay. The meadows the village grazes its cattle on are a day and a half above you.'],
      dl: [['Night', 'Homestay in Raithal'], ['Trek so far', '0 km'], ['Look for', 'The forest line on the ridge to the west: the meadows start above it']] },
    { id: 'gui', q: 'Dayara Bugyal forest', name: 'Gui', km: 6, hr: 24 + 14.0, cam: { dist: 560, h: 260, side: -260, look: 500, lookUp: 40 },
      code: 'Day 2 · Gui · 2,948 m', title: 'Into the <em>oak forest</em>', deva: 'गुई',
      stats: [['Gain today', '+850', 'm', '6 km · about 4 h'], ['In winter', 'Frozen', '', 'Gui lake, beside camp']],
      body: ['The trail leaves Raithal and climbs steadily through forest to <b>Gui</b>, a clearing with a small lake.',
             'In winter the lake beside camp freezes over. It is the last campsite inside the trees.'],
      dl: [['Night', 'Tents at Gui'], ['Trek so far', '6 km']] },
    { id: 'chilapada', q: 'Dayara Bugyal', name: 'Chilapada', km: 12, hr: 48 + 15.0, cam: { dist: 640, h: 280, side: 300, look: 900, lookUp: 220 },
      code: 'Day 3 · Chilapada · 3,094 m', title: 'The edge of the <em>meadow</em>', deva: 'चिलापड़ा',
      stats: [['Today', '6', 'km', '5–6 h, with Barnala Tal'], ['Side trip', 'Barnala Tal', '', 'Half-frozen in winter']],
      body: ['A gentle day. The forest opens onto the first grassland, and the trail detours to <b>Barnala Tal</b>, a small lake in a meadow of its own.',
             'Camp is at <b>Chilapada</b>, right where the great slope of Dayara Bugyal begins.'],
      dl: [['Night', 'Tents at Chilapada'], ['Trek so far', '12 km']] },
    { id: 'top', q: 'Dayara Bugyal snow', name: 'Dayara Top', km: 17, hr: 72 + 9.0, cam: { yaw: -0.93, dist: 330, h: 120, side: 0, look: 3000, lookUp: -150 },
      code: 'Day 4 · Dayara Top · 3,750 m', title: 'A meadow with a <em>view</em>', deva: 'दयारा बुग्याल',
      stats: [['From Chilapada', '+650', 'm', 'About 5 km'], ['Air', '63', '%', 'Of sea-level oxygen']],
      body: ['The morning is a long, open climb across <b>Dayara Bugyal</b>, a vast high meadow, to the top at about 3,750 m.',
             'From the top the Garhwal range runs along the horizon: <b>Bandarpoonch</b> (6,316 m) and <b>Black Peak</b> to the north, the <b>Gangotri</b> peaks and <b>Jaonli</b> to the east.'],
      legend: 'Every August, Raithal’s villagers gather on this meadow for the Butter Festival, Andhudi Utsav, and play Holi with butter, milk and buttermilk to thank the mountain deities as their cattle come down from summer grazing.',
      dl: [['Altitude', '3,750 m'], ['Trek so far', '17 km']] },
    { id: 'nayata', q: 'Dayara Bugyal', name: 'Nayata', km: 21, hr: 72 + 15.5, cam: { dist: 520, h: 240, side: -240, look: 500, lookUp: 40 },
      code: 'Day 4 · Nayata · 2,697 m', title: 'Back into the <em>trees</em>', deva: 'नयाता',
      stats: [['Down from the top', '−1,050', 'm', 'About 4 km'], ['Camp', 'Forest', '', 'Below the meadows']],
      body: ['From the top the trail drops off the meadow and back into the forest to <b>Nayata</b>, the last camp.',
             'It is a long descent on tired legs. Take it slowly on the snow.'],
      dl: [['Night', 'Tents at Nayata'], ['Trek so far', '21 km']] },
    { id: 'return', q: 'Raithal village', name: 'Back to Raithal', km: 24.95, hr: 96 + 11.5, cam: { dist: 1000, h: 460, side: -320, look: 700, lookUp: 60 },
      code: 'Day 5 · Raithal · 2,100 m', title: 'Down to the <em>village</em>', deva: 'वापसी',
      stats: [['Descent', '−600', 'm', '4 km · about 3.5 h'], ['Trek total', '25', 'km', 'Over 4 days']],
      body: ['A short last walk through the forest brings you back to Raithal by late morning.',
             'From here it is the long drive back down the Bhagirathi valley to Uttarkashi and Dehradun.'],
      dl: [['Next', 'Drive back to Dehradun']] },
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [['Raithal', '2,100 m', 'raithal'], ['Gui', '2,950 m', 'gui'], ['Chilapada', '3,180 m', 'chilapada'], ['Dayara Top', '3,750 m', 'top'], ['Nayata', '2,700 m', 'nayata'], ['Barnala Tal', '3,000 m', 'barnala_tal']],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [
    { name: 'Bandarpoonch', alt: 6316, th: -1.67, r: 20000 },
    { name: 'Black Peak', alt: 6387, th: -1.57, r: 22000 },
    { name: 'Gangotri I', alt: 6672, th: -0.38, r: 28000 },
    { name: 'Jaonli', alt: 6632, th: -0.12, r: 27000 },
  ],
  // what stands at each stop (types are built by the engine); camps are drawn in this order
  props: [
    { type: 'village', at: 'raithal', houses: 40, radius: 220 },
    { type: 'camp', at: 'gui', tents: 12, radius: 50, dining: '#3a8fd9' },
    { type: 'camp', at: 'chilapada', tents: 14, radius: 55, dining: '#f2a33a' },
    { type: 'camp', at: 'nayata', tents: 12, radius: 50, dining: '#2f8f5b' },
    { type: 'lake', at: 'barnala_tal', radius: 40 },
    { type: 'walkers', from: 13.5, to: 16.8 },
  ],
  // look: accent is set in index.html (--buransh); sky mood: a clear, warm meadow morning
  theme: { sky: { dawn: { hor: '#f0c890', sun: '#ffd9a0' }, day: { zen: '#2f6fc4', hor: '#c4dbe9' } } },
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: { ice: true, villages: [[0, 0.4, 2.0], [25, 0.4, 2.0]], lakes: [[6, 0.8]], wind: [3000, 3750] },
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: { alt: 2100, temp: 5 },
  // elevation profile in the almanac: axis range, labelled stops, which one is the summit
  profile: { min: 2000, max: 4000, peak: 3, marks: [['Raithal', 0], ['Gui', 6], ['Chilapada', 12], ['Top 3,750 m', 17], ['Nayata', 21], ['Raithal', 25]] },
};
