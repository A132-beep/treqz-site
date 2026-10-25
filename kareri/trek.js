// Kareri Lake: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). Route follows Dheeraj Sharma's 3-day plan: Kareri village → Reoti 6 km → Kareri Lake 13 km, and back (26 km). Reoti is not mapped.
export default {
  id: "kareri",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 9.0, "cam": {"yaw": -0.08, "dist": 3000, "h": 1500, "side": 0, "look": 6000, "lookUp": 1300}},
    {"id": "village", "q": "Kareri village Dharamshala", "name": "Kareri village", "km": 0.05, "hr": 9.0, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 1 · Kareri village · 1,800 m", "title": "A Gaddi <em>village</em>", "deva": "करेरी", "stats": [["From Dharamshala", "27", "km", "About 1.5 h by taxi"], ["Today", "6", "km", "4–5 h to Reoti"]], "body": ["<b>Kareri</b> is a village of the Gaddi shepherds, and it gives the lake its name.", "The trail follows the Nyund stream nearly the whole way up, through pine forest where blue magpies are common."], "dl": [["Night", "Tents at the Reoti meadow (not mapped)"], ["Trek so far", "0 km"]]},
    {"id": "lake", "q": "Kareri Lake", "name": "Kareri Lake", "km": 12.97, "hr": 36.0, "cam": {"yaw": 0.37, "dist": 330, "h": 120, "side": 0, "look": 3000, "lookUp": 500}, "code": "Day 2 · Kareri Lake · 2,934 m", "title": "Clear to the <em>bed</em>", "deva": "करेरी झील", "stats": [["Today", "14", "km", "Reoti to the lake and back"], ["Frozen", "Dec–Apr", "", "Every winter"]], "body": ["Past the metal bridge, the forest gives way to grass and the rocky, poorly marked last 2 km to <b>Kareri Lake</b>.", "The lake is shallow and fed by Dhauladhar snowmelt, so its bed shows through the water. A Shiva temple stands above it."], "legend": "Kareri is the first of seven sacred lakes of the Dhauladhar dedicated to Shiva, and the first checkpoint of the Seven Lakes trek that ends at Triund.", "dl": [["Altitude", "2,934 m (sources give up to 3,100 m)"], ["Night", "Back at Reoti"]]},
    {"id": "return", "q": "Dharamshala", "name": "Back to Kareri", "km": 25.86, "hr": 60.0, "cam": {"dist": 1000, "h": 460, "side": -320, "look": 700, "lookUp": 60}, "code": "Day 3 · Kareri village", "title": "Down the <em>Nyund</em>", "deva": "वापसी", "stats": [["Today", "6", "km", "3–4 h"], ["Trek total", "26", "km", "Over 3 days"]], "body": ["Down along the Nyund to Kareri village and the road to Dharamshala.", "The Nyund's water ends up in the Pong Dam reservoir on the Beas."], "dl": [["Next", "Taxi or bus to Dharamshala"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Ghera", "1,324 m", "ghera"], ["Kareri village", "1,800 m", "kareri_village"], ["Kareri Lake", "2,934 m", "kareri_lake"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [{"name": "Mun Peak", "alt": 4650, "th": 0.075, "r": 10433}, {"name": "Dhaula Trishul", "alt": 4982, "th": 0.272, "r": 20203}, {"name": "Gauri Jhunda", "alt": 4791, "th": 0.299, "r": 18046}, {"name": "Karan Khal", "alt": 4159, "th": -0.615, "r": 8050}, {"name": "Mani Mahesh Kailash", "alt": 5634, "th": -0.292, "r": 38554}],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "ghera", "houses": 18, "radius": 160}, {"type": "village", "at": "kareri_village", "houses": 30, "radius": 160}, {"type": "village", "at": "gaddi_huts", "houses": 4, "radius": 160}, {"type": "lake", "at": "kareri_lake", "radius": 70, "frozen": false}, {"type": "shrine", "at": "shiva_temple"}, {"type": "walkers", "from": 10.47, "to": 12.77}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"snow": 0.2, "weather": "clear", "sky": {"dawn": {"hor": "#f0b896", "sun": "#ffd4a6"}, "day": {"zen": "#2d66c2", "hor": "#cde0ef"}}},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"villages": [[0.0, 0.4, 2.0], [25.86, 0.4, 2.0]], "lakes": [[3, 0.5], [9, 0.6], [13, 0.9], [17, 0.6], [23, 0.5]], "wind": [2058, 2958]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 1800, "temp": 20},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 1500, "max": 3500, "peak": 1, "marks": [["Kareri", 0], ["Lake 2,934 m", 12.97], ["Kareri", 26.0]]},
};
