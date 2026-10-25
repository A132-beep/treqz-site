// Har Ki Dun: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg
// (built by tools/build_trek.py from terrain.json, routed along the OpenStreetMap path network). Route follows
// the Bikat Adventures itinerary: Dhatmeer → Pauni Garaat 6 km → Seematra 8 km → Har Ki Dun and back 14 km →
// Pauni Garaat via Osla 7 km → Dhatmeer 6 km.
export default {
  id: 'harkidun',
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    // opening shot: from behind Dhatmeer, looking straight up the valley to Swargarohini
    { id: 'hero', name: 'Overview', km: 0, hr: 24 + 17.0, cam: { yaw: 0.0, dist: 3000, h: 1500, side: 0, look: 6000, lookUp: 1300 } },
    { id: 'dhatmeer', q: 'Har Ki Dun trek', name: 'Dhatmeer', km: 0.05, hr: 24 + 10.0, cam: { dist: 700, h: 320, side: 280, look: 600, lookUp: 60 },
      code: 'Day 2 · Dhatmeer · 2,400 m', title: 'Where the <em>road ends</em>', deva: 'धातमीर',
      stats: [['Altitude', '2,400', 'm', 'The road head'], ['From Sankri', '18', 'km', 'About 1.5 h by road']],
      body: ['Day 1 is the long drive from Dehradun to <b>Sankri</b>, about 197 km. This morning a short drive up the valley ends at <b>Dhatmeer</b>, and the walking begins.',
             'From here on there are no roads. Mules carry loads to the villages further up the valley.'],
      dl: [['Night before', 'Guesthouse in Sankri'], ['Trek so far', '0 km'], ['Look for', 'The valley opening to the east: Har Ki Dun is at its head']] },
    { id: 'pauni', q: 'Osla village', name: 'Pauni Garaat', km: 6, hr: 24 + 15.0, cam: { dist: 560, h: 260, side: -260, look: 500, lookUp: 40 },
      code: 'Day 2 · Pauni Garaat · 2,500 m', title: 'Camp by the <em>river</em>', deva: 'पौनी गराट',
      stats: [['Today', '6', 'km', '4–5 h, gentle'], ['Gain today', '+100', 'm', 'Mostly along the valley']],
      body: ['The trail runs up the valley beside the river to <b>Pauni Garaat</b>, a camp near the water.',
             'Across the water is <b>Osla</b>, the last village in the valley. You will walk through it on the way back.'],
      dl: [['Night', 'Tents at Pauni Garaat'], ['Trek so far', '6 km']] },
    { id: 'seematra', q: 'Har Ki Dun valley', name: 'Seematra', km: 14, hr: 48 + 15.0, cam: { dist: 640, h: 280, side: 300, look: 900, lookUp: 220 },
      code: 'Day 3 · Seematra · 3,250 m', title: 'Above the <em>villages</em>', deva: 'सीमात्रा',
      stats: [['Gain today', '+750', 'm', '8 km · 5–6 h'], ['Look back', 'Kedarkantha', '', 'Its summit is in view']],
      body: ['A steady climb out of the villages and up the valley to <b>Seematra</b>, a high camp below the big peaks.',
             'Look back down the valley: the summit of <b>Kedarkantha</b> is visible from here.'],
      dl: [['Night', 'Tents at Seematra (two nights)'], ['Trek so far', '14 km']] },
    { id: 'harkidun', q: 'Har Ki Dun', name: 'Har Ki Dun', km: 21, hr: 72 + 11.0, cam: { yaw: 0.72, dist: 650, h: 200, side: 0, look: 1200, lookUp: 300 },
      code: 'Day 4 · Har Ki Dun · 3,566 m', title: 'The valley of <em>gods</em>', deva: 'हर की दून',
      stats: [['Today', '14', 'km', 'There and back, 7–8 h'], ['Altitude', '3,566', 'm', 'The valley floor']],
      body: ['A day walk from Seematra into <b>Har Ki Dun</b>, a wide high valley at about 3,566 m.',
             'At its head stands <b>Swargarohini</b> (6,252 m), with <b>Black Peak</b> and the <b>Bandarpoonch</b> range beyond.'],
      legend: 'Swargarohini takes its name from the Mahabharata. The Pandavas gave up their kingdom and walked north to reach heaven; its peaks were their stairway, and only Yudhishthira reached the top.',
      dl: [['Night', 'Back at Seematra'], ['Trek so far', '21 km']] },
    { id: 'osla', q: 'Osla village', name: 'Osla', km: 33.5, hr: 96 + 11.0, cam: { dist: 520, h: 240, side: -240, look: 500, lookUp: 40 },
      code: 'Day 5 · Osla · about 2,750 m', title: 'A village of <em>carved wood</em>', deva: 'ओसला',
      stats: [['Today', '7', 'km', '3–4 h, downhill'], ['Houses', 'Two storeys', '', 'Wood, slanted roofs']],
      body: ['The way back crosses to <b>Osla</b>, a village of double-storied wooden houses with slanted roofs.',
             'At its centre is the <b>Someshwar temple</b>, dedicated to Lord Shiva, its walls covered in detailed carving.'],
      dl: [['Night', 'Tents at Pauni Garaat'], ['Trek so far', '35 km by tonight']] },
    { id: 'return', q: 'Sankri', name: 'Back to Dhatmeer', km: 40.95, hr: 120 + 13.0, cam: { dist: 1000, h: 460, side: -320, look: 700, lookUp: 60 },
      code: 'Day 6 · Dhatmeer · 2,400 m', title: 'Out of the <em>valley</em>', deva: 'वापसी',
      stats: [['Today', '6', 'km', '4–5 h'], ['Trek total', '41', 'km', 'Over 5 days']],
      body: ['The last walk follows the river back down to the road at Dhatmeer, then a short drive to Sankri.',
             'The next morning is the long drive back to Dehradun.'],
      dl: [['Night', 'Guesthouse in Sankri'], ['Next', 'Drive back to Dehradun']] },
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [['Dhatmeer', '2,400 m', 'dhatmeer'], ['Pauni Garaat', '2,500 m', 'pauni'], ['Osla', '2,750 m', 'osla'], ['Seematra', '3,250 m', 'seematra'], ['Har Ki Dun', '3,566 m', 'harkidun']],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [
    { name: 'Swargarohini', alt: 6252, th: 0.25, r: 16000 },
    { name: 'Black Peak', alt: 6387, th: 0.45, r: 23000 },
    { name: 'Bandarpoonch', alt: 6316, th: 0.59, r: 23000 },
  ],
  // what stands at each stop (types are built by the engine); camps are drawn in this order
  props: [
    { type: 'village', at: 'dhatmeer', houses: 22, radius: 160 },
    { type: 'village', at: 'osla', houses: 34, radius: 170 },
    { type: 'temple', at: 'osla', offset: [10, -12] },
    { type: 'camp', at: 'pauni', tents: 12, radius: 50, dining: '#3a8fd9' },
    { type: 'camp', at: 'seematra', tents: 14, radius: 55, dining: '#f2a33a' },
    { type: 'walkers', from: 15.5, to: 20.6 },
  ],
  // look: accent is set in index.html (--buransh); sky mood: clear autumn light in the valley
  theme: { sky: { dawn: { hor: '#eab48c' }, day: { zen: '#2a5fb2', hor: '#c8dceb' } } },
  // soundscape: the river runs beside you the whole way (lakes = flowing water), temple bells at Osla
  sound: { bells: true, villages: [[0, 0.4, 2.0], [33.5, 0.3, 1.2], [41, 0.4, 2.0]],
           lakes: [[3, 4], [10, 4], [17, 4], [24, 4], [31, 4], [38, 4]], wind: [3100, 3566] },
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: { alt: 2400, temp: 8 },
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: { min: 2000, max: 4000, peak: 3, marks: [['Dhatmeer', 0], ['Pauni Garaat', 6], ['Seematra', 14], ['Har Ki Dun 3,566 m', 21], ['Osla', 33.5], ['Dhatmeer', 41]] },
};
