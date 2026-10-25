// Bhrigu Lake: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). Route follows the Bikat Adventures itinerary: Gulaba → Rola Kholi 6.5 km → Bhrigu Lake and back 10 km → Gulaba 6.5 km.
export default {
  id: "bhrigu",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 14.0, "cam": {"yaw": 0.69, "dist": 3000, "h": 1500, "side": 0, "look": 6000, "lookUp": 1300}},
    {"id": "gulaba", "q": "Gulaba Manali", "name": "Gulaba", "km": 0.05, "hr": 14.0, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 1 · Gulaba · about 3,000 m", "title": "Above <em>Manali</em>", "deva": "गुलाबा", "stats": [["From Manali", "21–27", "km", "1–2 h up the Rohtang road"], ["First camp", "3,200", "m", "Gulaba meadows"]], "body": ["The drive from Manali climbs the Rohtang Pass road to <b>Gulaba</b>. A twenty-minute walk takes you to the first camp on the meadows above the road.", "It is an easy first day: most of it is the drive."], "dl": [["Night", "Tents on the Gulaba meadows"], ["Trek so far", "0 km"]]},
    {"id": "rola_kholi", "q": "Bhrigu Lake trek", "name": "Rola Kholi", "km": 6.47, "hr": 38.0, "cam": {"dist": 560, "h": 260, "side": -260, "look": 500, "lookUp": 40}, "code": "Day 2 · Rola Kholi · 3,800 m", "title": "Up through the <em>meadows</em>", "deva": "रोला खोली", "stats": [["Gain today", "+600", "m", "6 km · about 4 h"], ["Grade", "Easy", "", "But it never goes down"]], "body": ["A steady climb through the meadows to <b>Rola Kholi</b>, the high camp below the lake.", "Bikat notes the climbs here have no descents to rest on. Take them slowly."], "dl": [["Night", "Tents at Rola Kholi (two nights)"], ["Trek so far", "6.5 km"]]},
    {"id": "lake", "q": "Bhrigu Lake", "name": "Bhrigu Lake", "km": 11.45, "hr": 59.0, "cam": {"yaw": 0.69, "dist": 330, "h": 120, "side": 0, "look": 3000, "lookUp": -150}, "code": "Day 3 · Bhrigu Lake · about 4,300 m", "title": "The sage's <em>lake</em>", "deva": "भृगु झील", "stats": [["There and back", "10", "km", "About 8 h"], ["Air", "59", "%", "Of sea-level oxygen"]], "body": ["From Rola Kholi the trail climbs to <b>Bhrigu Lake</b>, a small high lake at about 4,300 m that changes colour with the seasons and partly freezes.", "<b>Deo Tibba</b> (6,001 m) stands to the south-east and <b>Hanuman Tibba</b> (5,982 m) to the north-west."], "legend": "The lake is named after the sage Bhrigu, who is said to have meditated beside it. Locals believe its sanctity keeps it from ever freezing over completely.", "dl": [["Altitude", "About 4,300 m (Bikat lists 4,267 m)"], ["Trek so far", "11.5 km"]]},
    {"id": "return", "q": "Manali", "name": "Back to Gulaba", "km": 22.95, "hr": 84.0, "cam": {"dist": 1000, "h": 460, "side": -320, "look": 700, "lookUp": 60}, "code": "Day 4 · Gulaba", "title": "Back to the <em>road</em>", "deva": "वापसी", "stats": [["Today", "6.5", "km", "About 3 h down"], ["Trek total", "23", "km", "Over 4 days"]], "body": ["The last morning retraces the trail down to Gulaba.", "The drive back down the Rohtang road has you in Manali by early afternoon."], "dl": [["Next", "Drive back to Manali"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Gulaba", "3,000 m", "gulaba"], ["Rola Kholi", "3,800 m", "rola_kholi"], ["Bhrigu Lake", "4,300 m", "bhrigu_lake"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [{"name": "Deo Tibba", "alt": 6001, "th": 0.69, "r": 19615}, {"name": "Hanuman Tibba", "alt": 5982, "th": -2.92, "r": 17382}],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "gulaba", "houses": 14, "radius": 160}, {"type": "camp", "at": "rola_kholi", "tents": 12, "radius": 50, "dining": "#3a8fd9"}, {"type": "lake", "at": "bhrigu_lake", "radius": 45, "frozen": false}, {"type": "walkers", "from": 8.95, "to": 11.25}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"sky": {"dawn": {"hor": "#e9b7a0"}, "day": {"zen": "#2a66c8", "hor": "#c9def0"}}, "snow": 0.3, "weather": "clear"},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"villages": [[0.0, 0.4, 2.0], [22.98, 0.4, 2.0]], "lakes": [[11.4, 0.9]], "wind": [3257, 4157]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 2872, "temp": 12},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 2500, "max": 4500, "peak": 2, "marks": [["Gulaba", 0], ["Rola Kholi", 6.47], ["Lake 4,300 m", 11.45], ["Gulaba", 23.0]]},
};
