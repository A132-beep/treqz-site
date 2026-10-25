// Nag Tibba: everything the engine needs that is specific to this trek.
// Route follows the Bikat Adventures itinerary: Pantwari → Nag Mandir campsite 5.5 km → summit 2 km and back → Pantwari.
// Trail routed along OpenStreetMap paths; Nag Mandir placed where the trail reaches its cited 2,325 m.
export default {
  id: 'nagtibba',
  stages: [
    // opening shot: from behind Pantwari, facing north-east toward the Bandarpoonch range
    { id: 'hero', name: 'Overview', km: 0, hr: 11.0, cam: { yaw: -0.9, dist: 3000, h: 1400, side: 0, look: 6000, lookUp: 1200 } },
    { id: 'pantwari', q: 'Nag Tibba trek', name: 'Pantwari', km: 0.05, hr: 11.0, cam: { dist: 700, h: 320, side: 280, look: 600, lookUp: 60 },
      code: 'Day 1 · Pantwari · 1,400 m', title: 'A weekend <em>summit</em>', deva: 'पंतवाड़ी',
      stats: [['From Dehradun', '~90', 'km', '3–4 h, via Mussoorie'], ['Trek', '3', 'days', 'Pantwari to Pantwari']],
      body: ['The road from Dehradun climbs past <b>Mussoorie</b> and <b>Kempty Falls</b> to <b>Pantwari</b>, a village at about 1,400 m. You arrive before noon and start walking straight away.',
             'It is a snow summit you can climb over a long weekend.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The forested ridge to the east: the summit is at its top']] },
    { id: 'nagmandir', q: 'Nag Tibba', name: 'Nag Mandir', km: 5.5, hr: 15.5, cam: { dist: 560, h: 260, side: -260, look: 500, lookUp: 40 },
      code: 'Day 1 · Nag Mandir · 2,325 m', title: 'The serpent <em>temple</em>', deva: 'नाग मंदिर',
      stats: [['Gain today', '+925', 'm', '5.5 km · 4–5 h'], ['Night low', '−7', '°C', 'In winter']],
      body: ['A steady climb through forest brings you to a clearing with the small <b>Nag Mandir</b> temple at its centre. Camp is pitched around it.',
             'In heavy winter snow, groups camp at <b>Khatian</b>, about 2 km lower, instead.'],
      legend: 'Nag Tibba means "the serpent\'s peak". This mountain is said to be the home of the serpent god, Nag Devta, whose temple stands in the clearing.',
      dl: [['Night', 'Tents by the temple'], ['Trek so far', '5.5 km']] },
    { id: 'summit', q: 'Nag Tibba snow', name: 'Nag Tibba', km: 7.5, hr: 24 + 8.5, cam: { yaw: -0.95, dist: 330, h: 120, side: 0, look: 3000, lookUp: -150 },
      code: 'Day 2 · Nag Tibba · 3,022 m', title: 'The serpent\'s <em>peak</em>', deva: 'नाग टिब्बा',
      stats: [['From camp', '+700', 'm', '2 km · 2–3 h'], ['Air', '69', '%', 'Of sea-level oxygen']],
      body: ['An early start, and a 2 km climb up the final ridge to the top of <b>Nag Tibba</b> at 3,022 m.',
             'On a clear morning the snow peaks line the north: <b>Swargarohini</b>, <b>Bandarpoonch</b> and <b>Black Peak</b>, with <b>Nanda Devi</b> far to the east.'],
      dl: [['Altitude', '3,022 m'], ['Trek so far', '7.5 km']] },
    { id: 'return', q: 'Pantwari', name: 'Back to Pantwari', km: 14.95, hr: 48 + 11.0, cam: { dist: 1000, h: 460, side: -320, look: 700, lookUp: 60 },
      code: 'Day 3 · Pantwari · 1,400 m', title: 'Down by <em>lunch</em>', deva: 'वापसी',
      stats: [['Today', '5.5', 'km', '3–4 h, downhill'], ['Trek total', '15', 'km', 'Over 3 days']],
      body: ['Back down through the forest to <b>Pantwari</b> by early afternoon.',
             'The drive to Dehradun takes about four hours; plan to arrive late evening.'],
      dl: [['Next', 'Drive back to Dehradun']] },
  ],
  labels: [['Pantwari', '1,400 m', 'pantwari'], ['Nag Mandir', '2,325 m', 'nagmandir'], ['Nag Tibba', '3,022 m', 'summit']],
  farPeaks: [
    { name: 'Swargarohini', alt: 6252, th: -0.97, r: 67000 },
    { name: 'Bandarpoonch', alt: 6316, th: -0.84, r: 62000 },
  ],
  props: [
    { type: 'village', at: 'pantwari', houses: 30, radius: 200 },
    { type: 'temple', at: 'nagmandir', offset: [24, -10] },
    { type: 'camp', at: 'nagmandir', offset: [-30, 25], tents: 14, radius: 50, dining: '#3a8fd9' },
    { type: 'walkers', from: 6.0, to: 7.4 },
  ],
  // look: accent is set in index.html; sky mood: a deep, star-filled winter night over the camp
  theme: { sky: { night: { zen: '#040919', hor: '#121d3d' }, dawn: { zen: '#2a3d82', hor: '#e2b0a4' } } },
  // soundscape: temple bells at the camp as well as the village
  sound: { bells: true, villages: [[0, 0.4, 2.0], [5.5, 0.3, 1.0], [9.5, 0.3, 1.0], [15, 0.4, 2.0]], lakes: [], wind: [2500, 3022] },
  climate: { alt: 1400, temp: 10 },
  profile: { min: 1000, max: 3400, peak: 2, marks: [['Pantwari', 0], ['Nag Mandir', 5.5], ['Nag Tibba 3,022 m', 7.5], ['Nag Mandir', 9.5], ['Pantwari', 15]] },
};
