
//const mle = require('./mle');
import {
  singleError,
  sumSqrError,
} from './mle';

import {
  mkPos,
  mkVel,
  initEst,
} from './geom';

const makeBearing = (x, y, ang, tm) => {
  return ({
    pos: mkPos(x, y),
    bearing: ang,
    time: tm
  });
}

const perfectTarget = initEst(mkPos(0,10),mkVel(90,2),0);
const flawedTracker = initEst(mkPos(0,10), mkVel(90,2.5),0);

const perfectBearings =[
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
    for (let kk in expected) {
      if (!received.hasOwnProperty(kk)) {
        //console.log("missing prop:",kk);
        return {
          message: () =>
            `expected ${JSON.stringify(received)} to have attribute: ${kk}`,
          pass: false,
        };
      } else {
        let err = expected[kk] - received[kk];
        if (err > 0.000001) {
          //console.log("has prop but off:",kk, err);
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


describe("calculating bearing errors one at a time", () => {
  describe("zero error", () => {
    test('at t0', () => {
      let ob = perfectBearings[0];
      expect(singleError(perfectTarget, ob)).toBeCloseTo(0);
    });
    test('at t1', () => {
      let ob = perfectBearings[1];
      expect(singleError(perfectTarget, ob)).toBeCloseTo(0);
    });
    test('over the whole run', () => {
      let last = 0
      for (let ob of perfectBearings) {
        expect(singleError(perfectTarget, ob)).toBeCloseTo(0);
        expect(singleError(perfectTarget, ob)).toBeCloseTo(last);
        last = singleError(perfectTarget, ob);
      }
    });
  });
  describe("increasing errors", () => {
    test('at t0', () => {
      let ob = perfectBearings[0];
      expect(singleError(flawedTracker, ob)).toBeCloseTo(0);
    });
    test('at t1', () => {
      let ob = perfectBearings[0];
      //console.log("the err:", singleError(flawedTracker, ob))
      expect(singleError(flawedTracker, ob)).toBeCloseTo(0);
    });
    test('over a swath', () => {
      let last = 0
      let ii = 0;
      expect(singleError(flawedTracker, perfectBearings[ii]))
        .toBeCloseTo(0);
      last = singleError(flawedTracker, perfectBearings[ii]);
      for (ii = 1; ii < 9; ii++) { // errors start to decrease again...
        //console.log(ii, last);
        expect(singleError(flawedTracker, perfectBearings[ii]))
          .toBeGreaterThan(last);
        last = singleError(flawedTracker, perfectBearings[ii]);
      }
    });
  });
});
