// Tadiandamol: everything the engine needs that is specific to this trek.
// Card text, the almanac and the hero live in index.html; terrain lives in geo.json, height.png, sat.jpg, far.png, far.jpg
// (built by tools/build_trek.py from terrain.json). Route follows the Bikat Adventures plan: Nalknad Palace → forest gate → Tadiandamol and back, along the mapped OpenStreetMap hiking route 'Tadiandmol Peak'. Km scaled to the forest department's 3.5 km from the gate to the top and Treks and Trails' 14 km in all; the map measures about 11 km. The gate stop sits on the mapped path 20 m from OpenStreetMap's 'Forest Check Post'.
export default {
  id: "tadiandamol",
  // story stages: km on the route, hr = hours since Day 1 00:00, cam = how the shot is framed
  stages: [
    {"id": "hero", "name": "Overview", "km": 0, "hr": 31.5, "cam": {"dist": 3600, "h": 1500, "side": -2600, "look": 5200, "lookUp": 900}},
    {"id": "palace", "q": "Nalknad Palace", "name": "Nalknad Palace", "km": 0.05, "hr": 31.5, "cam": {"dist": 700, "h": 320, "side": 280, "look": 600, "lookUp": 60}, "code": "Day 2 · Nalknad Palace", "title": "The king's <em>refuge</em>", "deva": "ನಾಲ್ಕುನಾಡು ಅರಮನೆ", "stats": [["From Bangalore", "~270", "km", "Overnight by road"], ["Built", "1792–94", "", "By Dodda Vira Rajendra"]], "body": ["The walk starts at the <b>Nalknad Palace</b>, about 4 km off the main road below the mountain.", "Dodda Vira Rajendra built it after he lost Mercara to Tipu Sultan's forces."], "dl": [["Trek so far", "0 km"], ["Look for", "The grassy ridge rising to the south-west"]]},
    {"id": "gate", "q": "Tadiandamol", "name": "Forest gate", "km": 3.51, "hr": 32.5, "cam": {"dist": 560, "h": 260, "side": -260, "look": 500, "lookUp": 40}, "code": "Day 2 · Forest gate, Karadimotte", "title": "Through the <em>gate</em>", "deva": "ತಪಾಸಣಾ ಗೇಟ್", "stats": [["Slot", "7:30–11", "am", "The only one"], ["Limit", "150", "a day", "Booked online"]], "body": ["Since December 2016 the forest department has run the trek from an inspection gate at <b>Karadimotte</b>, in Yavakapadi village.", "From here it is 3.5 km to the top."], "dl": [["Book", "Aranya Vihaara, 1 to 30 days ahead"], ["Trek so far", "3.5 km"]]},
    {"id": "summit", "q": "Tadiandamol", "name": "Tadiandamol", "km": 7.03, "hr": 35.5, "cam": {"dist": 640, "h": 280, "side": 300, "look": 900, "lookUp": 220}, "code": "Day 2 · Tadiandamol · 1,748 m", "title": "The <em>broad</em> hill", "deva": "ತಡಿಯಾಂಡಮೋಳ್", "stats": [["Height", "1,748", "m", "Highest in Kodagu"], ["In Karnataka", "3rd", "", "After Mullayyanagiri and Kudremukh"]], "body": ["Near the top the path climbs a steep forest stretch of about 500 m, slippery in the monsoon. Then grass to the summit of <b>Tadiandamol</b>.", "The name joins Kodava words for broad and hill. Shola forest fills the valleys below."], "dl": [["Altitude", "1,748 m (Bikat gives 1,638 m)"], ["Trek so far", "7 km"]]},
    {"id": "return", "q": "Kakkabe", "name": "Back to the palace", "km": 13.95, "hr": 41.5, "cam": {"dist": 1000, "h": 460, "side": -320, "look": 700, "lookUp": 60}, "code": "Day 2 · Nalknad Palace", "title": "Down to the <em>estates</em>", "deva": "ವಾಪಸ್", "stats": [["Trek total", "14", "km", "There and back"], ["Back by", "~5:30", "pm", "Treks and Trails' plan"]], "body": ["Down the same way to the coffee estates.", "Camping on the hill has been banned since December 2016, so the night is in a homestay below."], "dl": [["Night", "Homestay near Kakkabe"], ["Next", "Bangalore on Day 3"]]},
  ],
  // map labels for the stops: [text, altitude, point in geo.json pts]
  labels: [["Kakkabe", "", "kakkabe"], ["Nalknad Palace", "", "palace"], ["Forest gate", "", "gate"], ["Tadiandamol", "1,748 m", "summit"]],
  // big peaks on the horizon: bearing th (radians from east toward south) and distance r in metres
  farPeaks: [],
  // what stands at each stop (types are built by the engine)
  props: [{"type": "village", "at": "palace", "houses": 10, "radius": 160}, {"type": "village", "at": "kakkabe", "houses": 30, "radius": 160}, {"type": "walkers", "from": 4.53, "to": 6.83}],
  // look: accent is set in index.html (--buransh); sky mood
  theme: {"snow": 0, "weather": "clear", "sky": {"day": {"zen": "#3c70b2", "hor": "#d4e6d8"}}},
  // soundscape: villages [km, full within, silent beyond], lakes [km, spread], wind from/to altitude
  sound: {"villages": [[0.0, 0.4, 2.0], [14.0, 0.4, 2.0]], "lakes": [], "wind": [823, 1723]},
  // HUD temperature: estimated °C at this altitude in mid-afternoon, falling 6.5 °C per km of height
  climate: {"alt": 1034, "temp": 26},
  // elevation profile in the almanac: axis range, labelled stops, which one is the high point
  profile: {"min": 500, "max": 2000, "peak": 2, "marks": [["Palace", 0], ["Gate", 3.51], ["Summit 1,748 m", 7.03], ["Palace", 14.0]]},
};
