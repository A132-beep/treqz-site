// Prashar Lake: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). Route follows Bikat Adventures' 2-day plan: Bagi → Prashar Lake 7 km → Sukhasar and back (4 km) → Bagi (18 km).
export default {
  id: "prashar",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 10.5, "cam": {"yaw": -1.01, "dist": 3000, "h": 1500, "side": 0, "look": 6000, "lookUp": 1300}},
    {"id": "bagi", "q": "Mandi Himachal village", "name": "Bagi", "km": 0.05, "hr": 10.5, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 1 · Bagi", "title": "Above <em>Mandi</em>", "deva": "बग्गी", "stats": [["From Mandi", "24–27", "km", "2–2.5 h by road"], ["Today", "7", "km", "5–6 h up"]], "body": ["The 8 a.m. HRTC bus from Mandi reaches <b>Bagi</b> by about 10:30.", "From the village the trail climbs steadily through 4 km of forest, then meadows."], "dl": [["Trek so far", "0 km"], ["Note", "A road now reaches the lake too"]]},
    {"id": "lake", "q": "Prashar Lake", "name": "Prashar Lake", "km": 6.96, "hr": 15.0, "cam": {"yaw": -1.07, "dist": 330, "h": 120, "side": 0, "look": 3000, "lookUp": -150}, "code": "Day 1 · Prashar Lake · 2,730 m", "title": "The wandering <em>island</em>", "deva": "पराशर झील", "stats": [["Island", "~7", "%", "Of the lake's surface"], ["Temple", "3", "tiers", "A wooden pagoda"]], "body": ["<b>Prashar Lake</b> has a round island of plants that drifts from shore to shore. Locals call it Tahla, from the Hindi for strolling.", "Beside it stands the three-tiered pagoda temple of the sage Parashar, credited to Raja Ban Sen, founder of the Mandi state."], "legend": "The sage Parashar, father of Ved Vyasa, is said to have meditated here. In another legend, Bhima made the lake by driving his elbow into the mountain.", "dl": [["Altitude", "2,730 m (Bikat 2,712 m)"], ["Night", "Camp in the designated zone"]]},
    {"id": "sukhasar", "q": "Himalayan meadow", "name": "Sukhasar", "km": 8.98, "hr": 17.0, "cam": {"dist": 640, "h": 280, "side": 300, "look": 900, "lookUp": 220}, "code": "Day 1 · Sukhasar", "title": "The little <em>lake</em>", "deva": "सुखासर", "stats": [["Side trip", "2", "km", "Each way"], ["Then", "Camp", "", "By Prashar Lake"]], "body": ["A short walk over the meadows to <b>Sukhasar</b>, a small lake near Prashar.", "There is no mapped path, so this leg is traced over the terrain."], "dl": [["Trek so far", "9 km"]]},
    {"id": "return", "q": "Mandi", "name": "Back to Bagi", "km": 17.94, "hr": 36.0, "cam": {"dist": 1000, "h": 460, "side": -320, "look": 700, "lookUp": 60}, "code": "Day 2 · Bagi", "title": "Down through the <em>forest</em>", "deva": "वापसी", "stats": [["Today", "7", "km", "About 3 h"], ["Trek total", "18", "km", "Over 2 days"]], "body": ["Back down the forest trail to Bagi.", "The return bus leaves the lake at 1:30 p.m. if you'd rather ride."], "dl": [["Next", "Bus to Mandi"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Bagi", "", "bagi"], ["Prashar Lake", "2,730 m", "prashar_lake"], ["Sukhasar", "", "sukhasar"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [{"name": "Deo Tibba", "alt": 6001, "th": -1.016, "r": 52973}, {"name": "Ali Ratni Tibba", "alt": 5470, "th": -0.848, "r": 45580}, {"name": "Bari Ungli", "alt": 5365, "th": -0.791, "r": 47188}, {"name": "KulKangri", "alt": 5160, "th": -1.679, "r": 50927}, {"name": "Basuber", "alt": 4833, "th": -0.5, "r": 33632}],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "kandi", "houses": 14, "radius": 160}, {"type": "village", "at": "bagi", "houses": 20, "radius": 160}, {"type": "lake", "at": "prashar_lake", "radius": 40, "frozen": false}, {"type": "lake", "at": "sukhasar", "radius": 18, "frozen": false}, {"type": "temple", "at": "prashar_temple", "offset": [70, 10]}, {"type": "walkers", "from": 4.46, "to": 6.76}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"snow": 0.3, "weather": "clear", "sky": {"dawn": {"hor": "#f1b998", "sun": "#ffd6aa"}, "day": {"zen": "#2f68c2", "hor": "#cfe1ef"}}},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"bells": true, "villages": [[0.0, 0.4, 2.0], [17.94, 0.4, 2.0]], "lakes": [[7, 0.9], [9, 0.6], [11, 0.9]], "wind": [1698, 2598]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 1628, "temp": 16},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 1000, "max": 3000, "peak": 1, "marks": [["Bagi", 0], ["Lake 2,730 m", 6.96], ["Sukhasar", 8.98], ["Bagi", 18.0]]},
};
