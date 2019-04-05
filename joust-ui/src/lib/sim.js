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
  maneuver: ManeuverOrderType,
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
    
    if (!vessel.maneuver) {
      // displace vessel by its velocity
      //console.log("displace vessels on legs");
      //console.log("old pos", vessel.pos);
      //console.log("vel", vessel.vel);
      let newPos = geom.posAfter(vessel.pos, vessel.vel, timeSinceLast);
      //console.log("displaced to", newPos);
      newVes = {vessel, pos: newPos};
    } else {
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
