// Meesapulimala: everything the engine needs that is specific to this trek.
// Route: the KFDC base camp → Rhodo Valley → summit → back the same way (Kerala Tourism, Treks and Trails).
// The base camp isn't in OpenStreetMap, so it is placed at Silent Valley; the rest follows OpenStreetMap paths and tracks.
export default {
  id: 'meesapulimala',
  stages: [
    // opening shot: from behind the base camp, facing north-east to the summit ridge
    { id: 'hero', name: 'Overview', km: 0, hr: 6.5, cam: { yaw: -0.7, dist: 2500, h: 1100, side: 0, look: 5000, lookUp: 900 } },
    { id: 'basecamp', q: 'Munnar', name: 'Base camp', km: 0.05, hr: 6.5, cam: { dist: 600, h: 280, side: 240, look: 500, lookUp: 80 },
      code: 'Base camp · about 6,000 ft', title: 'Above <em>Munnar</em>', deva: 'ബേസ് ക്യാമ്പ്',
      stats: [['From Munnar', '24', 'km', 'Via Mattupetty'], ['Per night', '40', 'guests', 'At most']],
      body: ['The Kerala Forest Development Corporation\'s base camp, locally called Silent Valley Base Camp, sits at about 6,000 ft, 24 km from <b>Munnar</b> by road.',
             'Start early: the aim is to reach the summit by noon.'],
      dl: [['Trek so far', '0 km'], ['Look for', 'The long grassy ridge to the north-east']] },
    { id: 'rhodo', q: 'Meesapulimala', name: 'Rhodo Valley', km: 7.6, hr: 10.0, cam: { dist: 520, h: 220, side: -220, look: 700, lookUp: 150 },
      code: 'Rhodo Valley', title: 'Through the <em>rhododendrons</em>', deva: 'റോഡോ വാലി',
      stats: [['Last', '4x4', '', 'Point for jeeps'], ['On the way', 'Pandava cave', '', 'Below the valley']],
      body: ['Past the <b>Pandava cave</b>, where villagers believe the Pandavas sheltered in exile, the path reaches <b>Rhodo Valley</b> and its walkway lined with pines.',
             'KFDC also has tents and the Rhodo Mansion here.'],
      dl: [['Trek so far', '7.6 km on the map']] },
    { id: 'summit', q: 'Meesapulimala', name: 'Meesapulimala', km: 9.32, hr: 12.0, cam: { dist: 420, h: 200, side: 200, look: 700, lookUp: 60 },
      code: 'Meesapulimala · 2,640 m', title: 'The <em>whiskered tiger</em>', deva: 'മീശപ്പുലിമല',
      stats: [['Rank', '2nd', '', 'Highest in the Western Ghats'], ['In view', 'Anamudi', '', 'The highest']],
      body: ['The top of <b>Meesapulimala</b>, 2,640 m, second only to Anamudi in the Western Ghats. Anamudi is in view, with the Mattupetty and Anayirangal reservoirs.',
             'Nilgiri tahr, sambar and gaur graze these grasslands.'],
      legend: 'Meesa, puli, mala: moustache, tiger, hill. From the south-west the mountain looks like a whiskered big cat.',
      dl: [['Altitude', '2,640 m'], ['Trek so far', '9.3 km on the map']] },
    { id: 'return', q: 'Munnar', name: 'Back to base camp', km: 18.6, hr: 17.0, cam: { dist: 800, h: 380, side: -300, look: 600, lookUp: 60 },
      code: 'Base camp', title: 'Back the <em>same way</em>', deva: 'മടക്കം',
      stats: [['Trek total', '18.6', 'km', 'On the map'], ['Guide', 'Included', '', 'With KFDC']],
      body: ['Down past Rhodo Valley to the base camp, and the drive back to Munnar.'],
      dl: [['Next', 'Munnar']] },
  ],
  labels: [['Base camp', '', 'basecamp'], ['Rhodo Valley', '', 'rhodo'], ['Meesapulimala', '2,640 m', 'summit']],
  farPeaks: [],
  props: [
    { type: 'camp', at: 'basecamp', tents: 16, radius: 60, dining: '#3a8fd9' },
    { type: 'camp', at: 'rhodo', offset: [40, -30], tents: 8, radius: 35, dining: '#f2a33a' },
    { type: 'walkers', from: 7.9, to: 9.2 },
  ],
  // look: accent is set in index.html; misty green grassland, no snow
  theme: { snow: 0, weather: 'clear', sky: { day: { zen: '#3a6aa8', hor: '#d6e6e2' } } },
  sound: { villages: [[0, 0.3, 0.8], [18.6, 0.3, 0.8]], lakes: [], wind: [2200, 2640] },
  climate: { alt: 1800, temp: 16 },
  profile: { min: 1400, max: 2800, peak: 2, marks: [['Base camp', 0], ['Rhodo Valley', 7.6], ['Meesapulimala 2,640 m', 9.32], ['Base camp', 18.6]] },
};
