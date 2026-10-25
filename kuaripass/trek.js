// Kuari Pass: everything the engine needs that is specific to this trek.
// Route follows the Bikat Adventures itinerary: (Joshimath →) Tugasi → Khullara 8 km → Kuari Pass and back 12 km → Tugasi 10 km.
// Trail routed along OpenStreetMap paths.
export default {
  id: 'kuaripass',
  stages: [
    // opening shot: from behind Tugasi, facing Nanda Devi to the east
    { id: 'hero', name: 'Overview', km: 0, hr: 24 + 9.5, cam: { yaw: 0.32, dist: 3000, h: 1500, side: 0, look: 6000, lookUp: 1600 } },
    { id: 'tugasi', q: 'Joshimath', name: 'Tugasi', km: 0.05, hr: 24 + 9.5, cam: { dist: 700, h: 320, side: 280, look: 600, lookUp: 60 },
      code: 'Day 2 · Tugasi', title: 'Above <em>Joshimath</em>', deva: 'तुगासी',
      stats: [['Joshimath', '2,040', 'm', 'Night before, guesthouse'], ['Today', '8', 'km', 'About 7 h, to Khullara']],
      body: ['Day one ends in <b>Joshimath</b>. This morning a short drive climbs to <b>Tugasi</b>, where the walking starts.',
             'Lunch is at <b>Gulling</b>, then the trail climbs on through forest to camp.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The ridge to the south: the pass is on its crest']] },
    { id: 'khullara', q: 'Kuari Pass trek', name: 'Khullara', km: 8, hr: 24 + 15.5, cam: { dist: 600, h: 260, side: -260, look: 900, lookUp: 200 },
      code: 'Day 2 · Khullara · 3,362 m', title: 'Camp below the <em>doorway</em>', deva: 'खुलारा',
      stats: [['Gain today', '+800', 'm', 'From Tugasi'], ['Night low', '−15', '°C', 'Can reach, Dec–Feb']],
      body: ['<b>Khullara</b> is the main camp, a clearing at about 3,360 m below the pass.',
             'In midwinter the high camps can drop to −5 to −15 °C at night.'],
      dl: [['Night', 'Tents at Khullara (two nights)'], ['Trek so far', '8 km']] },
    { id: 'pass', q: 'Kuari Pass', name: 'Kuari Pass', km: 14, hr: 48 + 9.0, cam: { yaw: 0.1, dist: 330, h: 120, side: 0, look: 3000, lookUp: -150 },
      code: 'Day 3 · Kuari Pass · 3,814 m', title: 'Through the <em>doorway</em>', deva: 'कुआरी पास',
      stats: [['From camp', '6', 'km', 'There and back, 5–6 h'], ['Air', '63', '%', 'Of sea-level oxygen']],
      body: ['A morning climb from Khullara to <b>Kuari Pass</b> at about 3,814 m.',
             'The pass faces the great peaks of Garhwal: <b>Nanda Devi</b>, <b>Dronagiri</b>, <b>Hathi Ghoda</b>, <b>Kamet</b>, <b>Chaukhamba</b> and <b>Trishul</b>.'],
      legend: 'Kuari Pass means "the doorway". Lord Curzon explored this route, and it is still called the Curzon Trail.',
      dl: [['Altitude', '3,814 m'], ['Trek so far', '14 km']] },
    { id: 'return', q: 'Joshimath', name: 'Back to Tugasi', km: 29.95, hr: 72 + 14.0, cam: { dist: 900, h: 420, side: -320, look: 700, lookUp: 60 },
      code: 'Day 4 · Tugasi', title: 'Down via <em>Gulling</em>', deva: 'वापसी',
      stats: [['Today', '10', 'km', 'About 6–7 h'], ['Trek total', '30', 'km', 'Over 3 days']],
      body: ['Back down from Khullara through <b>Gulling</b> to <b>Tugasi</b>, then the drive to Joshimath.',
             'The next morning is the long drive to Rishikesh or Dehradun.'],
      dl: [['Night', 'Guesthouse in Joshimath'], ['Next', 'Drive to Rishikesh or Dehradun']] },
  ],
  labels: [['Joshimath', '2,040 m', 'joshimath'], ['Tugasi', '2,570 m', 'tugasi'], ['Khullara', '3,362 m', 'khullara'], ['Kuari Pass', '3,814 m', 'pass']],
  farPeaks: [
    { name: 'Nanda Devi', alt: 7816, th: 0.35, r: 40000 },
    { name: 'Trishul', alt: 7120, th: 0.83, r: 28000 },
    { name: 'Hathi Parbat', alt: 6727, th: -1.03, r: 24000 },
    { name: 'Kamet', alt: 7756, th: -1.54, r: 47000 },
    { name: 'Chaukhamba', alt: 7138, th: -2.44, r: 38000 },
  ],
  props: [
    { type: 'village', at: 'joshimath', houses: 70, radius: 450 },
    { type: 'village', at: 'tugasi', houses: 20, radius: 140 },
    { type: 'camp', at: 'khullara', tents: 16, radius: 60, dining: '#3a8fd9' },
    { type: 'walkers', from: 9.5, to: 13.8 },
  ],
  // look: accent is set in index.html; sky mood: rose alpenglow on Nanda Devi
  theme: { sky: { dawn: { zen: '#2d3e80', hor: '#efa7b4', sun: '#ffc9b8' } } },
  sound: { villages: [[0, 0.4, 2.0], [30, 0.4, 2.0]], lakes: [], wind: [3000, 3814] },
  climate: { alt: 2570, temp: 5 },
  profile: { min: 2200, max: 4000, peak: 2, marks: [['Tugasi', 0], ['Khullara', 8], ['Kuari Pass 3,814 m', 14], ['Khullara', 20], ['Tugasi', 30]] },
};
