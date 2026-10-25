// Triund: everything the engine needs that is specific to this trek.
// Route follows the Bikat Adventures itinerary: McLeodganj → Galu Devi → Triund 9 km → Laka 5 km → Triund → McLeodganj (28 km).
// Trail routed along OpenStreetMap paths; McLeodganj–Galu Devi and the final descent are traced over the terrain.
export default {
  id: 'triund',
  stages: [
    // opening shot: from behind McLeodganj, facing the Dhauladhar wall to the north-east
    { id: 'hero', name: 'Overview', km: 0, hr: 9.0, cam: { yaw: -1.0, dist: 2600, h: 1200, side: 0, look: 5000, lookUp: 1600 } },
    { id: 'mcleod', q: 'McLeod Ganj', name: 'McLeodganj', km: 0.05, hr: 9.0, cam: { dist: 600, h: 300, side: 260, look: 600, lookUp: 80 },
      code: 'Day 1 · McLeodganj · 1,785 m', title: 'Little <em>Lhasa</em>', deva: 'मैक्लोडगंज',
      stats: [['From Dharamshala', '5', 'km', 'By auto or taxi'], ['Ahead', 'Triund', '', '9 km and 1,100 m up']],
      body: ['<b>McLeodganj</b>, above Dharamshala, is known as "little Lhasa" for its Tibetan community. The trail starts from the edge of town.',
             'Most groups walk to Triund in a day and camp on top, then return the next day.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The rock wall of the Dhauladhar above the town']] },
    { id: 'galu', q: 'Galu Devi temple', name: 'Galu Devi', km: 2.3, hr: 10.5, cam: { dist: 520, h: 240, side: -240, look: 500, lookUp: 60 },
      code: 'Day 1 · Galu Devi · about 2,100 m', title: 'The temple on the <em>ridge</em>', deva: 'गलु देवी',
      stats: [['From town', '2.3', 'km', 'On the mapped trail'], ['Forest', 'Oak, deodar', '', 'And rhododendron']],
      body: ['The trail climbs out of town to the small <b>Galu Devi</b> temple, where the forest walk proper begins.',
             'Beyond it the path runs through oak, deodar and rhododendron, easy at first, then steeper.'],
      dl: [['Trek so far', '2.3 km']] },
    { id: 'triund', q: 'Triund', name: 'Triund', km: 9, hr: 17.5, cam: { yaw: -1.0, dist: 600, h: 200, side: 0, look: 1500, lookUp: 700 },
      code: 'Day 1 · Triund · 2,875 m', title: 'Camp under the <em>wall</em>', deva: 'त्रिउंड',
      stats: [['Today', '9', 'km', '3–5 h'], ['Last stretch', '22', 'curves', 'Steep switchbacks to the top']],
      body: ['The last climb is the "22 curves", steep switchbacks up to the grassy ridge of <b>Triund</b> at about 2,875 m.',
             'Camp faces the <b>Dhauladhar</b> range rising straight behind, with the valley falling away in front.'],
      dl: [['Night', 'Tents at Triund'], ['Trek so far', '9 km']] },
    { id: 'laka', q: 'Laka Got', name: 'Laka', km: 14, hr: 24 + 10.5, cam: { dist: 560, h: 220, side: -260, look: 900, lookUp: 400 },
      code: 'Day 2 · Laka', title: 'Up to the <em>snowline</em>', deva: 'लाका',
      stats: [['From Triund', '5', 'km', 'Via Snowline Cafe'], ['Beyond', 'Indrahar Pass', '', '4,342 m']],
      body: ['A morning walk up past <b>Snowline Cafe</b>, about 2 km from Triund, and on to <b>Laka</b> below the Dhauladhar wall.',
             'From here the trail continues to <b>Indrahar Pass</b>, with views of Mani Mahesh Kailash and the Pir Panjal range for those who go on.'],
      dl: [['Trek so far', '14 km']] },
    { id: 'return', q: 'McLeod Ganj', name: 'Back to McLeodganj', km: 27.95, hr: 24 + 17.5, cam: { dist: 900, h: 420, side: -320, look: 700, lookUp: 60 },
      code: 'Day 2 · McLeodganj · 1,785 m', title: 'All the way <em>down</em>', deva: 'वापसी',
      stats: [['Today', '19', 'km', '7–8 h in all'], ['Trek total', '28', 'km', 'Over 2 days']],
      body: ['Back down past Triund and Galu Devi to <b>McLeodganj</b>, usually by 6 p.m.',
             'A long day on the knees; take the 22 curves slowly on the way down.'],
      dl: [['Next', 'Back to Dharamshala']] },
  ],
  labels: [['McLeodganj', '1,785 m', 'mcleod'], ['Galu Devi', '2,095 m', 'galu'], ['Triund', '2,875 m', 'triund'], ['Laka', '3,140 m', 'laka'], ['Indrahar Pass', '4,342 m', 'indrahar']],
  farPeaks: [],   // beyond the Dhauladhar wall; the wall itself is the view, and it is real terrain
  props: [
    { type: 'village', at: 'mcleod', houses: 60, radius: 260 },
    { type: 'flags', at: 'mcleod', offset: [60, -40] },
    { type: 'temple', at: 'galu', offset: [15, 10] },
    { type: 'camp', at: 'triund', tents: 22, radius: 80, dining: '#3a8fd9' },
    { type: 'walkers', from: 6.5, to: 8.8 },
  ],
  // look: accent is set in index.html; sky mood: warm sunset over the valley
  theme: { sky: { dawn: { hor: '#f6b07a', sun: '#ffcf94' }, day: { zen: '#2c66b8' } } },
  // soundscape: prayer flags in town, a temple bell at Galu Devi, wind on the ridge
  sound: { bells: true, villages: [[0, 0.4, 1.6], [2.3, 0.3, 0.9], [26, 0.4, 2.0]], lakes: [], flags: [[0.3, 0.6]], wind: [2600, 3300] },
  climate: { alt: 1785, temp: 12 },
  profile: { min: 1500, max: 3600, peak: 3, marks: [['McLeodganj', 0], ['Galu Devi', 2.3], ['Triund', 9], ['Laka', 14], ['McLeodganj', 28]] },
};
