import { shape, number, string, oneOf, arrayOf, objectOf } from 'prop-types';

import geom from './geom';

import {
  ManeuverOrderType
} from '../types/index';

const PositionType = shape({
  x: number.isRequired, 
  y: number.isRequired,
  z: number.isRequired, 
});

const VelocityType = shape({
  dx: number.isRequired, 
  dy: number.isRequired,
  dz: number.isRequired, 
});

const hmmm = shape({
  heading: number.isRequired, 
  spd: number.isRequired, 
});

const TurningCircleType = shape({
  radius: number.isRequired,
  volume: number.isRequired,
});

const TurningPerformanceType = shape({
  maxRudder: TurningCircleType,
  stdRudder: TurningCircleType,
});

const PerformanceEnvelopeType = shape({
  maxSpd: number.isRequired,
  senitivity: number.isRequired,
  maxDepth: number.isRequired,
  maxRudder: TurningCircleType.isRequired,
  stdRudder: TurningCircleType.isRequired,
});

const VesselClassType = shape({
  name: string.isRequired,
  envelope: PerformanceEnvelopeType.isRequired,
});

const VesselType = shape({
  pos: PositionType,
  vel: VelocityType,
  maneuverOrder: ManeuverOrderType,
  cls: VesselClassType,
});

const WorldType = shape({
  vessels: arrayOf(VesselType),
  classes: objectOf(VesselClassType),
});

export const newWorld = (classes = {}) => {
  return {
    vessels: [],
    classes: classes,
  };
};

export const addVessel = (world, vessel) => {
  world.vessels.push(vessel);
};

export const nextWorld = (world, timeSinceLast) => {
  let nextVessels = [];
  let nextWorld = newWorld(world.classes);
  for (const vessel of world.vessels) {
    let noiseLevel = 0;
    //noiseLevel = testForNoise(vessel);
    let newVes;
    
    if (!vessel.maneuverOrder) { //vessel is on a leg
      let newPos = geom.posAfter(vessel.pos, vessel.vel, timeSinceLast);
      newVes = {...vessel, pos: newPos};
    } else {
      if (!vessel.maneuverComp) { // first we've seen of this order
        // ERROR here when order is changed
        console.log("calc accel");
        
      } else {
        //continue with existing order
        console.log("calc accel");
      }
      // calc actual velocity from manuver. (Manu is like an accelleration)
      // displace vessel by its velocity
      console.log("calc accel");
    }
    // determine how loud vessel is, and 
    if (noiseLevel > 0) {
      // who hears it...
      console.log("who hears it...");
    }
    nextWorld.vessels.push(newVes);
  }
  return nextWorld;
};

export const turningCircleCenter = (pos, heading, radius, rudderDir) => {
  let bearingToCenter;
  if (rudderDir === "RIGHT") {
    bearingToCenter = geom.bearingAdd(heading, 90);
  } else {
    bearingToCenter = geom.bearingMinus(heading, 90);
  }
  let fakeVel = geom.mkVel(bearingToCenter, radius);
  return geom.posAfter(pos, fakeVel, 1);
};

export const nextPosInTurn = (
  oldPos, oldVel,
  radius, rudderDir, timeSinceLast
) => {
  let oldCS = geom.mkCrsSpd(oldVel);
  let center = turningCircleCenter(oldPos, oldCS.crs, radius, rudderDir);

  let dist = oldCS.spd * timeSinceLast;
  //console.log("dist:", dist);
  let circum = 2 * Math.PI * radius;
  //console.log("circum:", circum);
  let angleBetween = dist * 360 / circum;
  let bToOld = geom.angleBetween(oldPos, center);
  console.log("b from center to old pos:", bToOld);
  let bFmCenToNew;
  let nextCrs;
  console.log("angleBetween:", angleBetween);

  bFmCenToNew = geom.bearingAdd(bToOld, angleBetween);
  nextCrs = geom.bearingAdd(bFmCenToNew, 90);
  console.log("old cs", oldCS);
  console.log("next C", nextCrs);
  console.log("bearing offset:", geom.angularDiff(oldCS.crs, nextCrs)); 
  if (angleBetween < 180 && geom.angularDiff(oldCS.crs, nextCrs) > 90 ){
    bFmCenToNew = geom.bearingMinus(bToOld, angleBetween);
    nextCrs = geom.bearingMinus(bFmCenToNew, 90);
    console.log("correcting for rotating the wrong way");
  }
  console.log("b from center to new:", bFmCenToNew);
  /*
  if (rudderDir == "RIGHT") {
    bFmCenToNew = geom.bearingAdd(bToOld, angleBetween);
    nextCrs = geom.bearingAdd(bFmCenToNew, 90);
    console.log("bFmCenToNew (adding):", bFmCenToNew);
  } else {
    bFmCenToNew = geom.bearingMinus(bToOld, angleBetween);
    nextCrs = geom.bearingMinus(bFmCenToNew, 90);
    console.log("bFmCenToNew (subtracting):", bFmCenToNew);
  } 
  */
  let fakeVel = geom.mkVel(bFmCenToNew, radius);
  //console.log("fakevel:", fakeVel);
  console.log("center:", center);
  let nextPos = geom.posAfter(center, fakeVel, 1);
  console.log("nextPos:", nextPos);
  let nextVel = geom.mkVel(nextCrs, oldCS.spd);
  //console.log("nextVel:", nextVel);
  //console.log("nextcs:", geom.mkCrsSpd(nextVel));
  return {pos: nextPos, vel: nextVel, crs: nextCrs}
};
