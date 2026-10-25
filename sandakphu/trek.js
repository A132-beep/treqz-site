// Sandakphu: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg
// (built by tools/build_trek.py from terrain.json, routed along the OpenStreetMap path and jeep-road network).
// Route: Manebhanjan → Tumling → Kalapokhri → Sandakphu → Phalut → Gorkhey → Sepi along the Singalila Ridge.
// km are measured along the mapped trail; operators quote longer figures.
export default {
  id: 'sandakphu',
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    // opening shot: from behind Manebhanjan, facing north up the ridge toward Kangchenjunga
    { id: 'hero', name: 'Overview', km: 0, hr: 17.4, cam: { yaw: -1.54, dist: 3600, h: 1600, side: 0, look: 7000, lookUp: 1500 } },
    { id: 'manebhanjan', q: 'Manebhanjan', name: 'Manebhanjan', km: 0.05, hr: 17.4, cam: { dist: 700, h: 320, side: 280, look: 600, lookUp: 60 },
      code: 'Day 1 · Manebhanjan', title: 'The foot of the <em>ridge</em>', deva: 'मानेभञ्ज्याङ',
      stats: [['From Darjeeling', '~28', 'km', 'By road'], ['Ahead', 'Singalila', '', 'Ridge along the Nepal border']],
      body: ['<b>Manebhanjan</b> is where the Singalila Ridge treks begin, about 28 km from Darjeeling.',
             'From here the trail climbs onto the ridge and follows the border between India and Nepal, crossing from one country to the other as it goes.'],
      dl: [['Night', 'Homestay near the start'], ['Trek so far', '0 km'], ['Look for', 'The ridge rising to the north-west: you walk its crest for days']] },
    { id: 'tumling', q: 'Tumling', name: 'Tumling', km: 10.1, hr: 24 + 15.0, cam: { dist: 560, h: 260, side: -260, look: 500, lookUp: 40 },
      code: 'Day 2 · Tumling · 2,875 m', title: 'Onto the <em>border</em>', deva: 'टुमलिङ',
      stats: [['Today', '10', 'km', '7–8 h on the mapped trail'], ['Lunch', 'Meghma', '', 'On the Nepal side']],
      body: ['The trail climbs out of Manebhanjan to <b>Chitrey</b>, where the Nepal border begins, and on past <b>Meghma</b> to the ridge-top hamlet of <b>Tumling</b>.',
             'Tonight is a homestay in Tumling. The ridge ahead runs north toward Sandakphu.'],
      dl: [['Night', 'Homestay in Tumling'], ['Trek so far', '10 km']] },
    { id: 'kalapokhri', q: 'Kalapokhri', name: 'Kalapokhri', km: 22.75, hr: 48 + 16.0, cam: { dist: 600, h: 260, side: 280, look: 900, lookUp: 160 },
      code: 'Day 3 · Kalapokhri · 2,990 m', title: 'The black <em>lake</em>', deva: 'कालापोखरी',
      stats: [['Today', '13', 'km', 'About 8 h'], ['Permits', 'Checked', '', 'Singalila National Park']],
      body: ['A long day along the ridge, past the check post into <b>Singalila National Park</b>, to <b>Kalapokhri</b>, "the black lake".',
             'The lake is hung with prayer flags. Further along the ridge is <b>Bikheybhanjang</b>, "the poisonous valley", named for the aconite that grows there.'],
      dl: [['Night', 'Homestay in Kalapokhri'], ['Trek so far', '23 km']] },
    { id: 'sandakphu', q: 'Sandakphu', name: 'Sandakphu', km: 27.96, hr: 96 + 5.9, cam: { yaw: -1.6, dist: 330, h: 120, side: 0, look: 3000, lookUp: -150 },
      code: 'Day 5 · Sandakphu · 3,636 m', title: 'The <em>Sleeping Buddha</em>', deva: 'सन्दकफू',
      stats: [['From Kalapokhri', '5', 'km', '2–3 h, the day before'], ['In view', '4 of 5', '', 'Of the world\'s highest peaks']],
      body: ['<b>Sandakphu</b> (3,636 m) is the highest point of the Singalila Ridge and of West Bengal. Most groups arrive the afternoon before and wait for sunrise.',
             'At dawn the <b>Kangchenjunga</b> range lies along the north like a sleeping figure, the Sleeping Buddha. To the west, <b>Everest</b>, <b>Lhotse</b> and <b>Makalu</b> stand on the horizon: four of the world\'s five highest peaks.'],
      legend: 'The name is Lepcha: "the height of the poisonous plant", for the aconite and poisonous rhododendrons on its slopes.',
      dl: [['Altitude', '3,636 m'], ['Trek so far', '28 km']] },
    { id: 'phalut', q: 'Phalut', name: 'Phalut', km: 44.71, hr: 96 + 15.5, cam: { dist: 600, h: 260, side: -280, look: 1200, lookUp: 260 },
      code: 'Day 5 · Phalut · about 3,600 m', title: 'The end of the <em>ridge</em>', deva: 'फालुट',
      stats: [['Today', '17', 'km', '7–8 h along the crest'], ['Altitude', '~3,600', 'm', 'The ridge\'s far end']],
      body: ['A long, open walk north along the crest of the ridge to <b>Phalut</b>, at about 3,600 m, almost as high as Sandakphu.',
             'Kangchenjunga feels closer here than anywhere else on the trek.'],
      dl: [['Night', 'Guesthouse at Phalut'], ['Trek so far', '45 km']] },
    { id: 'gorkhey', q: 'Gorkhey', name: 'Gorkhey', km: 52.77, hr: 120 + 14.0, cam: { dist: 520, h: 240, side: -240, look: 500, lookUp: 40 },
      code: 'Day 6 · Gorkhey', title: 'Down to the <em>river</em>', deva: 'गोर्खे',
      stats: [['Today', '8', 'km', '4–5 h, steeply down'], ['Descent', '−1,200', 'm', 'Off the ridge']],
      body: ['The trail drops steeply off the ridge through forest to <b>Gorkhey</b>, a village in the valley below.',
             'Its houses, food and customs reflect the Nepali Himalayan culture of these hills.'],
      dl: [['Night', 'Homestay in Gorkhey'], ['Trek so far', '53 km']] },
    { id: 'sepi', q: 'Sepi', name: 'Sepi', km: 62.08, hr: 144 + 15.0, cam: { dist: 1000, h: 460, side: -320, look: 700, lookUp: 60 },
      code: 'Day 7 · Sepi', title: 'The road <em>home</em>', deva: 'सेपी',
      stats: [['Today', '9', 'km', 'On the mapped trail'], ['Trek total', '62', 'km', 'Over 6 days']],
      body: ['The last walk follows the valley down to <b>Sepi</b>, where the road begins again.',
             'From here it is a long drive back to Bagdogra or Darjeeling.'],
      dl: [['Next', 'Drive to Bagdogra, about 5 h']] },
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [['Manebhanjan', '1,960 m', 'manebhanjan'], ['Tumling', '2,875 m', 'tumling'], ['Kalapokhri', '2,990 m', 'kalapokhri'], ['Sandakphu', '3,636 m', 'sandakphu'], ['Phalut', '3,600 m', 'phalut'], ['Gorkhey', '2,280 m', 'gorkhey'], ['Sepi', '2,240 m', 'sepi']],
  // big peaks on the horizon: bearing th (radians from east toward south), distance r and drawn height h.
  // Both are beyond the 60 km horizon ring, so they sit at 56 km with h chosen to keep their true angle above Sandakphu.
  farPeaks: [
    { name: 'Kangchenjunga', alt: 8586, th: -1.436, r: 56000, h: 7732 },   // really 68 km away
    { name: 'Everest', alt: 8849, th: -2.418, r: 56000, h: 5590 },         // really 149 km away; Lhotse and Makalu stand beside it
  ],
  // what stands at each stop (types are built by the engine)
  props: [
    { type: 'village', at: 'manebhanjan', houses: 40, radius: 220 },
    { type: 'village', at: 'tumling', houses: 12, radius: 80 },
    { type: 'village', at: 'kalapokhri', houses: 10, radius: 80 },
    { type: 'flags', at: 'kalapokhri', offset: [45, 10] },
    { type: 'village', at: 'sandakphu', houses: 10, radius: 90 },
    { type: 'flags', at: 'sandakphu', offset: [-30, 20] },
    { type: 'village', at: 'phalut', houses: 3, radius: 30 },
    { type: 'village', at: 'gorkhey', houses: 24, radius: 140 },
    { type: 'village', at: 'sepi', houses: 16, radius: 120 },
    { type: 'walkers', from: 24.0, to: 27.6 },
  ],
  // look: accent is set in index.html (--buransh); sky mood: rose dawn over a sea of cloud
  theme: { sky: { night: { zen: '#070b1d' }, dawn: { zen: '#2e3f7c', hor: '#f4a78f', sun: '#ffc6a2' } } },
  // soundscape: villages [km, full within, silent beyond], prayer flags fluttering [km, spread], wind from/to altitude
  sound: { villages: [[0, 0.4, 2.0], [10.1, 0.3, 1.2], [52.77, 0.4, 1.6], [62.1, 0.4, 2.0]], lakes: [],
           flags: [[22.75, 0.6], [27.96, 0.8]], wind: [2900, 3636] },
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: { alt: 2000, temp: 12 },
  // elevation profile in the almanac: axis range, labelled stops, which one is the summit
  profile: { min: 1800, max: 4000, peak: 3, marks: [['Manebhanjan', 0], ['Tumling', 10.1], ['Kalapokhri', 22.75], ['Sandakphu 3,636 m', 27.96], ['Phalut', 44.71], ['Gorkhey', 52.77], ['Sepi', 62.13]] },
};
