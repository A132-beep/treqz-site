// Dholkal (Bailadila): everything the engine needs that is specific to this trek.
// Route: Faraspal → Dholkal hilltop → back, 16 km there and back (Unexplored Bastar). The hilltop isn't in OpenStreetMap,
// so it is placed on the nearest high point of the cited 3,000 ft; the trail is traced over the terrain.
export default {
  id: 'dholkal',
  stages: [
    // opening shot: from behind Faraspal, facing south-west up to the Bailadila hills
    { id: 'hero', name: 'Overview', km: 0, hr: 9.0, cam: { yaw: 2.3, dist: 2500, h: 1000, side: 0, look: 4000, lookUp: 400 } },
    { id: 'faraspal', q: 'Dantewada', name: 'Faraspal', km: 0.05, hr: 9.0, cam: { dist: 600, h: 280, side: 240, look: 500, lookUp: 60 },
      code: 'Faraspal', title: 'Into the <em>Bailadila</em> hills', deva: 'फरसपाल',
      stats: [['From Jagdalpur', '~2', 'h', 'Leave at 7 am'], ['To the top', '~8', 'km', 'With a guide']],
      body: ['The walk starts at <b>Faraspal</b>, about two hours by road from Jagdalpur, with a local guide.',
             'Faraspal is said to take its name from the pharsa, the axe of Parashurama.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The forested hills to the south-west']] },
    { id: 'rock', q: 'Dholkal', name: 'Balancing Rock', km: 2.0, hr: 10.0, cam: { dist: 500, h: 220, side: -220, look: 500, lookUp: 80 },
      code: 'Balancing Rock', title: 'A quarter of the <em>way</em>', deva: 'संतुलित शिला',
      stats: [['About', '¼', '', 'Of the way up'], ['Then', 'Forest', '', 'And hillside']],
      body: ['About a quarter of the way up, the trail passes the <b>Balancing Rock</b>.'],
      dl: [['Trek so far', '~2 km']] },
    { id: 'summit', q: 'Dholkal', name: 'Dholkal', km: 8.0, hr: 12.0, cam: { dist: 420, h: 200, side: 200, look: 700, lookUp: 60 },
      code: 'Dholkal · 3,000 ft', title: 'The Ganesha on the <em>hill</em>', deva: 'ढोलकल',
      stats: [['Idol', '~3', 'ft', 'One stone'], ['Age', '10th–11th', 'c.', 'Naga dynasty']],
      body: ['A steep scramble over boulders for the last 150–250 m reaches the top of <b>Dholkal</b>, about 3,000 ft, where a Ganesha carved from a single stone sits on the rock.',
             'The stone is shaped like a dholak drum, which gives the hill its name.'],
      legend: 'Legend tells of a duel here between Ganesha and Parashurama, in which Ganesha lost a tooth.',
      dl: [['Altitude', '3,000 ft'], ['Trek so far', '8 km']] },
    { id: 'return', q: 'Dholkal', name: 'Back to Faraspal', km: 15.95, hr: 16.0, cam: { dist: 800, h: 380, side: -300, look: 600, lookUp: 60 },
      code: 'Faraspal', title: 'Down the <em>same way</em>', deva: 'वापसी',
      stats: [['Trek total', '16', 'km', 'There and back'], ['Found', '1934', '', 'By a geologist']],
      body: ['Down the same way to Faraspal. The idol was recorded in 1934 by the geologist Crookshank during the Bailadila mine survey, rediscovered in 2012, and restored by the Archaeological Survey of India after it was found broken in 2017.'],
      dl: [['Next', 'Back to Jagdalpur']] },
  ],
  labels: [['Faraspal', '', 'faraspal'], ['Dholkal', '3,000 ft', 'summit']],
  farPeaks: [],
  props: [
    { type: 'village', at: 'faraspal', houses: 30, radius: 200 },
    { type: 'walkers', from: 5.5, to: 7.8 },
  ],
  // look: accent is set in index.html; dry winter forest, no snow
  theme: { snow: 0, weather: 'clear', sky: { day: { zen: '#3c6fb0', hor: '#e2e2cf' } } },
  sound: { villages: [[0, 0.4, 1.5], [16, 0.4, 1.5]], lakes: [], wind: [700, 920] },
  climate: { alt: 360, temp: 27 },
  profile: { min: 200, max: 1100, peak: 1, marks: [['Faraspal', 0], ['Dholkal 3,000 ft', 8], ['Faraspal', 16]] },
};
