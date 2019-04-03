

export const mkPos = (lat, lon) => {
  return { x:lat, y:lon}
}

export const mathToCompass = (theta) => {
  return (90 - theta + 360) % 360;
}

export const compassToMath = (bearing) => {
  return (90 - bearing + 360) % 360;
}

export const toRad = (deg) => {return deg * Math.PI / 180}
export const toDeg = (rad) => {return rad * 180 / Math.PI }

export const mkVel = (crs, spd) => {
  let angle = toRad(compassToMath(crs));
  return ({
    vx: spd * Math.cos(angle),
    vy: spd * Math.sin(angle),
  });
}

export const initEst = (pos, vel, time) => {
  return ({
    A: pos,
    V: vel,
    t0: time,
  });
}

export const displacement = (vel, dur) => {
  return {
    dx: vel.vx * dur,
    dy: vel.vy * dur,
  };
}

export const displace = (pos, disp) => {
  let newX = pos.lat + disp.dx;
  let newY = pos.lon + disp.dy;
  return mkPos(newX, newY);
}

export const posAtTime = (est, time) => {
  let dt = time - est.t0;
  let disp = displacement(est.V, dt);
  let p = displace(est.A, disp);
  return p;
}

export const angleBetween = (p1, p2) => {
  let dx, dy;
  dy = p1.y - p2.y;
  dx = p1.x - p2.x;
  return Math.arctan(dy/dx);
}

const singleError = (est, ob) => {
  let p = posAtTime(est, ob.time);
  let ang = angleBetween(p, ob.pos);
  let obAng;
  if (ob.bearing) {
    obAng = ob.bearing * Math.PI / 180;
  } else {
    obAng = angleBetween(ob.fix, ob.pos)
  }
  return obAng - ang;
}

const sumSqrError = (est, obs) => {
  let sum = 0;
  for (const ob of obs) {
    let err = singleError(est, ob);
    sum += err * err;
  }
  return sum;
}

//module.exports.mkPos = mkPos;
