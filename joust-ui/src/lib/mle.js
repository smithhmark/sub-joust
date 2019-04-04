import {
  mkVel,
  mkPosRel,
  initEst,
  posAtTime,
  angleBetween,
  angularDiff,
} from './geom';

import {
  randomArgs,
  stepwiseDescent,
} from './minimizer';

export const singleError = (est, ob) => {
  let guessedLoc = posAtTime(est, ob.time);
  //console.log("singleError - guessedLoc:", guessedLoc);
  let ang = angleBetween(guessedLoc, ob.pos);
  //console.log("singleError - ang:", ang);
  let obAng;
  if (ob.hasOwnProperty("bearing")) {
    obAng = ob.bearing;
  } else {
    obAng = angleBetween(ob.fix, ob.pos)
  }
  //console.log("singleError - obAng:", obAng);
  return angularDiff(obAng, ang);
}

export const sumSqrError = (est, obs) => {
  let sum = 0;
  for (const ob of obs) {
    let err = singleError(est, ob);
    sum += err * err;
  }
  return sum;
}

export const solve = (bearings, tries=5) => {
  let results = [];
  const first = bearings[0];
  const domain = [
    //{min: first.bearing, max:first.bearing}, //initial bearing
    {min: 0, max:20}, //initial range
    {min: 0, max:360},   //target course
    {min: 0, max:50}, // target speed
  ];
  const fn = (ir, c, s) => {
    let vel = mkVel(c,s);
    let pos = mkPosRel(first.pos, first.bearing, ir);
    let A = initEst(pos, vel, first.time);
    //console.log("solver, A:", A);

    return sumSqrError(A, bearings);
  };
  const interp = args => {
    let pos = mkPosRel(first.pos, first.bearing, args[0]);
    let crs = args[1];
    let spd = args[2];
    return `${JSON.stringify(pos)} c: ${crs} s: ${spd}`
  };

  const sortHelper = (a, b) =>{
    if (a.val > b.val) return 1;
    if (b.val >a.val) return -1;
    return 0;
  }

  for (let ii = 0; ii < tries ; ii++) {
    let args = randomArgs(domain);
    results.push(stepwiseDescent(fn, args, domain, 1000));
  }
  results.sort(sortHelper);
  //console.log("solve, results:", results);
  results.slice(0,3).map(r => {
    console.log("val:", r.val, "steps:",r.steps,  interp(r.args));
  });
  return initEst(mkPosRel(first.pos, first.bearing, results[0].args[0]),
    mkVel(results[0].args[1], results[0].args[2]), first.time);
}
