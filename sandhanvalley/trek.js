// Sandhan Valley: everything the engine needs that is specific to this trek.
// Route follows the Bikat Adventures itinerary: Samrad → down the gorge → camp → Dehene.
// The gorge is not mapped as a path, so the line is traced over the terrain; it is far coarser than the real 3 m-wide canyon.
export default {
  id: 'sandhanvalley',
  stages: [
    // opening shot: from behind Samrad, facing south-west down the valley
    { id: 'hero', name: 'Overview', km: 0, hr: 8.0, cam: { yaw: 2.15, dist: 2500, h: 1000, side: 0, look: 4000, lookUp: 0 } },
    { id: 'samrad', q: 'Sandhan Valley', name: 'Samrad', km: 0.05, hr: 8.0, cam: { dist: 600, h: 280, side: 240, look: 500, lookUp: 40 },
      code: 'Day 2 · Samrad', title: 'Into the <em>gorge</em>', deva: 'साम्रद',
      stats: [['Start', '8', 'am', 'After breakfast'], ['Arrived', '2', 'am', 'After 4 h from Kasara']],
      body: ['The group reaches <b>Samrad</b> in the small hours and rests. After breakfast the walk drops straight into the gorge.',
             'Peaks ring the valley: Alang, Madan, Kulang, Ratangad and Kalsubai.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The dark cleft running south-west from the village']] },
    { id: 'gorge', q: 'Sandhan Valley', name: 'The gorge', km: 1.5, hr: 11.0, cam: { dist: 360, h: 140, side: -160, look: 400, lookUp: 0 },
      code: 'Day 2 · The Valley of Shadows', title: 'Where the sun <em>doesn\'t reach</em>', deva: 'सांदण दरी',
      stats: [['Walls', '~200', 'ft', 'Deep'], ['Narrowest', '3', 'm', 'Wide']],
      body: ['The walls close in: about 200 ft deep and in places 3 m apart, so little sunlight reaches the floor.',
             'The way down crosses boulders "the size of your bedroom", pools of waist-deep to shoulder-deep water, and rappels down rock and waterfalls.'],
      dl: [['Rappels', '4 sites'], ['Trek so far', '1.5 km']] },
    { id: 'camp', q: 'Sandhan Valley', name: 'Camp', km: 4.8, hr: 17.0, cam: { dist: 600, h: 260, side: 240, look: 600, lookUp: 60 },
      code: 'Day 2 · Camp', title: 'Out of the <em>shadows</em>', deva: 'तंबू',
      stats: [['Valley floor', '3', 'pm', 'Lunch by the river'], ['Camp', '5', 'pm', 'Tents']],
      body: ['By about 3 pm the gorge opens onto the valley floor. Lunch by the river, then on to camp by 5 pm.'],
      dl: [['Night', 'Tents'], ['Trek so far', '~5 km']] },
    { id: 'dehene', q: 'Sandhan Valley', name: 'Dehene', km: 6.7, hr: 24 + 9.5, cam: { dist: 800, h: 380, side: -300, look: 600, lookUp: 40 },
      code: 'Day 3 · Dehene', title: 'An easy <em>walk out</em>', deva: 'देहेणे',
      stats: [['Walk', '~2', 'h', 'Flat'], ['Kasara by', '1', 'pm', 'By road']],
      body: ['A flat walk of about two hours to <b>Dehene</b>, where vehicles wait for the drive back to Kasara.'],
      dl: [['Next', 'Kasara station']] },
  ],
  labels: [['Samrad', '', 'samrad'], ['Dehene', '', 'dehene']],
  farPeaks: [],
  props: [
    { type: 'village', at: 'samrad', houses: 25, radius: 150 },
    { type: 'village', at: 'dehene', houses: 25, radius: 150 },
    { type: 'walkers', from: 0.6, to: 2.6 },
  ],
  // look: accent is set in index.html; dry green after the monsoon, no snow
  theme: { snow: 0, weather: 'clear', sky: { day: { zen: '#3f73b5', hor: '#dde6d6' } } },
  // soundscape: water through the gorge
  sound: { villages: [[0, 0.4, 1.0], [6.7, 0.4, 1.2]], lakes: [[2.2, 1.6]], wind: [900, 1000] },
  climate: { alt: 750, temp: 24 },
  profile: { min: 0, max: 1000, peak: 0, marks: [['Samrad', 0], ['Gorge', 1.5], ['Camp', 4.8], ['Dehene', 6.7]] },
};
