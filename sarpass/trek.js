// Sar Pass: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). Route follows Bikat Adventures (28 km): Kasol → Grahan 8 → Min Thach 12 → Nagaru 15 → Sar Pass 16 → Biskeri → Barshaini 28, routed along the mapped 'Sar Pass' hiking route.
export default {
  id: "sarpass",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 9.0, "cam": {"yaw": -1.28, "dist": 3000, "h": 1500, "side": 0, "look": 6000, "lookUp": 1300}},
    {"id": "kasol", "q": "Kasol Parvati valley", "name": "Kasol", "km": 0.05, "hr": 9.0, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 1 · Kasol · 1,580 m", "title": "Up from the <em>Parvati</em>", "deva": "कसोल", "stats": [["From Delhi", "~520", "km", "Bus, change at Bhuntar"], ["Today", "8", "km", "About 5 h"]], "body": ["The trek starts at <b>Kasol</b> in the Parvati valley.", "Downstream, Manikaran's hot springs are tied to a legend: Parvati lost an earring in the stream, and the serpent Shesha's hiss sent up boiling water and jewels."], "dl": [["Trek so far", "0 km"]]},
    {"id": "grahan", "q": "Grahan village", "name": "Grahan", "km": 7.98, "hr": 14.0, "cam": {"dist": 560, "h": 260, "side": -260, "look": 500, "lookUp": 40}, "code": "Day 1 · Grahan · 2,300 m", "title": "A village without a <em>road</em>", "deva": "ग्रहण", "stats": [["Today", "8", "km", "From Kasol"], ["Rule", "No alcohol", "", "Heavy fines"]], "body": ["<b>Grahan</b> can only be reached on foot. Its houses are wood and stone, and outsiders may not enter its carved temple.", "Day 2 gains close to 1,000 m in about 4 km, with no water, to Min Thach. Day 3 climbs to the snow camp at Nagaru."], "dl": [["Night", "Homestay in Grahan"], ["Next camps", "Min Thach (3,285 m), Nagaru (3,850 m), not mapped"]]},
    {"id": "pass", "q": "Sar Pass", "name": "Sar Pass", "km": 15.98, "hr": 80.0, "cam": {"yaw": -1.59, "dist": 330, "h": 120, "side": 0, "look": 3000, "lookUp": -150}, "code": "Day 4 · Sar Pass · 4,223 m", "title": "The lake <em>pass</em>", "deva": "सर पास", "stats": [["Summit day", "~10", "h", "From about 3 a.m."], ["Air", "61", "%", "Of sea-level oxygen"]], "body": ["From Nagaru, about a kilometre up to <b>Sar Pass</b>.", "Sar means lake in the local dialect: the pass is named for a small lake beside the trail that is usually frozen."], "dl": [["Altitude", "4,223 m (OpenStreetMap tags 4,130 m)"]]},
    {"id": "slide", "q": "Snow slide", "name": "Biskeri Top", "km": 18.43, "hr": 82.0, "cam": {"dist": 520, "h": 240, "side": -240, "look": 500, "lookUp": 40}, "code": "Day 4 · Biskeri Top", "title": "The snow <em>slide</em>", "deva": "बिस्केरी", "stats": [["One slide", "~750", "ft", "In under a minute"], ["Brakes", "Heels", "", "And elbows"]], "body": ["After a steep climb to <b>Biskeri Top</b>, trekkers slide down the long snow slope on their backs.", "Stow phones and goggles first. Once the snow melts, the slope has to be walked."], "dl": [["Night", "Tents at Biskeri Thach (3,400 m)"]]},
    {"id": "return", "q": "Parvati valley", "name": "Barshaini", "km": 27.95, "hr": 108.0, "cam": {"dist": 1000, "h": 460, "side": -320, "look": 700, "lookUp": 60}, "code": "Day 5 · Barshaini · 2,210 m", "title": "Down to the <em>road</em>", "deva": "बरशैणी", "stats": [["Today", "5", "km", "About 3 h"], ["Trek total", "28", "km", "Over 5 days"]], "body": ["Down past Bhandak Thach and Pulga, across the Parvati, to <b>Barshaini</b> at the end of the road.", "A 2-hour drive takes you back to Kasol."], "dl": [["Next", "Drive to Kasol"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Kasol", "1,580 m", "kasol"], ["Grahan", "2,300 m", "grahan"], ["Sar Pass", "4,223 m", "sarpass"], ["Biskeri Top", "", "biskeritop"], ["Bhandak Thach", "2,438 m", "bhandakthach"], ["Barshaini", "2,210 m", "barshaini"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [{"name": "Deo Tibba", "alt": 6001, "th": -1.57, "r": 24254}, {"name": "Indrasan", "alt": 6221, "th": -1.52, "r": 26311}, {"name": "Hanuman Tibba", "alt": 5982, "th": -2.242, "r": 51784}],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "kasol", "houses": 40, "radius": 160}, {"type": "village", "at": "grahan", "houses": 26, "radius": 160}, {"type": "village", "at": "pulga", "houses": 18, "radius": 160}, {"type": "village", "at": "barshaini", "houses": 16, "radius": 160}, {"type": "camp", "at": "bhandakthach", "tents": 12, "radius": 50, "dining": "#3a8fd9"}, {"type": "lake", "at": "sarlake", "radius": 40}, {"type": "walkers", "from": 13.48, "to": 15.78}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"snow": 0.8, "weather": "clear", "sky": {"dawn": {"hor": "#eeb7a6", "sun": "#ffd6b2"}, "day": {"zen": "#2a63c4", "hor": "#cbdff0"}}},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"ice": true, "villages": [[0.0, 0.4, 2.0], [7.98, 0.4, 2.0], [27.98, 0.4, 2.0]], "lakes": [], "wind": [3254, 4154]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 1570, "temp": 20},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 1000, "max": 4500, "peak": 2, "marks": [["Kasol", 0], ["Grahan", 7.98], ["Sar Pass 4,223 m", 15.98], ["Biskeri", 18.43], ["Barshaini", 28.0]]},
};
