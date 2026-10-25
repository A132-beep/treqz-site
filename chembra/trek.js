// Chembra: everything the engine needs that is specific to this trek.
// Route: the trail start above Meppadi → the heart lake → back. The forest department currently restricts the ridge
// beyond the lake (DTPC Wayanad), so the journey stops at the lake and shows the summit from there.
// Trail from OpenStreetMap; distances measured on the map.
export default {
  id: 'chembra',
  stages: [
    // opening shot: from behind the trail start, facing south up the ridge to the summit
    { id: 'hero', name: 'Overview', km: 0, hr: 7.5, cam: { yaw: 1.43, dist: 2200, h: 900, side: 0, look: 4000, lookUp: 900 } },
    { id: 'start', q: 'Chembra Peak', name: 'Trail start', km: 0.05, hr: 7.5, cam: { dist: 500, h: 240, side: 200, look: 400, lookUp: 60 },
      code: 'Chembra · trail start', title: 'Above the <em>tea estates</em>', deva: 'ചെമ്പ്ര',
      stats: [['Entry', '7', 'am', 'Until 3 pm'], ['Walk', '~45', 'min', 'To the lake']],
      body: ['Vehicles stop at the forest office above <b>Meppadi</b>; a jeep goes on to the start. From here it is a guided walk up open grassland.',
             'Tea and coffee estates spread over the slopes below.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The grassy ridge rising south to Chembra, 2,100 m']] },
    { id: 'lake', q: 'Chembra Peak', name: 'Heart lake', km: 1.37, hr: 8.5, cam: { yaw: 1.45, dist: 450, h: 220, side: 120, look: 2500, lookUp: 500 },
      code: 'Chembra · Hridaya Thadakam', title: 'A lake shaped like a <em>heart</em>', deva: 'ഹൃദയതടാകം',
      stats: [['Never', 'Dry', '', 'In any summer'], ['Beyond', 'Closed', '', 'Wildlife activity']],
      body: ['The trail reaches <b>Hridaya Thadakam</b>, the heart-shaped lake, which does not dry out in any summer.',
             'The ridge beyond, up to <b>Chembra</b> at 2,100 m, the highest peak in Wayanad, is currently restricted because of wildlife activity.'],
      legend: 'Local legend says the goddess Sita bathed in this lake.',
      dl: [['Trek so far', '1.4 km on the map']] },
    { id: 'return', q: 'Chembra Peak', name: 'Back to the start', km: 2.7, hr: 10.0, cam: { dist: 700, h: 340, side: -280, look: 500, lookUp: 60 },
      code: 'Chembra · trail start', title: 'Down by <em>mid-morning</em>', deva: 'മടക്കം',
      stats: [['Trek total', '2.7', 'km', 'On the map'], ['Fee', '₹4,000', '', 'Up to 5 people']],
      body: ['Back down the same way to the start and the jeep to the forest office.'],
      dl: [['Next', 'Meppadi']] },
  ],
  labels: [['Heart lake', '', 'lake'], ['Chembra', '2,100 m', 'peak']],
  farPeaks: [],
  props: [
    { type: 'lake', at: 'lake', radius: 40, frozen: false },
    { type: 'walkers', from: 0.4, to: 1.3 },
  ],
  // look: accent is set in index.html; green grassland, no snow
  theme: { snow: 0, weather: 'clear', sky: { day: { zen: '#3a6aa8', hor: '#d2e4da' } } },
  sound: { villages: [[0, 0.3, 0.6]], lakes: [[1.37, 0.6]], wind: [1300, 2100] },
  climate: { alt: 1030, temp: 22 },
  profile: { min: 800, max: 1600, peak: 1, marks: [['Start', 0], ['Heart lake', 1.37], ['Start', 2.7]] },
};
