// Beas Kund: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). Route follows the Bikat Adventures itinerary: Dhundi → Bakarthach 4 km → Beas Kund and back 12 km → Dhundi 4 km.
export default {
  id: "beaskund",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 10.5, "cam": {"yaw": 2.96, "dist": 3000, "h": 1500, "side": 0, "look": 6000, "lookUp": 1300}},
    {"id": "dhundi", "q": "Solang Valley", "name": "Dhundi", "km": 0.05, "hr": 10.5, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 1 · Dhundi", "title": "Up the <em>Solang</em> valley", "deva": "धुंधी", "stats": [["From Manali", "21", "km", "By road, via Solang"], ["Walk today", "4", "km", "3–4 h to camp"]], "body": ["The drive from Manali runs up the Solang valley to <b>Dhundi</b>, where the walk begins.", "Today is short: an easy first climb to the meadow camp at Bakarthach."], "dl": [["Trek so far", "0 km"], ["Look for", "The valley closing in to the west, toward the source of the Beas"]]},
    {"id": "bakarthach", "q": "Bakarthach", "name": "Bakarthach", "km": 3.98, "hr": 14.5, "cam": {"dist": 560, "h": 260, "side": -260, "look": 500, "lookUp": 40}, "code": "Day 1 · Bakarthach · 3,270 m", "title": "A meadow <em>camp</em>", "deva": "बकरथाच", "stats": [["Today", "4", "km", "3–4 h"], ["Camp", "3,270", "m", "Two nights here"]], "body": ["The trail climbs out of the trees to <b>Bakarthach</b>, an open meadow camp below the big peaks.", "Tomorrow is the long day to the lake and back."], "dl": [["Night", "Tents at Bakarthach"], ["Trek so far", "4 km"]]},
    {"id": "lake", "q": "Beas Kund", "name": "Beas Kund", "km": 9.91, "hr": 35.0, "cam": {"yaw": 2.56, "dist": 330, "h": 120, "side": 0, "look": 3000, "lookUp": 400}, "code": "Day 2 · Beas Kund · 3,700 m", "title": "Where the Beas <em>begins</em>", "deva": "ब्यास कुंड", "stats": [["There and back", "12", "km", "6–7 h"], ["Under", "Hanuman Tibba", "", "5,982 m, to the west"]], "body": ["Past river crossings and over boulders of old moraine, the trail reaches <b>Beas Kund</b>, the glacial lake at the source of the Beas river.", "The lake is the base camp for <b>Friendship Peak</b>, Ladakhi and Shitidhar, and for the steep pyramid of <b>Hanuman Tibba</b>."], "legend": "Beas Kund is said to be where the sage Vyas, author of the Mahabharata, bathed while he meditated, and the river that begins here carries his name.", "dl": [["Altitude", "3,700 m (Hindi Wikipedia says about 4,000 m)"], ["Trek so far", "10 km"]]},
    {"id": "return", "q": "Manali", "name": "Back to Dhundi", "km": 19.95, "hr": 58.0, "cam": {"dist": 1000, "h": 460, "side": -320, "look": 700, "lookUp": 60}, "code": "Day 3 · Dhundi", "title": "Down to the <em>valley</em>", "deva": "वापसी", "stats": [["Today", "4", "km", "3–4 h"], ["Trek total", "20", "km", "Over 3 days"]], "body": ["A short walk back down to Dhundi, then the drive to Manali.", "Groups are usually back at the Manali bus stand by afternoon."], "dl": [["Next", "Drive back to Manali"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Dhundi", "3,150 m", "dhundi"], ["Bakarthach", "3,270 m", "bakarthach"], ["Beas Kund", "3,700 m", "beas_kund"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [{"name": "Hanuman Tibba", "alt": 5982, "th": 2.84, "r": 6354}, {"name": "Friendship Peak", "alt": 5289, "th": -1.498, "r": 4197}, {"name": "Indrasan", "alt": 6221, "th": 0.535, "r": 31738}, {"name": "Deo Tibba", "alt": 6001, "th": 0.611, "r": 31734}],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "dhundi", "houses": 8, "radius": 160}, {"type": "camp", "at": "bakarthach", "tents": 12, "radius": 50, "dining": "#3a8fd9"}, {"type": "lake", "at": "beas_kund", "radius": 40, "frozen": false}, {"type": "walkers", "from": 7.41, "to": 9.71}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"sky": {"dawn": {"hor": "#dfb8a8"}, "day": {"zen": "#2b62c0", "hor": "#c6dcee"}}, "snow": 0.2, "weather": "clear"},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"villages": [[0.0, 0.4, 2.0], [19.96, 0.4, 2.0]], "lakes": [[9.9, 0.9]], "wind": [2785, 3685]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 2907, "temp": 12},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 2500, "max": 4000, "peak": 2, "marks": [["Dhundi", 0], ["Bakarthach", 3.98], ["Beas Kund 3,700 m", 9.91], ["Dhundi", 20.0]]},
};
