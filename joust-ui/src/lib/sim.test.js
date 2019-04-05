
import {
  mkPos,
  mkVel,
} from './geom';

import {
  newWorld,
  addVessel,
  nextWorld,
} from './sim';

const buildTestVessel = (x, y, z, c, s, man=null, cls=null) => {
  return {
  pos: mkPos(x,y),
  vel: mkVel(c,s),
  maneuver: man,
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
    expect(updatedWorld.vessels[0].pos).toEqual(mkPos(5,0));
  });
});
