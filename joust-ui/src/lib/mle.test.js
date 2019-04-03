
//const mle = require('./mle');
import {
  compassToMath,
  mathToCompass,
  mkPos,
  mkVel,
  toRad,
  toDeg,
} from './mle';

const makeBearing = (lat, lon, ang, tm) => {
  return ({
    pos: {
      lat:lat,
      lon:lon},
    bearing: ang,
    time: tm
  });
}

const bearings =[
  makeBearing(8,2,315,0),
  makeBearing(9,2.5,316.974934,1),
  makeBearing(10,3,319.3987054,2),
  makeBearing(11,3.5,322.431408,3),
  makeBearing(12,4,326.3099325,4),
  makeBearing(13,4.5,331.3895403,5),
  makeBearing(14,5,338.1985905,6),
  makeBearing(15,5.5,347.4711923,7),
  makeBearing(16,5.5,0,8),
  makeBearing(17,5,11.30993247,9),
  makeBearing(18,4.5,19.98310652,10),
  makeBearing(19,4,26.56505118,11),
  makeBearing(20,3.5,31.60750225,12),
  makeBearing(21,3,35.53767779,13),
]

expect.extend({
  toMatchCloseTo(received, expected) {
    for (const kk in expected) {
      if (!received.hasOwnProperty(kk)) {
        return {
          message: () =>
            `expected ${received} to have attribute: ${kk}`,
          pass: false,
        };
      } else {
        let err = expected[kk] - received[kk];
        if (err > 0.000001) {
          return {
            message: () =>
              `expected ${received}.${kk} to be close to ${expected[kk]}`,
            pass: false,
          };
        }
      }
    }
    return {
      message: () =>
        `expected all ${received} to be close to ${expected}`,
      pass: true,
    };
  },
});

test('can make a position', () => {
  expect(mkPos(1,2)).toEqual({x:1,y:2});
  //expect(mle.mkPos(1,2)).toEqual({x:1,y:2});
});

test('convert compass angle 0deg', () => {
  expect(compassToMath(0)).toBe(90);
  expect(Math.cos(toRad(compassToMath(0)))).toBeCloseTo(0);
  expect(Math.sin(toRad(compassToMath(0)))).toBeCloseTo(1);
});
test('convert compass angle 90deg', () => {
  expect(compassToMath(90)).toBeCloseTo(0);
  expect(Math.cos(toRad(compassToMath(90)))).toBeCloseTo(1);
  expect(Math.sin(toRad(compassToMath(90)))).toBeCloseTo(0);
});
test('convert compass angle 270deg', () => {
  expect(compassToMath(270)).toBe(180);
});

test('convert math angle 0deg', () => {
  expect(mathToCompass(0)).toBe(90);
});
test('convert math angle 45deg', () => {
  expect(mathToCompass(45)).toBe(45);
});
test('convert math angle -45deg', () => {
  expect(mathToCompass(-45)).toBe(135);
});
test('convert math angle 315deg', () => {
  expect(mathToCompass(315)).toBe(135);
});
test('convert math angle 90deg', () => {
  expect(mathToCompass(90)).toBe(0);
});
test('convert math angle 270', () => {
  expect(mathToCompass(270)).toBe(180);
});

test('make a velocity North', () => {
  let crs = 0, spd = 5;
  let exp = {vx:0,vy:5};
  expect(mkVel(crs,spd)).toMatchCloseTo(exp);
});
test('make a velocity East', () => {
  let crs = 90, spd = 5;
  expect(mkVel(crs,spd)).toMatchCloseTo({vx:5,vy:0});
});
test('make a velocity South', () => {
  let crs = 180, spd = 5;
  expect(mkVel(crs,spd)).toMatchCloseTo({vx:0,vy:-5});
});
test('make a velocity West', () => {
  let crs = 270, spd = 5;
  expect(mkVel(crs,spd)).toMatchCloseTo({vx:-5,vy:0});
});
