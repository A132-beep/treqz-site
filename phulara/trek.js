// Phulara Ridge: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). Route follows Bikat Adventures (29 km): Sankri → Juda Ka Talab 5 → Bhoj Gadi 10 → Phulara Ridge → Pushtara 21 → Taluka 29. Only Sankri to Juda Ka Talab is mapped; the rest is traced over the terrain.
export default {
  id: "phulara",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 32.0, "cam": {"yaw": -0.08, "dist": 3000, "h": 1500, "side": 0, "look": 6000, "lookUp": 1300}},
    {"id": "sankri", "q": "Sankri village", "name": "Sankri", "km": 0.05, "hr": 32.0, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 2 · Sankri · 1,950 m", "title": "Into Govind <em>park</em>", "deva": "सांकरी", "stats": [["From Dehradun", "~197", "km", "9–10 h by road"], ["Today", "5", "km", "About 5 h"]], "body": ["The trek starts at <b>Sankri</b>, inside Govind Pashu Vihar National Park.", "About 3 km up, the forest opens on the Basuriwala dhaba, where the host plays the flute for trekkers who stop for tea."], "dl": [["Trek so far", "0 km"]]},
    {"id": "jkt", "q": "Juda ka Talab", "name": "Juda Ka Talab", "km": 4.93, "hr": 37.0, "cam": {"dist": 560, "h": 260, "side": -260, "look": 500, "lookUp": 40}, "code": "Day 2 · Juda Ka Talab · 2,700 m", "title": "Shiva's knot of <em>hair</em>", "deva": "जूडा का तालाब", "stats": [["Today", "5", "km", "From Sankri"], ["Camp", "2,773", "m", "By a stream past the lake"]], "body": ["<b>Juda Ka Talab</b> is also a camp on the Kedarkantha trek; the Phulara route turns the other way from here.", "Legend says Shiva pulled a few strands from his hair knot to make the lake."], "dl": [["Night", "Tents near the lake"], ["Next", "Bhoj Gadi (3,400 m), then the ridge, neither mapped"]]},
    {"id": "ridge", "q": "Swargarohini", "name": "Phulara Ridge", "km": 11.98, "hr": 81.0, "cam": {"yaw": -0.3, "dist": 330, "h": 120, "side": 0, "look": 3000, "lookUp": -150}, "code": "Day 4 · Phulara Ridge · 3,700 m", "title": "Along the <em>ridge</em>", "deva": "फुलारा रिज", "stats": [["Ridge day", "11", "km", "About 7 h"], ["Water", "1", "source", "All day"]], "body": ["Day 3 climbs 500 m at 45–50° on loose sand to Bhoj Gadi. Day 4 reaches the ridge about 2 km later and follows it, with Swargarohini, Bandarpunch and Kalanag on one side.", "Parts of the ridge are narrow scree, and strong winds are common on top."], "legend": "Swargarohini is said to be the stairway the Pandavas climbed to heaven. Bikat says it has never been climbed; Wikipedia records a first ascent of its west summit in 1974.", "dl": [["Position", "The ridge isn't mapped; this point is the 3,710 m high point in the elevation data, so the line is approximate"], ["Night", "Tents below the Pushtara meadows"]]},
    {"id": "return", "q": "Taluka village", "name": "Taluka", "km": 28.95, "hr": 109.0, "cam": {"dist": 1000, "h": 460, "side": -320, "look": 700, "lookUp": 60}, "code": "Day 5 · Taluka · 2,108 m", "title": "Down to the <em>Supin</em>", "deva": "तालुका", "stats": [["Today", "8", "km", "About 5 h"], ["Trek total", "29", "km", "Over 4 days"]], "body": ["The last day drops through a forest of fallen logs and creepers to <b>Taluka</b>, an old village of wooden houses above the Supin river.", "A vehicle covers the bumpy 12 km back to Sankri."], "dl": [["Next", "Drive to Sankri"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Sankri", "1,950 m", "sankri"], ["Juda Ka Talab", "2,700 m", "jkt"], ["Phulara Ridge (approx.)", "3,700 m", "ridge"], ["Taluka", "2,108 m", "taluka"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [{"name": "Swargarohini", "alt": 6252, "th": -0.202, "r": 28939}, {"name": "Kalanag", "alt": 6387, "th": 0.068, "r": 34249}, {"name": "Bandarpunch", "alt": 6316, "th": 0.153, "r": 32635}, {"name": "Bandarpunch II", "alt": 6102, "th": 0.153, "r": 30087}, {"name": "Kedarkantha", "alt": 3800, "th": 2.516, "r": 5109}],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "sankri", "houses": 40, "radius": 160}, {"type": "village", "at": "taluka", "houses": 24, "radius": 160}, {"type": "camp", "at": "jkt_camp", "tents": 12, "radius": 50, "dining": "#3a8fd9"}, {"type": "lake", "at": "jkt", "radius": 40, "frozen": false}, {"type": "walkers", "from": 9.48, "to": 11.78}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"snow": 0.2, "weather": "clear", "sky": {"dawn": {"hor": "#f6b39a", "sun": "#ffd0a8"}, "day": {"zen": "#2c62c0", "hor": "#cde0ef"}}},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"villages": [[0.0, 0.4, 2.0], [28.96, 0.4, 2.0]], "lakes": [[4.5, 0.9]], "wind": [2811, 3711]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 1934, "temp": 18},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 1500, "max": 4000, "peak": 2, "marks": [["Sankri", 0], ["Juda Ka Talab", 4.93], ["Ridge 3,700 m", 11.98], ["Taluka", 29.0]]},
};
