
export const mkPos = (lat, lon) => {
  return { x:lat, y:lon}
}

export const mkPosRel = (pos, bearing, range) => {
  let theta = toRad(compassToMath(bearing));
  //console.log("mkPosRel, theta:", theta);
  let disp = {dx: range * Math.cos(theta),
    dy: range * Math.sin(theta),
  };
  //console.log("mkPosRel, disp:", disp);

  return displace(pos, disp);
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
  let newX = pos.x + disp.dx;
  let newY = pos.y + disp.dy;
  return mkPos(newX, newY);
}

export const posAfter = (pos, V, dt) => {
  let disp = displacement(V, dt);
  let p = displace(pos, disp);
  return p;
}

export const posAtTime = (est, time) => {
  let dt = time - est.t0;
  return posAfter(est.A, est.V, dt);
  return p;
}

export const angleBetween = (target, observer) => {
  let dx, dy;
  dy = target.y - observer.y;
  dx = target.x - observer.x;
  let bearing;
  if (dx === 0) {
    if (dy > 0) {
      bearing = 0;
    } else if ( dy < 0) {
      bearing = 180;
    }
    else {
      //console.log("collision...");
      return undefined;
    }
  }
  let theta = Math.abs(toDeg(Math.atan(dy/dx)));
  if (dx > 0) {
    if (dy >= 0) {
      bearing = 90 - theta;
    } else {
      bearing = 90 + theta;
    }
  } else if (dx < 0) {
    if (dy > 0) {
      //console.log("theta:", theta);
      bearing = 270 + theta;
    } else {
      bearing = 270 - theta;
    }
  } 
  return bearing;
}

export const angularDiff = (b1, b2) => {
  let larger, smaller;

  if (b1 > b2) {
    larger = b1;
    smaller = b2;
  } else {
    smaller = b1;
    larger = b2;
  }
  let temp = larger - smaller;
  if (temp > 180) {
    temp =  (360 -larger) + (smaller);
  }
  return temp;
};

export default {
  angularDiff: angularDiff,
  mkPos: mkPos,
  mkPosRel: mkPosRel,
  mathToCompass: mathToCompass,
  compassToMath: compassToMath,
  toRad: toRad,
  toDeg: toDeg,
  mkVel: mkVel,
  initEst: initEst,
  displacement: displacement,
  displace: displace,
  posAtTime: posAtTime,
  angleBetween: angleBetween,
  angularDiff: angularDiff,
  posAfter: posAfter,
};
