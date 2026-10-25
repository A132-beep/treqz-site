// Kudremukh: everything the engine needs that is specific to this trek.
// Route follows the Bikat Adventures itinerary: Mullodi forest office → Kudremukh peak and back in one day.
// Trail from the OpenStreetMap hiking route "Kudremukh Trek"; distances measured on the map.
export default {
  id: 'kudremukh',
  stages: [
    // opening shot: from behind the forest office, facing south-west up the grassland to the peak
    { id: 'hero', name: 'Overview', km: 0, hr: 8.5, cam: { yaw: 2.6, dist: 2500, h: 1100, side: 0, look: 4000, lookUp: 600 } },
    { id: 'forestoffice', q: 'Kudremukh', name: 'Mullodi', km: 0.05, hr: 9.0, cam: { dist: 600, h: 280, side: 240, look: 500, lookUp: 60 },
      code: 'Day 2 · Mullodi forest office', title: 'Into the <em>national park</em>', deva: 'ಮುಳ್ಳೋಡಿ',
      stats: [['Start', '9', 'am', 'With a local guide'], ['Limit', '50', 'a day', 'Booked online']],
      body: ['After the overnight bus from Bangalore, the walk starts at the forest office above <b>Mullodi</b>, near the Somavathi falls.',
             'Only 50 trekkers a day are allowed, each group with a licensed local guide.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The grassy ridges climbing south-west to the peak']] },
    { id: 'ontimara', q: 'Kudremukh', name: 'Ontimara', km: 4.35, hr: 11.0, cam: { dist: 520, h: 220, side: -220, look: 600, lookUp: 100 },
      code: 'Day 2 · Ontimara', title: 'The <em>lone tree</em>', deva: 'ಒಂಟಿಮರ',
      stats: [['Halfway', '~4.4', 'km', 'On the mapped trail'], ['Just before', 'Lobo\'s House', '', 'A ruin']],
      body: ['Out of the shola forest and into open grassland. Past the ruin of <b>Lobo\'s House</b> stands <b>Ontimara</b>, the lone tree that marks halfway.'],
      dl: [['Trek so far', '4.4 km']] },
    { id: 'peak', q: 'Kudremukh', name: 'Kudremukh', km: 8.25, hr: 13.0, cam: { dist: 420, h: 200, side: 200, look: 700, lookUp: 60 },
      code: 'Day 2 · Kudremukh · 1,892 m', title: 'The <em>horse face</em>', deva: 'ಕುದುರೆಮುಖ',
      stats: [['Climb', '+780', 'm', 'From the forest office'], ['Rivers', '3', '', 'Tunga, Bhadra, Nethravathi']],
      body: ['A last climb past a spring to the top of <b>Kudremukh</b>, 1,892 m. The name means "horse-faced" in Kannada, for one side of the mountain.',
             'The Tunga, Bhadra and Nethravathi rivers are said to rise in these hills.'],
      legend: 'The mountain was once called Samseparvata, after the approach from Samse village.',
      dl: [['Altitude', '1,892 m'], ['Trek so far', '8 km']] },
    { id: 'return', q: 'Kudremukh', name: 'Back to Mullodi', km: 16.45, hr: 18.0, cam: { dist: 800, h: 380, side: -300, look: 600, lookUp: 60 },
      code: 'Day 2 · Mullodi', title: 'Out before <em>dark</em>', deva: 'ವಾಪಸ್',
      stats: [['Back by', '~6', 'pm', 'Past the checkpost by 5:30'], ['Trek total', '16.5', 'km', 'On the mapped trail']],
      body: ['Down the same way to the forest office. Everyone must be back past the checkpost by 5:30 pm.'],
      dl: [['Next', 'Overnight bus to Bangalore']] },
  ],
  labels: [['Mullodi', '', 'mullodi'], ['Lobo\'s House', '', 'lobo'], ['Ontimara', '', 'ontimara'], ['Kudremukh', '1,892 m', 'peak']],
  farPeaks: [],
  props: [
    { type: 'village', at: 'mullodi', houses: 15, radius: 150 },
    { type: 'walkers', from: 5.5, to: 8.0 },
  ],
  // look: accent is set in index.html; monsoon-green grassland, no snow
  theme: { snow: 0, weather: 'clear', sky: { day: { zen: '#3c70b2', hor: '#d4e6d8' } } },
  sound: { villages: [[0, 0.4, 1.0], [16.5, 0.4, 1.0]], lakes: [[0, 0.5]], wind: [1500, 1892] },
  climate: { alt: 1100, temp: 22 },
  profile: { min: 800, max: 2000, peak: 1, marks: [['Forest office', 0], ['Kudremukh 1,892 m', 8.25], ['Forest office', 16.5]] },
};
