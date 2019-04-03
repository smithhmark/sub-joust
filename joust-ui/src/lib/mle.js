import {
  posAtTime,
  angleBetween,
  angularDiff,
} from './geom';

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

