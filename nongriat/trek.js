// Nongriat: everything the engine needs that is specific to this trek.
// Route: Tyrna → down the steps → long root bridge → Double Decker root bridge at Nongriat → Rainbow Falls → back to Tyrna.
// Trail and bridges from OpenStreetMap; distances measured on the map.
export default {
  id: 'nongriat',
  stages: [
    // opening shot: from behind Tyrna, looking down into the gorge to the north-west
    { id: 'hero', name: 'Overview', km: 0, hr: 8.0, cam: { yaw: -2.24, dist: 2000, h: 900, side: 0, look: 3000, lookUp: -200 } },
    { id: 'tyrna', q: 'Nongriat', name: 'Tyrna', km: 0.05, hr: 8.0, cam: { dist: 500, h: 240, side: 200, look: 400, lookUp: 0 },
      code: 'Tyrna', title: 'The top of the <em>steps</em>', deva: 'Tyrna',
      stats: [['Steps', '3,000+', '', 'Down into the gorge'], ['To the foot', '~45', 'min', 'Of the staircase']],
      body: ['The walk starts at <b>Tyrna</b>, about 15 km from Sohra, at the top of a staircase of 3,000 or more steps.',
             'About 45 minutes down, the steps end in the forest by the river.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The deep green gorge below the village']] },
    { id: 'longbridge', q: 'Living root bridge', name: 'Long root bridge', km: 1.27, hr: 9.0, cam: { dist: 360, h: 150, side: -160, look: 300, lookUp: 0 },
      code: 'The first bridge', title: 'A bridge that <em>grew</em>', deva: 'Jingkieng',
      stats: [['Made of', 'Roots', '', 'Of the rubber fig'], ['Grown by', 'Khasi', '', 'And Jaintia people']],
      body: ['The first living root bridge. Khasi and Jaintia people guide the aerial roots of the rubber fig, <i>Ficus elastica</i>, across a stream until they grow strong enough to walk on.'],
      dl: [['Trek so far', '1.3 km on the map']] },
    { id: 'doubledecker', q: 'Nongriat', name: 'Double Decker', km: 2.65, hr: 10.0, cam: { dist: 360, h: 150, side: 160, look: 300, lookUp: 0 },
      code: 'Nongriat · Double Decker', title: 'Two bridges, <em>one tree</em>', deva: 'Jingkieng Nongriat',
      stats: [['Age', '~200', 'years', 'Estimated'], ['Rain', '9,498', 'mm', 'A year']],
      body: ['At <b>Nongriat</b> two root bridges are stacked one above the other: the Double Decker, <b>Jingkieng Nongriat</b>, thought to be about 200 years old.',
             'It appeared in the BBC series Human Planet. Nongriat gets about 9,500 mm of rain a year.'],
      dl: [['Trek so far', '2.7 km on the map']] },
    { id: 'rainbow', q: 'Rainbow Falls Meghalaya', name: 'Rainbow Falls', km: 4.87, hr: 11.5, cam: { dist: 420, h: 180, side: -180, look: 400, lookUp: 40 },
      code: 'Rainbow Falls', title: 'Beyond the <em>village</em>', deva: 'Rainbow Falls',
      stats: [['From Nongriat', '~1', 'h', 'Further up the valley'], ['Then', 'Back', '', 'The same way']],
      body: ['About an hour beyond the Double Decker, past more root bridges, the path reaches <b>Rainbow Falls</b>.'],
      dl: [['Trek so far', '4.9 km on the map']] },
    { id: 'return', q: 'Nongriat', name: 'Back to Tyrna', km: 9.2, hr: 15.0, cam: { dist: 700, h: 340, side: -280, look: 500, lookUp: 60 },
      code: 'Tyrna', title: 'The climb <em>out</em>', deva: 'Tyrna',
      stats: [['Hardest part', 'Up', '', 'The steps back to Tyrna'], ['Trek total', '9.3', 'km', 'On the map']],
      body: ['Back past the Double Decker and up the long staircase to <b>Tyrna</b>: the hard part of the day.'],
      dl: [['Next', 'Back to Sohra']] },
  ],
  labels: [['Tyrna', '', 'tyrna'], ['Root bridge', '', 'longbridge'], ['Double Decker', '', 'doubledecker'], ['Rainbow Falls', '', 'rainbow']],
  farPeaks: [],
  props: [
    { type: 'village', at: 'tyrna', houses: 30, radius: 160 },
    { type: 'village', at: 'doubledecker', houses: 12, radius: 80 },
    { type: 'walkers', from: 1.6, to: 2.5 },
  ],
  // look: accent is set in index.html; deep green forest, no snow
  theme: { snow: 0, weather: 'clear', sky: { day: { zen: '#3a6aa8', hor: '#d2e4da' } } },
  // soundscape: the river under every bridge, the falls
  sound: { villages: [[0, 0.4, 1.0], [2.65, 0.2, 0.6], [9.2, 0.4, 1.0]], lakes: [[1.27, 0.6], [2.65, 0.7], [4.87, 0.9], [7.05, 0.7]], wind: [900, 1000] },
  climate: { alt: 735, temp: 22 },
  profile: { min: 200, max: 900, peak: 0, marks: [['Tyrna', 0], ['Root bridge', 1.27], ['Double Decker', 2.65], ['Rainbow Falls', 4.87], ['Tyrna', 9.2]] },
};
