
//const mle = require('./mle');
import {
  compassToMath,
  mathToCompass,
  mkPos,
  mkPosRel,
  mkVel,
  mkCrsSpd,
  toRad,
  toDeg,
  displacement,
  displace,
  initEst,
  posAtTime,
  posAfter,
  angleBetween,
  angularDiff,
} from './geom';

expect.extend({
  toMatchCloseTo(received, expected, margin=0.000001) {
    for (let kk in expected) {
      if (!received.hasOwnProperty(kk)) {
        //console.log("missing prop:",kk);
        return {
          message: () =>
            `expected ${JSON.stringify(received)} to have attribute: ${kk}`,
          pass: false,
        };
      } else {
        let err = Math.abs(expected[kk] - received[kk]);
        if (err > margin) {
          return {
            message: () =>
              `expected attribute ${kk} ${received[kk]} to be within ${margin} of ${expected[kk]}`,
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


describe("converting frames of reference", () => {
  describe("from compass angles to math", () => {
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
  });
  describe("from compass angles to math", () => {
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
  });
});

describe("Courses, speeds, and velocities", () => {
  describe("Making velocities", () => {
    it('make a velocity North', () => {
      let crs = 0, spd = 5;
      let exp = {vx:0,vy:5};
      expect(mkVel(crs,spd)).toMatchCloseTo(exp);
    });
    it('make a velocity East', () => {
      let crs = 90, spd = 5;
      expect(mkVel(crs,spd)).toMatchCloseTo({vx:5,vy:0});
    });
    it('make a velocity South', () => {
      let crs = 180, spd = 5;
      expect(mkVel(crs,spd)).toMatchCloseTo({vx:0,vy:-5});
    });
    it('make a velocity West', () => {
      let crs = 270, spd = 5;
      expect(mkVel(crs,spd)).toMatchCloseTo({vx:-5,vy:0});
    });
  });
  describe("Making courses and speeds", () => {
    it('from a velocity North', () => {
      let vel = {vx:0,vy:5};
      let exp = {crs: 0, spd:  5};
      expect(mkCrsSpd(vel)).toMatchCloseTo(exp);
    });
    it('from a velocity East', () => {
      let vel = {vx:5,vy:0};
      let exp = {crs: 90, spd:  5};
      expect(mkCrsSpd(vel)).toMatchCloseTo(exp);
    });
    it('from a velocity North East', () => {
      let vel = {vx:5,vy:5};
      let exp = {crs: 45, spd: 5*Math.sqrt(2)};
      expect(mkCrsSpd(vel)).toMatchCloseTo(exp);
    });
    it('from a velocity South West', () => {
      let vel = {vx:-5,vy:-5};
      let exp = {crs: 180+45, spd: 5*Math.sqrt(2)};
      expect(mkCrsSpd(vel)).toMatchCloseTo(exp);
    });
  });
});

describe("making positions and moving them", () => {
  it('can make a position', () => {
    expect(mkPos(1,2)).toEqual({x:1,y:2});
  });

  it('can make a relative position', () => {
    expect(mkPosRel(mkPos(1,2), 0, 2)).toMatchCloseTo({x:1,y:4});
    expect(mkPosRel(mkPos(1,2), 90, 2)).toMatchCloseTo({x:3,y:2});
  });

  it('makes a displacement East', () => {
    let vel = mkVel(90, 5);
    let dur = 2;
    expect(displacement(vel, dur)).toMatchCloseTo({dx:10,dy:0});
  });

  it('makes a displacement South', () => {
    let vel = mkVel(180, 5);
    let dur = 2;
    expect(displacement(vel, dur)).toMatchCloseTo({dx:0,dy:-10});
  });

  it('computes a new pos from a displacement', () => {
    let vel = mkVel(180, 5);
    let pos = mkPos(1,2);
    let dur = 2;
    let disp = displacement(vel, dur);

    expect(displace(pos, disp)).toMatchCloseTo({x:1,y:-8});
  });

  it('can make tracker', () => {
    let vel = mkVel(180, 5);
    let pos = mkPos(1,2);
    let time = 2;
    expect(initEst(pos,vel,time)).toHaveProperty("A");
    expect(initEst(pos,vel,time)).toHaveProperty("A.x",pos.x);
    expect(initEst(pos,vel,time)).toHaveProperty("A.y", pos.y);
    expect(initEst(pos,vel,time)).toHaveProperty("V");
    expect(initEst(pos,vel,time)).toHaveProperty("V.dx", vel.dx);
    expect(initEst(pos,vel,time)).toHaveProperty("V.dy", vel.dy);
    expect(initEst(pos,vel,time)).toHaveProperty("t0", time);
  });

  it('can displace a pos based on a vel and a time', () => {
    let vel = mkVel(180, 5);
    let pos = mkPos(1, 2);
    let expected = {
      x: pos.x,
      y: pos.y - 5,
    };
    let newPos = posAfter(pos, vel, 1);
    expect(newPos).toMatchCloseTo(expected);
  });

  it('can make a new position from a tracker and a time', () => {
    let vel = mkVel(180, 5);
    let pos = mkPos(1, 2);
    let t0 = 2;
    let t1 = 3;
    let tracker = initEst(pos, vel, t0);
    let expected = {
      x: pos.x,
      y: pos.y - 5,
    };
    expect(posAtTime(tracker, t1)).toMatchCloseTo(expected);
  });
});

describe('calculating relative angles', () => {
  describe('along cardinal directions', () => {
    it('bearing due North', () => {
      let A = mkPos(0,5), O = mkPos(0, 0);
      expect(angleBetween(A, O)).toBe(0);
    });
    it('bearing due South', () => {
      let A = mkPos(0,-5), O = mkPos(0, 0);
      expect(angleBetween(A, O)).toBe(180);
    });
    it('bearing due East', () => {
      let A = mkPos(5,0), O = mkPos(0, 0);
      expect(angleBetween(A, O)).toBe(90);
    });
    it('bearing due West', () => {
      let A = mkPos(-5,0), O = mkPos(0, 0);
      expect(angleBetween(A, O)).toBe(270);
    });
  });
  it('beaks nicely on collision', () => {
    let A = mkPos(0,0), O = mkPos(0, 0);
    expect(angleBetween(A, O)).toBeUndefined();
  });
  describe('along diagonals', () => {
    it('upper right quadrant', () => {
      let A = mkPos(10,15), O = mkPos(5, 10);
      expect(angleBetween(A, O)).toBe(45);
    });
    it('lower right quadrant', () => {
      let A = mkPos(10,5), O = mkPos(5, 10);
      expect(angleBetween(A, O)).toBe(135);
    });
    it('upper left quadrant', () => {
      let A = mkPos(0,15), O = mkPos(5, 10);
      expect(angleBetween(A, O)).toBe(315);
    });
    it('lower left quadrant', () => {
      let A = mkPos(0,5), O = mkPos(5, 10);
      expect(angleBetween(A, O)).toBe(225);
    });
  });
});

describe("comparing angles", () => {
  it("difference betwen NW and NE is 90degs", () => {
    expect(angularDiff(315, 45)).toBe(90);
    expect(angularDiff(45, 315)).toBe(90);
  });
  it("difference betwen N and NE is 45degs", () => {
    expect(angularDiff(0, 45)).toBe(45);
    expect(angularDiff(45, 0)).toBe(45);
  });
  it("difference betwen N and NW is 45degs", () => {
    expect(angularDiff(0, 315)).toBe(45);
    expect(angularDiff(315, 0)).toBe(45);
  });
  it("difference betwen S and SSE is 22.5degs", () => {
    expect(angularDiff(180, 180-22.5)).toBe(22.5);
    expect(angularDiff(180-22.5, 180)).toBe(22.5);
  });
});
