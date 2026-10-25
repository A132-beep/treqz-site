// Kalsubai: everything the engine needs that is specific to this trek.
// Route follows the Bikat Adventures itinerary: Bari → summit by night (13 km there and back), sunrise on top.
// OpenStreetMap does not map the trail, so it is traced over the terrain along the ridge from Bari.
export default {
  id: 'kalsubai',
  stages: [
    // opening shot: from behind Bari, facing south-west up the ridge to the summit
    { id: 'hero', name: 'Overview', km: 0, hr: 18.3, cam: { yaw: 2.5, dist: 2500, h: 1100, side: 0, look: 4000, lookUp: 700 } },
    { id: 'bari', q: 'Kalsubai', name: 'Bari', km: 0.05, hr: 21.5, cam: { dist: 600, h: 280, side: 240, look: 500, lookUp: 60 },
      code: 'Day 1 · Bari', title: 'A climb by <em>torchlight</em>', deva: 'बारी',
      stats: [['From Kasara', 'By road', '', 'After the train from Mumbai'], ['Tonight', '6.5', 'km', 'Up, in the dark']],
      body: ['Train from Mumbai to <b>Kasara</b>, then the drive to <b>Bari</b>, the base village. Dinner, and then the climb starts in the dark.',
             'There is a Kalsubai temple near the start of the trail and another on the summit.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The ridge rising south-west: the summit is at its top']] },
    { id: 'summit', q: 'Kalsubai', name: 'Kalsubai', km: 6.5, hr: 24 + 6.3, cam: { dist: 420, h: 200, side: -200, look: 600, lookUp: 60 },
      code: 'Day 2 · Kalsubai · 1,646 m', title: 'Sunrise over <em>Maharashtra</em>', deva: 'कळसूबाई',
      stats: [['Ladders', '7–8', '', 'Iron, with railings'], ['Climb', '820', 'm', 'From the base']],
      body: ['Up the last steep section on iron ladders to the summit temple of <b>Kalsubai</b>, at 1,646 m the highest point in Maharashtra, in time for sunrise.',
             'Around you stand the forts of Alang, Madan, Kulang, Ratangad and Ajoba, and Arthur Lake at Bhandardara lies about 6 km away.'],
      legend: 'The peak is named after Kalsubai, one of three sisters. Ratangad, nearby, takes its name from another, Ratnabai.',
      dl: [['Altitude', '1,646 m'], ['Trek so far', '6.5 km']] },
    { id: 'return', q: 'Kalsubai', name: 'Back to Bari', km: 12.95, hr: 24 + 10.5, cam: { dist: 800, h: 380, side: -300, look: 600, lookUp: 60 },
      code: 'Day 2 · Bari', title: 'Down in <em>daylight</em>', deva: 'वापसी',
      stats: [['Leave the top', '8', 'am', 'After breakfast'], ['Trek total', '13', 'km', 'There and back']],
      body: ['Breakfast on top, then down by 8 am to <b>Bari</b> and the drive back to Kasara.'],
      dl: [['Next', 'Kasara station']] },
  ],
  labels: [['Bari', '', 'bari'], ['Kalsubai', '1,646 m', 'summit']],
  farPeaks: [],
  props: [
    { type: 'village', at: 'bari', houses: 30, radius: 200 },
    { type: 'temple', at: 'summit', offset: [0, 0] },
    { type: 'walkers', from: 3.5, to: 6.3 },
  ],
  // look: accent is set in index.html; green after the rains, no snow
  theme: { snow: 0, weather: 'clear', sky: { day: { zen: '#3f73b5', hor: '#d6e6dc' } } },
  sound: { bells: true, villages: [[0, 0.4, 1.5], [13, 0.4, 1.5]], lakes: [], wind: [1300, 1650] },
  climate: { alt: 850, temp: 24 },
  profile: { min: 600, max: 1800, peak: 1, marks: [['Bari', 0], ['Kalsubai 1,646 m', 6.5], ['Bari', 13]] },
};
