// Logic for the free tools on /tools/ (5 km plan, pace calculator, club names, trek finder).
// Pure functions: the pages call them, tests/tools.test.js checks them in Node. No network, no login.
(function (root) {
  const LADDER = [1, 2, 3, 5, 8, 10, 12, 15, 20, 25, 30];   // minutes of running in one go; the plan climbs this ladder
  const START = { new: 0, some: 3, jog: 5 };                // never run / can jog 5 min / can jog 10 min
  const END = LADDER.length - 1;                            // 30 min continuous, about 5 km at an easy pace

  const mmss = (s) => { s = Math.round(s); const m = Math.floor(s / 60); return m + ':' + String(s % 60).padStart(2, '0'); };
  const hmmss = (s) => { s = Math.round(s); const h = Math.floor(s / 3600); return h ? h + ':' + String(Math.floor(s % 3600 / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0') : mmss(s); };

  // One session: warm-up walk, reps of run + walk (or one steady run), cool-down walk.
  function session(runMin) {
    const walk = runMin <= 8 ? 2 : 1;
    if (runMin >= 15) return { run: runMin, reps: 1, walk: 0, total: 10 + runMin };
    const reps = Math.min(10, Math.max(2, Math.round(24 / (runMin + walk))));
    return { run: runMin, reps, walk, total: 10 + reps * (runMin + walk) };
  }

  // plan5k({weeks 4-10, days 3-4, level 'new'|'some'|'jog'}) -> [{week, sessions:[{goal?, run, reps, walk, total}]}]
  function plan5k({ weeks, days, level }) {
    if (!(weeks >= 4 && weeks <= 10) || !(days === 3 || days === 4) || !(level in START)) throw new Error('bad plan options');
    const s = START[level], out = [];
    for (let w = 0; w < weeks; w++) {
      const idx = Math.round(s + (END - s) * w / (weeks - 1));
      const sessions = [];
      for (let k = 0; k < days; k++) {
        if (w === weeks - 1) sessions.push(k === days - 1 ? { goal: true, run: 30, reps: 1, walk: 0, total: 40 } : session(LADDER[END - (days - 1 - k)]));
        else sessions.push(session(LADDER[k === 3 ? Math.max(0, idx - 1) : idx]));   // a 4th day is an easier repeat
      }
      out.push({ week: w + 1, sessions });
    }
    return out;
  }

  function describe(x) {
    if (x.goal) return 'Warm up with a 5 min walk, then run 5 km at an easy pace (about 30 to 40 min), then walk 5 min.';
    if (x.reps === 1) return `Warm up with a 5 min walk, run ${x.run} min without stopping, then walk 5 min.`;
    return `Warm up with a 5 min walk, then ${x.reps} times: run ${x.run} min and walk ${x.walk} min. Finish with a 5 min walk.`;
  }

  // Pace and race times. Riegel: t2 = t1 * (d2 / d1) ^ 1.06, a rule of thumb for fit runners, not a promise.
  const pace = (km, sec) => ({ perKm: sec / km, kmh: km / (sec / 3600) });
  const timeFor = (km, perKmSec) => km * perKmSec;
  const riegel = (km1, sec1, km2) => sec1 * Math.pow(km2 / km1, 1.06);

  // Club names: [prefix] [word] [suffix], seeded rng so a test can repeat a result.
  const NAMES = {
    fun: { a: ['Sunrise', 'Chai', 'Sweaty', 'Snooze', 'Weekend', 'Monsoon', 'Midnight', 'Brunch', 'Dhoop', 'Last-Lap'], b: ['Strides', 'Sprinters', 'Joggers', 'Pacers', 'Wanderers', 'Strays', 'Legends', 'Rebels', 'Flyers', 'Crew'] },
    calm: { a: ['Easy', 'Steady', 'Morning', 'Open Road', 'Long Run', 'Green', 'First Light', 'Slow', 'Quiet', 'Fresh'], b: ['Runners', 'Run Club', 'Run Collective', 'Running Society', 'Pace Group', 'Run Crew', 'Running Club', 'Striders', 'Roadrunners', 'Run Co.'] },
    women: { a: ['Her', 'Sheroes', 'Rani', 'Bold', 'Rise', 'Fierce', 'She Runs', 'Radiant', 'Brave', 'Queen'], b: ['Run Club', 'Strides', 'Runners', 'Run Crew', 'Pace Squad', 'Running Circle', 'Striders', 'Flyers', 'Collective', 'Sisterhood'] },
  };
  function clubNames({ style = 'fun', city = '', rng = Math.random, count = 12 }) {
    const set = NAMES[style] || NAMES.fun, seen = new Set(), out = [];
    const pick = (l) => l[Math.floor(rng() * l.length)];
    let guard = 0;
    while (out.length < count && guard++ < 500) {
      const n = (city && rng() < 0.4 ? city.trim() + ' ' : '') + pick(set.a) + ' ' + pick(set.b);
      if (!seen.has(n)) { seen.add(n); out.push(n); }
    }
    return out;
  }

  // Trek finder over treks.json: best month beats possible month, then easier and shorter first.
  const DIFF = { 1: 'Easy', 2: 'Easy to moderate', 3: 'Moderate', 4: 'Moderate to hard', 5: 'Hard' };
  const MAXDIFF = { beginner: 2, moderate: 3, hard: 5 };
  function findTreks(treks, { month, maxDays = 99, level = 'beginner', region = '' }, n = 6) {
    return treks
      .filter((t) => t.days && t.days <= maxDays && t.diff && t.diff <= MAXDIFF[level] && (!region || t.region === region))
      .map((t) => ({ t, score: (t.best || []).includes(month) ? 2 : (t.ok || []).includes(month) ? 1 : 0 }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || a.t.diff - b.t.diff || a.t.days - b.t.days)
      .slice(0, n).map((x) => ({ ...x.t, fit: x.score === 2 ? 'best month' : 'possible month' }));
  }

  const TQ = { LADDER, mmss, hmmss, session, plan5k, describe, pace, timeFor, riegel, clubNames, findTreks, DIFF };
  if (typeof module !== 'undefined') module.exports = TQ; else root.TQ = TQ;
})(typeof window !== 'undefined' ? window : globalThis);
