// Agasthyarkoodam: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). Route follows the Kerala Forest Department's plan: Bonacaud → Athirumala base camp 16 km, summit 8 km more, and back the same way (48 km). The whole trail is mapped in OpenStreetMap (the Agasthyakoodam Trail hiking route); the map's line is shorter than the official figures, so km follow the Forest Department. On the way down, the map uses the trail junction just below the Athirumala camp.
export default {
  id: "agasthyarkoodam",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 8.0, "cam": {"yaw": 0.7, "dist": 3000, "h": 1500, "side": 0, "look": 6000, "lookUp": 1300}},
    {"id": "bonacaud", "q": "Bonacaud", "name": "Bonacaud", "km": 0.05, "hr": 8.0, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 1 · Bonacaud", "title": "Into the <em>forest</em>", "deva": "ബോണക്കാട്", "stats": [["Start", "8 am", "", "From the forest station"], ["Today", "16", "km", "To Athirumala"]], "body": ["The trekking team leaves the <b>Bonacaud</b> forest station at 8 am. Every trekker's photo ID is checked first.", "The path crosses grassland to Muttidichan Theri, then climbs through forest on what trekkers call the knee-breaking ascent."], "dl": [["Pass", "Online only, Kerala Forest Department"], ["Trek so far", "0 km"]]},
    {"id": "athirumala", "q": "Athirumala base camp", "name": "Athirumala", "km": 16.03, "hr": 17.0, "cam": {"dist": 560, "h": 260, "side": -260, "look": 500, "lookUp": 40}, "code": "Day 1 · Athirumala · 1,020 m", "title": "The base <em>camp</em>", "deva": "അതിരുമല", "stats": [["Altitude", "1,020", "m", "TrekGo"], ["Walked", "16", "km", "From Bonacaud"]], "body": ["By evening the trail reaches the Forest Department's camp shed at <b>Athirumala</b>.", "No cooking is allowed in the forest. Food and a place to sleep are provided at the camp."], "dl": [["Night", "Forest Department camp shed"], ["Trek so far", "16 km"]]},
    {"id": "summit", "q": "Agasthyarkoodam peak", "name": "Agasthyarkoodam", "km": 23.97, "hr": 34.0, "cam": {"yaw": 1.86, "dist": 330, "h": 120, "side": 0, "look": 3000, "lookUp": -150}, "code": "Day 2 · Agasthyarkoodam · 1,868 m", "title": "The sage's <em>peak</em>", "deva": "അഗസ്ത്യാർകൂടം", "stats": [["Climb", "8", "km", "Steep, from Athirumala"], ["Ropes", "3", "", "Fixed ropes on granite"]], "body": ["Past Pongalappara, five rocky stretches and fixed ropes lead to the top of <b>Agasthyarkoodam</b>, 1,868 m.", "A statue of the sage Agastya stands on the summit."], "legend": "Agastya, one of the seven sages, is said to have done penance here. Tamil tradition calls him the father of the Tamil language.", "dl": [["Pongalappara", "Last water before the summit"], ["Trek so far", "24 km"]]},
    {"id": "descent", "q": "Athirumala", "name": "Back to Athirumala", "km": 32.01, "hr": 38.0, "cam": {"dist": 520, "h": 240, "side": -240, "look": 500, "lookUp": 40}, "code": "Day 2 · Back at Athirumala", "title": "Down by <em>two</em>", "deva": "അതിരുമല", "stats": [["Rule", "2 pm", "", "Back here to go on today"], ["Trek so far", "32", "km", "Summit and back"]], "body": ["Trekkers who are back at Athirumala by about 2 pm can walk on to Bonacaud the same day.", "Slower trekkers spend a second night at the camp."], "dl": [["Night", "Athirumala, if you are slow"], ["Next", "16 km down to Bonacaud"]]},
    {"id": "return", "q": "Bonacaud", "name": "Back to Bonacaud", "km": 47.95, "hr": 62.0, "cam": {"dist": 1000, "h": 460, "side": -320, "look": 700, "lookUp": 60}, "code": "Day 3 · Bonacaud", "title": "Out of the <em>forest</em>", "deva": "മടക്കം", "stats": [["Today", "16", "km", "Athirumala to Bonacaud"], ["Trek total", "48", "km", "Over 2–3 days"]], "body": ["Back down the same trail to <b>Bonacaud</b>, and the road to Thiruvananthapuram, 61 km away."], "dl": [["Next", "Bus or taxi to Thiruvananthapuram"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Bonacaud", "", "bonacaud"], ["Athirumala", "1,020 m", "athirumala"], ["Agasthyarkoodam", "1,868 m", "summit"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [{"name": "Agasthyarkoodam", "alt": 1868, "th": 0.704, "r": 5659}],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "bonacaud", "houses": 14, "radius": 160}, {"type": "camp", "at": "athirumala", "tents": 12, "radius": 50, "dining": "#3a8fd9"}, {"type": "walkers", "from": 21.47, "to": 23.77}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"snow": 0, "weather": "clear", "sky": {"day": {"zen": "#3c70b2", "hor": "#d4e6d8"}}},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"villages": [[0.0, 0.4, 2.0], [48.0, 0.4, 2.0]], "lakes": [], "wind": [926, 1826]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 552, "temp": 28},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 400, "max": 2000, "peak": 2, "marks": [["Bonacaud", 0], ["Athirumala", 16.03], ["Summit 1,868 m", 23.97], ["Athirumala", 32.01], ["Bonacaud", 48.0]]},
};
