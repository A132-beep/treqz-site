// Panchachuli Base: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). The map follows the Darma valley track from Dar through Sela, Nagling and Baling to Dantu: the classic walk-in, which jeeps now drive. The 4–5 km path on to the base camp is not mapped, so it isn't drawn.
export default {
  id: "panchachuli",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 30.0, "cam": {"yaw": -2.38, "dist": 3000, "h": 1500, "side": 0, "look": 6000, "lookUp": 1300}},
    {"id": "dar", "q": "Darma valley", "name": "Dar", "km": 0.05, "hr": 30.0, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 2 · Dar · 2,134 m", "title": "Into the <em>Darma</em>", "deva": "दर", "stats": [["Dharchula to Dugtu", "~6", "h", "By jeep, today"], ["Classic walk", "~60", "km", "From Dar, before the road"]], "body": ["From Dharchula a rough road climbs via Tawaghat and Sobla into the Darma valley. <b>Dar</b> is where the classic walk-in began.", "Darma was one of the Bhotiya Mahals of northern Kumaon: its Rung people traded over high passes with Tibet until the 1962 war."], "dl": [["Map", "The valley track, as mapped"]]},
    {"id": "sela", "q": "Darma valley village", "name": "Sela", "km": 11.55, "hr": 32.0, "cam": {"dist": 560, "h": 260, "side": -260, "look": 500, "lookUp": 40}, "code": "Day 2 · Sela", "title": "The narrow <em>stretch</em>", "deva": "सेला", "stats": [["Checkposts", "ITBP", "", "At Sela and Baling"], ["Exposed", "~1", "km", "Between Dar and Sela, on foot"]], "body": ["On foot, the stretch between Dar and <b>Sela</b> is narrow and exposed.", "ITBP checkposts at Sela and Baling register every trekker."], "dl": [["Permit", "Inner Line Permit from the SDM office, Dharchula"]]},
    {"id": "baling", "q": "Darma valley", "name": "Baling", "km": 21.85, "hr": 35.0, "cam": {"dist": 640, "h": 280, "side": 300, "look": 900, "lookUp": 220}, "code": "Day 2 · Baling", "title": "Villages of <em>summer</em>", "deva": "बालिंग", "stats": [["Snowbound", "~5", "months", "A year"], ["Winter", "Move down", "", "With the livestock"]], "body": ["The Darma valley is snowbound for about five months a year. Villagers like those of <b>Baling</b> move down with their livestock each winter.", "Snow leopard, black bear and musk deer live in the valley."], "dl": [["Next", "Dugtu and Dantu"]]},
    {"id": "dantu", "q": "Panchachuli", "name": "Dantu", "km": 28.87, "hr": 41.0, "cam": {"yaw": 2.77, "dist": 750, "h": 280, "side": 120, "look": 2500, "lookUp": 1100}, "code": "Day 2 · Dantu · facing Panchachuli", "title": "The five <em>hearths</em>", "deva": "पंचाचूली", "stats": [["To base camp", "4–5", "km", "Day 3, not mapped"], ["Highest", "6,904", "m", "Panchachuli II"]], "body": ["From Dugtu and <b>Dantu</b> the five peaks of <b>Panchachuli</b> fill the west. Day 3 walks 4–5 km to the base camp, where KMVN built igloo-style huts in 2021.", "Legend says the Pandavas cooked their last meal on five hearths, one on each summit, on their way to heaven."], "legend": "The Shauka people of the valley call the massif 'Darmanyoli' in their folk songs. Some villagers see its five summits as the five Pandava brothers.", "dl": [["Base camp", "3,658–4,260 m, sources differ"], ["Day 4", "Back to Dugtu"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Dar", "2,134 m", "dar"], ["Sela", "", "sela"], ["Nagling", "", "nagling"], ["Baling", "", "baling"], ["Dantu", "", "dantu"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [{"name": "Panchachuli II", "alt": 6904, "th": -2.557, "r": 10864}, {"name": "Panchachuli I", "alt": 6355, "th": -2.51, "r": 11862}, {"name": "Panchachuli III", "alt": 6312, "th": -2.581, "r": 8913}, {"name": "Panchachuli IV", "alt": 6334, "th": -2.589, "r": 7404}, {"name": "Panchachuli V", "alt": 6437, "th": -2.578, "r": 5727}, {"name": "Rajrambha", "alt": 6537, "th": -2.493, "r": 17462}],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "dar", "houses": 24, "radius": 160}, {"type": "village", "at": "sela", "houses": 14, "radius": 160}, {"type": "village", "at": "nagling", "houses": 14, "radius": 160}, {"type": "village", "at": "baling", "houses": 18, "radius": 160}, {"type": "village", "at": "sona", "houses": 10, "radius": 160}, {"type": "village", "at": "dantu", "houses": 16, "radius": 160}, {"type": "walkers", "from": 26.4, "to": 28.7}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"snow": 0.3, "weather": "clear", "sky": {"dawn": {"hor": "#f0ab98", "sun": "#ffcda6"}, "day": {"zen": "#295dbe", "hor": "#c7dbee"}}},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"bells": true, "villages": [[0.0, 0.4, 2.0], [11.55, 0.4, 2.0], [16.45, 0.4, 2.0], [21.85, 0.4, 2.0], [28.9, 0.4, 2.0]], "lakes": [], "wind": [2390, 3290]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 2081, "temp": 18},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 1500, "max": 3500, "peak": 3, "marks": [["Dar", 0], ["Sela", 11.55], ["Baling", 21.85], ["Dantu", 28.92]]},
};
