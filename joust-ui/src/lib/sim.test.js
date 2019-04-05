
import {
  mkPos,
  mkVel,
  dispMagnatude,
  displacement,
} from './geom';

import {
  newWorld,
  addVessel,
  nextWorld,
  turningCircleCenter,
  nextPosInTurn,
} from './sim';

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
          //console.log("has prop but off:",kk, err);
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

const buildTestVessel = (x, y, z, c, s, man=null, cls=null) => {
  return {
  pos: mkPos(x,y),
  vel: mkVel(c,s),
  maneuverOrder: man,
  cls: cls,
  };
};

describe("building the world", () => {
  it("builds an empty world", () => {
    expect(newWorld()).toEqual({vessels: [], classes: {}});
  });
  it("builds a world with no vessels but has classes", () => {
    let classes = {
      cls1: "hi, I'm a class",
      cls2: "I'm also a class",
    };
    expect(newWorld(classes)).toEqual({vessels: [], classes: classes});
  });
  it("can add a vessels to a world", () => {
    let ves = {pos: "Im a dummy pos", };
    let ves2 = {pos: "Im another dummy pos", };
    let world = newWorld();
    addVessel(world, ves);
    expect(world).toHaveProperty("vessels", [ves]);
    addVessel(world, ves2);
    expect(world).toHaveProperty("vessels", [ves, ves2]);
  });
});

describe("updating the world", () => {
  it("empty world unchanged", () => {
    let world = newWorld();
    let duration = 1;
    let updatedWorld = nextWorld(world, duration);
    expect(updatedWorld).toEqual(world);
  });
  it("single vessel on a leg", () => {
    let world = newWorld();
    let testVessel = buildTestVessel(0,0,0,90,5);
    let duration = 1;
    addVessel(world, testVessel);
    let updatedWorld = nextWorld(world, duration);
    expect(updatedWorld).toHaveProperty("vessels");
    expect(updatedWorld).toHaveProperty("classes");
    expect(updatedWorld.vessels.length).toBe(1);
    expect(updatedWorld.vessels[0]).toHaveProperty("pos");
    expect(updatedWorld.vessels[0]).toHaveProperty("vel");
    expect(updatedWorld.vessels[0]).toHaveProperty("maneuverOrder");
    expect(updatedWorld.vessels[0]).toHaveProperty("cls");
    expect(updatedWorld.vessels[0].pos).toEqual(mkPos(5,0));
  });
});

describe('interpreting orders', () => {
  describe('interpreting course change orders', () => {
    it('can find the center of a right turning circle', () => {
      let oldPos = mkPos(0,5);
      let r = 5, rudderDir = "RIGHT";
      let oldheading = 0;
      expect(turningCircleCenter(oldPos,oldheading,r,rudderDir))
        .toMatchCloseTo(mkPos(5,5));
      oldheading = 180;
      expect(turningCircleCenter(oldPos,oldheading,r,rudderDir))
        .toMatchCloseTo(mkPos(-5,5));
    });
    it('can find the center of a left turning circle', () => {
      let oldPos = mkPos(0,5);
      let r = 5, rudderDir = "LEFT";
      let oldheading = 0;
      expect(turningCircleCenter(oldPos,oldheading,r,rudderDir))
        .toMatchCloseTo(mkPos(-5,5));
      oldheading = 180;
      expect(turningCircleCenter(oldPos,oldheading,r,rudderDir))
        .toMatchCloseTo(mkPos(5,5));
    });

    describe("northbound courses", () =>{
      it('can find the new pos along northbound RIGHT turning circle', () => {
        let oldPos = mkPos(0,5);
        let crs = 0, spd = 5;
        let vel = mkVel(0, spd);
        let dur = 1;
        let r = 5, rudderDir = "RIGHT";
        let nextVessel = nextPosInTurn(oldPos, vel, r, rudderDir, dur);
        let expectedPos = mkPos(2.298,9.20);
        let expectedVel = mkVel(57.2957,spd);
        expect(nextVessel).toHaveProperty("pos");
        expect(nextVessel).toHaveProperty("vel");
        expect(nextVessel.pos).toMatchCloseTo(expectedPos, 0.1);
        expect(nextVessel.vel).toMatchCloseTo(expectedVel, 0.001);
      });
      it('can find the new pos along northbound left turning circle', () => {
        let oldPos = mkPos(0,5);
        let crs = 0, spd = 5;
        let vel = mkVel(0, spd);
        let dur = 1;
        let r = 5, rudderDir = "LEFT";
        let nextVessel = nextPosInTurn(oldPos, vel, r, rudderDir, dur);
        let expectedPos = mkPos(-2.298,9.20);
        let expectedVel = mkVel(360 - 57.2857,spd);
        expect(nextVessel).toHaveProperty("pos");
        expect(nextVessel).toHaveProperty("vel");
        expect(nextVessel.pos).toMatchCloseTo(expectedPos, 0.1);
        expect(nextVessel.vel).toMatchCloseTo(expectedVel, 0.001);
      });
    });

    describe("Southbound courses", () =>{
      it('can find the new pos along southbound RIGHT turning circle', () => {
        let oldPos = mkPos(0,5);
        let crs = 180, spd = 5;
        let vel = mkVel(crs, spd);
        let dur = 1;
        let r = 5, rudderDir = "RIGHT";
        let nextVessel = nextPosInTurn(oldPos, vel, r, rudderDir, dur);
        let expectedPos = mkPos(-2.298, 5-4.20);
        let expectedVel = mkVel(180 + 57.2957,spd);
        expect(nextVessel).toHaveProperty("pos");
        expect(nextVessel).toHaveProperty("vel");
        expect(nextVessel.pos).toMatchCloseTo(expectedPos, 0.1);
        expect(nextVessel.vel).toMatchCloseTo(expectedVel, 0.01);
      });

      it('can find the new pos along southbound left turning circle', () => {
        let oldPos = mkPos(0,5);
        let crs = 180, spd = 5;
        let vel = mkVel(crs, spd);
        let dur = 1;
        let r = 5, rudderDir = "LEFT";
        let nextVessel = nextPosInTurn(oldPos, vel, r, rudderDir, dur);
        let expectedPos = mkPos(2.298,5 - 4.20);
        let expectedVel = mkVel(180 - 57.2857,spd);
        expect(nextVessel).toHaveProperty("pos");
        expect(nextVessel).toHaveProperty("vel");
        expect(nextVessel.pos).toMatchCloseTo(expectedPos, 0.01);
        expect(nextVessel.vel).toMatchCloseTo(expectedVel, 0.001);
      });
    });

  });
});
