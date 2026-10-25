// Kedartal: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). Route follows Bikat Adventures (38 km): Gangotri → Bhoj Kharak 8 → Kedar Kharak 15 → Kedartal 19, and back. OpenStreetMap maps the trail as one coarse footway; Bhoj Kharak is not mapped.
export default {
  id: "kedartal",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 55.0, "cam": {"yaw": 1.23, "dist": 3000, "h": 1500, "side": 0, "look": 6000, "lookUp": 1300}},
    {"id": "gangotri", "q": "Gangotri temple", "name": "Gangotri", "km": 0.05, "hr": 55.0, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 3 · Gangotri", "title": "Behind the <em>temple</em>", "deva": "गंगोत्री", "stats": [["From Dehradun", "~245", "km", "Via Uttarkashi"], ["Today", "8", "km", "To Bhoj Kharak"]], "body": ["After a day in <b>Gangotri</b> to acclimatise, the trail starts across the bridge behind the temple and climbs beside the Kedar Ganga.", "Just before Bhoj Kharak is the Spider Wall: a 60° rock slab about 15 m long, crossed spider-fashion on two thin ledges."], "legend": "Gangotri is where legend says Ganga came down when Shiva released her from his locks. The goddess's idol spends each winter at Mukhba, near Harsil.", "dl": [["Night", "Tents at Bhoj Kharak (3,930 m, not mapped)"], ["Trek so far", "0 km"]]},
    {"id": "kharak", "q": "Bhrigupanth", "name": "Kedar Kharak", "km": 14.91, "hr": 85.0, "cam": {"dist": 560, "h": 260, "side": -260, "look": 500, "lookUp": 40}, "code": "Day 4 · Kedar Kharak · 4,410 m", "title": "Under <em>Bhrigupanth</em>", "deva": "केदार खरक", "stats": [["Today", "7", "km", "Past a landslide zone"], ["Camp", "4,410", "m", "Blue sheep visit"]], "body": ["Past a landslide zone where about 100 m of the old trail has gone, to <b>Kedar Kharak</b> below Bhrigupanth.", "Herds of bharal, the blue sheep, often wander through the camp."], "dl": [["Night", "Tents at Kedar Kharak (two nights)"], ["Trek so far", "15 km"]]},
    {"id": "lake", "q": "Kedartal", "name": "Kedartal", "km": 18.97, "hr": 106.0, "cam": {"yaw": 1.02, "dist": 750, "h": 280, "side": 120, "look": 2500, "lookUp": 1100}, "code": "Day 5 · Kedartal · 4,750 m", "title": "Shiva's <em>lake</em>", "deva": "केदारताल", "stats": [["There and back", "8", "km", "From Kedar Kharak"], ["Air", "56", "%", "Of sea-level oxygen"]], "body": ["Over three boulder ridges, then along cairns, to <b>Kedartal</b>, fed by snow off Thalay Sagar, Meru and Bhrigupanth.", "The lake is the source of the Kedar Ganga, which joins the Bhagirathi at Gangotri."], "legend": "Thalay Sagar, the rock spire behind the lake, was first climbed in 1979. A route straight through its rotten shale band won the Piolet d'Or in 1999.", "dl": [["Altitude", "4,750 m (Bikat 4,800 m)"], ["Night", "Back at Kedar Kharak"]]},
    {"id": "return", "q": "Gangotri", "name": "Back to Gangotri", "km": 37.92, "hr": 135.0, "cam": {"dist": 1000, "h": 460, "side": -320, "look": 700, "lookUp": 60}, "code": "Day 6 · Gangotri", "title": "Down the <em>Kedar Ganga</em>", "deva": "वापसी", "stats": [["Today", "15", "km", "All the way down"], ["Trek total", "38", "km", "Over 4 days"]], "body": ["One long day back over the Spider Wall to Gangotri.", "Day 7 is the drive to Dehradun."], "dl": [["Next", "Drive to Dehradun"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Gangotri", "3,200 m", "gangotri"], ["Kedar Kharak", "4,410 m", "kedar_kharak"], ["Kedartal", "4,750 m", "kedartal"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [{"name": "Thalay Sagar", "alt": 6904, "th": 1.169, "r": 11248}, {"name": "Bhrigupanth", "alt": 6772, "th": 0.999, "r": 9587}, {"name": "Meru", "alt": 6660, "th": 0.869, "r": 12590}, {"name": "Jogin I", "alt": 6465, "th": 1.832, "r": 8743}, {"name": "Manda I", "alt": 6511, "th": 0.329, "r": 4823}, {"name": "Gangotri I", "alt": 6682, "th": 2.764, "r": 10543}, {"name": "Shivling", "alt": 6543, "th": 0.643, "r": 13655}],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "gangotri", "houses": 40, "radius": 160}, {"type": "camp", "at": "kedar_kharak", "tents": 12, "radius": 50, "dining": "#3a8fd9"}, {"type": "temple", "at": "gangotri_temple", "offset": [0, 0]}, {"type": "lake", "at": "kedartal", "radius": 90, "frozen": false}, {"type": "walkers", "from": 16.47, "to": 18.77}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"snow": 0.4, "weather": "clear", "sky": {"dawn": {"hor": "#efb39c", "sun": "#ffd3ae"}, "day": {"zen": "#285bbd", "hor": "#c8dcef"}}},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"bells": true, "villages": [[0.0, 0.4, 2.0], [37.92, 0.4, 2.0]], "lakes": [[2, 0.5], [8, 0.6], [19, 1.0]], "wind": [3802, 4702]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 3045, "temp": 12},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 2500, "max": 5000, "peak": 2, "marks": [["Gangotri", 0], ["Kedar Kharak", 14.91], ["Kedartal 4,750 m", 18.97], ["Gangotri", 38.0]]},
};
