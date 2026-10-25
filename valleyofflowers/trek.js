// Valley of Flowers + Hemkund Sahib: everything the engine needs that is specific to this trek.
// Route follows the Bikat Adventures itinerary: Govindghat → Ghangaria 13 km → into the valley and back 10 km →
// Hemkund Sahib and back 10 km → Govindghat 13 km. Valley and Hemkund paths routed along OpenStreetMap;
// Govindghat to Ghangaria is traced over the terrain.
export default {
  id: 'valleyofflowers',
  stages: [
    // opening shot: from behind Govindghat, facing north-east up the Bhyundar valley
    { id: 'hero', name: 'Overview', km: 0, hr: 9.0, cam: { yaw: -1.0, dist: 3000, h: 1500, side: 0, look: 6000, lookUp: 1400 } },
    { id: 'govindghat', q: 'Govindghat', name: 'Govindghat', km: 0.05, hr: 9.0, cam: { dist: 700, h: 320, side: 280, look: 600, lookUp: 60 },
      code: 'Day 1 · Govindghat', title: 'Up the <em>Lakshman Ganga</em>', deva: 'गोविंदघाट',
      stats: [['Today', '13', 'km', 'About 6 h, to Ghangaria'], ['Shortcut', '−3', 'km', 'Drive on to Pulna']],
      body: ['The walk starts at <b>Govindghat</b> on the Alaknanda. Jeeps can take you on to <b>Pulna</b>, saving about 3 km.',
             'The trail climbs beside the Lakshman Ganga to <b>Ghangaria</b>, the base for both the valley and Hemkund.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The side valley to the right: the Valley of Flowers']] },
    { id: 'ghangaria', q: 'Ghangaria', name: 'Ghangaria', km: 13, hr: 15.5, cam: { dist: 600, h: 260, side: -260, look: 900, lookUp: 200 },
      code: 'Day 1 · Ghangaria', title: 'The last <em>village</em>', deva: 'घांघरिया',
      stats: [['Gain today', '+1,300', 'm', 'From Govindghat'], ['Nights', '3', '', 'All the high days start here']],
      body: ['<b>Ghangaria</b> is the base for the next two days. There is no camping inside the valley, so every walk is a round trip from here.'],
      dl: [['Night', 'Ghangaria (three nights)'], ['Trek so far', '13 km']] },
    { id: 'valley', q: 'Valley of Flowers National Park', name: 'Valley of Flowers', km: 18, hr: 24 + 11.0, cam: { yaw: -0.2, dist: 450, h: 260, side: 0, look: 2500, lookUp: 200 },
      code: 'Day 2 · Valley of Flowers', title: 'A valley in <em>bloom</em>', deva: 'फूलों की घाटी',
      stats: [['Today', '10', 'km', 'There and back'], ['Peak bloom', 'Jul–Aug', '', 'Mid-July to end of August']],
      body: ['Into the <b>Valley of Flowers</b>: meadows of <b>Brahma Kamal</b>, <b>Primula</b>, <b>Geranium</b>, <b>Marsh Marigold</b> and rhododendrons.',
             'It became a national park in 1982 and is a UNESCO World Heritage Site.'],
      dl: [['Night', 'Back in Ghangaria'], ['Trek so far', '18 km']] },
    { id: 'hemkund', q: 'Hemkund', name: 'Hemkund Sahib', km: 28, hr: 48 + 10.0, cam: { dist: 420, h: 180, side: -200, look: 500, lookUp: 80 },
      code: 'Day 3 · Hemkund Sahib · 4,329 m', title: 'The highest <em>gurudwara</em>', deva: 'हेमकुंड साहिब',
      stats: [['Today', '10', 'km', 'There and back, start 5 am'], ['Air', '61', '%', 'Of sea-level oxygen']],
      body: ['A steep early climb from Ghangaria to <b>Hemkund Sahib</b>, beside a glacial lake. It is the highest gurudwara of the Sikh community.',
             'Walkers start by 5 am and head down by 2 pm. The lake stays frozen for about six months of the year.'],
      dl: [['Altitude', '4,329 m (cited)'], ['Trek so far', '28 km']] },
    { id: 'return', q: 'Govindghat', name: 'Back to Govindghat', km: 45.95, hr: 72 + 14.0, cam: { dist: 900, h: 420, side: -320, look: 700, lookUp: 60 },
      code: 'Day 4 · Govindghat', title: 'Down the <em>same way</em>', deva: 'वापसी',
      stats: [['Today', '13', 'km', 'Downhill'], ['Trek total', '46', 'km', 'Over 4 days']],
      body: ['Back down beside the Lakshman Ganga to <b>Govindghat</b> and the road.'],
      dl: [['Next', 'The drive back down the Alaknanda']] },
  ],
  labels: [['Govindghat', '1,780 m', 'govindghat'], ['Ghangaria', '3,100 m', 'ghangaria'], ['Valley of Flowers', '3,500 m', 'valley'], ['Hemkund Sahib', '4,140 m', 'hemkund']],
  farPeaks: [],
  props: [
    { type: 'village', at: 'govindghat', houses: 40, radius: 250 },
    { type: 'village', at: 'ghangaria', houses: 30, radius: 160 },
    { type: 'lake', at: 'hemkund', radius: 120, frozen: false },
    { type: 'walkers', from: 24.5, to: 27.8 },
  ],
  // look: accent is set in index.html; monsoon green, no snow on the ground, soft clear light
  theme: { snow: 0, weather: 'clear', sky: { day: { zen: '#3a6aa8', hor: '#cfe0d8' } } },
  // soundscape: rushing river below Ghangaria, the lake at Hemkund
  sound: { villages: [[0, 0.4, 2.0], [13, 0.4, 1.5], [23, 0.4, 1.5], [33, 0.4, 1.5], [46, 0.4, 2.0]], lakes: [[6, 0.6], [28, 0.8]], wind: [3800, 4140] },
  climate: { alt: 3100, temp: 12 },
  profile: { min: 1500, max: 4400, peak: 4, marks: [['Govindghat', 0], ['Ghangaria', 13], ['Valley', 18], ['Ghangaria', 23], ['Hemkund 4,140 m', 28], ['Ghangaria', 33], ['Govindghat', 46]] },
};
