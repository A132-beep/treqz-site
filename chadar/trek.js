// Chadar: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). The trail is the frozen Zanskar itself: the river line from OpenStreetMap, Shingra Koma → Tibb → Nerak and back. Day figures from Bikat Adventures (Shingra Koma–Tsomo Paldar) and Himalayan High (to Tibb and Nerak).
export default {
  id: "chadar",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 84.0, "cam": {"yaw": 2.45, "dist": 3000, "h": 1500, "side": 0, "look": 6000, "lookUp": 1300}},
    {"id": "shingra", "q": "Zanskar gorge winter", "name": "Shingra Koma", "km": 0.05, "hr": 84.0, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 4 · Shingra Koma · 3,200 m", "title": "Onto the <em>ice</em>", "deva": "शिंगरा कोमा", "stats": [["From Leh", "70", "km", "3–4 h by road"], ["Today", "5.5", "km", "5–6 h to Tsomo Paldar"]], "body": ["After three days in Leh to acclimatise and pass a medical, the road along the Indus and Zanskar ends near <b>Shingra Koma</b>.", "From here the trail is the river: a sheet of ice, milk-white in places and clear in others. The first camp is at Tsomo Paldar (not mapped)."], "legend": "Chadar means blanket: the trek is a walk on the blanket of ice that forms over the Zanskar in winter.", "dl": [["Night", "Tents at Tsomo Paldar"], ["Trek so far", "0 km"]]},
    {"id": "tibb", "q": "Zanskar frozen river", "name": "Tibb Cave", "km": 12.42, "hr": 109.0, "cam": {"dist": 560, "h": 260, "side": -260, "look": 500, "lookUp": 40}, "code": "Day 5 · Tibb Cave · 3,190 m", "title": "Inside the <em>gorge</em>", "deva": "टिब गुफा", "stats": [["Today", "7", "km", "About 3 h"], ["Walls", "600", "m", "Near-vertical"]], "body": ["The gorge closes in: its walls rise up to 600 m and in places the river is only about 5 m wide.", "Camp is near <b>Tibb Cave</b>. Porters in woollen gonchas haul sledges over the ice, calling out 'Julley'."], "dl": [["Night", "Tents near Tibb Cave"], ["Trek so far", "12.5 km"]]},
    {"id": "nerak", "q": "Nerak frozen waterfall", "name": "Nerak", "km": 25.48, "hr": 134.0, "cam": {"dist": 420, "h": 170, "side": 140, "look": 450, "lookUp": 40}, "code": "Day 6 · Nerak · 3,350 m", "title": "The frozen <em>waterfall</em>", "deva": "नेरक", "stats": [["Today", "13", "km", "5–6 h"], ["Nights", "−25", "°C", "Down to −30 °C"]], "body": ["The turnaround is <b>Nerak</b>, where a frozen waterfall hangs above the river: Ju-Leh Adventure calls it the largest in Zanskar.", "Nerak village sits about 1.4 km above the camp."], "legend": "For centuries the frozen river was the only way in and out of Zanskar in winter. A new road is now being built, and Wikipedia notes it will one day make the trek obsolete.", "dl": [["Altitude", "3,350 m camp (Wikipedia gives 3,399 m)"], ["2025 rule", "The waterfall could be visited only on Wednesdays and Sundays"]]},
    {"id": "return", "q": "Leh Ladakh winter", "name": "Back to Shingra Koma", "km": 50.95, "hr": 182.0, "cam": {"dist": 1000, "h": 460, "side": -320, "look": 700, "lookUp": 60}, "code": "Day 8 · Shingra Koma", "title": "Back up the <em>river</em>", "deva": "वापसी", "stats": [["Days 7–8", "25.5", "km", "Back over the ice"], ["Trek total", "51", "km", "Over 5 days"]], "body": ["The way back retraces the ice to Tibb, then to Shingra Koma and the drive to Leh.", "The ice changes from day to day: the walk back is never the same as the walk in."], "dl": [["Next", "Drive to Leh"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Shingra Koma", "3,200 m", "shingra_koma"], ["Tibb Cave", "3,190 m", "tibb"], ["Nerak", "3,350 m", "nerak_camp"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [{"name": "Suskian", "alt": 5590, "th": 1.926, "r": 10292}, {"name": "Nangma", "alt": 5550, "th": 1.202, "r": 6059}, {"name": "Namlas", "alt": 4830, "th": -0.164, "r": 18338}],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "nerak", "houses": 12, "radius": 160}, {"type": "camp", "at": "shingra_koma", "tents": 12, "radius": 50, "dining": "#3a8fd9"}, {"type": "camp", "at": "tibb", "tents": 12, "radius": 50, "dining": "#f2a33a"}, {"type": "camp", "at": "nerak_camp", "tents": 12, "radius": 50, "dining": "#2f8f5b"}, {"type": "walkers", "from": 22.98, "to": 25.28}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"sky": {"night": {"zen": "#040a1a", "hor": "#14223f"}, "dawn": {"zen": "#2b3f80", "hor": "#c9b3c8", "sun": "#ffe0c0"}, "day": {"zen": "#2e60b8", "hor": "#dbe7f2"}}, "snow": 0.25, "weather": "clear"},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"ice": true, "villages": [], "lakes": [[2, 0.6], [7, 0.7], [12.5, 0.8], [19, 0.8], [25.5, 1.0], [32, 0.8], [38.5, 0.8], [45, 0.7], [50, 0.6]], "wind": [2785, 3685]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 3228, "temp": -7},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 3000, "max": 4000, "peak": 2, "marks": [["Shingra Koma", 0], ["Tibb Cave", 12.42], ["Nerak", 25.48], ["Shingra Koma", 51.0]]},
};
