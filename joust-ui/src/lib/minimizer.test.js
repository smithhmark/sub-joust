import {
  randomArgs,
  centralArgs,
  argsAround,
  stepwiseDescent,
} from './minimizer';

expect.extend({
  nthItemBetween(received, n, low, high) {
    if (!Array.isArray(received)) {
      return {
        message: () =>
          `expected ${received} to be an array`,
        pass: false,
      };
    }
    let item = received[n];
    if (item > high || item < low) {
      return {
        message: () =>
          `expected ${item} to be in range: ${low} - ${high}`,
        pass: false,
      };
    }
    return {
      message: () =>
        `expected all ${received} to be close to`,
      pass: true,
    };
  },
});

describe("building args from a domain", () => {
  describe("building randome args", () => {
    it("works in 1-dimension", () => {
      let min = -100, max = 100;
      let domain = [{max: max, min:min}];
      let args = randomArgs(domain);
      expect(args).toHaveLength(1);
      expect(args).nthItemBetween(0,min, max);
    });

    it("works in 2-dimension", () => {
      let lo = -100;
      let hi = 100;
      let domain = [
        {max: hi, min: lo},
        {max: hi, min: lo},
      ];
      let args = randomArgs(domain);
      expect(args).toHaveLength(2);
      expect(args).nthItemBetween(0, lo, hi);
      expect(args).nthItemBetween(1, lo, hi);
    });
  });

  describe("picking center of domain for args", () => {
    it("works in 1-dimension", () => {
      let min = -100, max = 100;
      let domain = [{max: max, min:min}];
      let args = centralArgs(domain);
      expect(args).toHaveLength(1);
      expect(args).nthItemBetween(0, min, max);
      expect(args).nthItemBetween(0,-1,1);
    });

    it("works in 2-dimension", () => {
      let lo = -100;
      let hi = 100;
      let domain = [
        {max: hi, min: lo},
        {max: hi, min: lo},
      ];
      let args = centralArgs(domain);
      expect(args).toHaveLength(2);
      expect(args).nthItemBetween(0, lo, hi);
      expect(args).nthItemBetween(1, lo, hi);
      expect(args).nthItemBetween(0,-1,1);
      expect(args).nthItemBetween(1,-1,1);
    });
  });
});


describe('stepwise decent', () => {
  describe('can find neighbors', () => {
    it('finds 1-dim neighbors', () => {
      let domain = [{max: 10, min:-10}];
      expect(argsAround([0],domain)).toEqual([[-1],[1]]);
    });
    it('finds 2-dim neighbors', () => {
      let domain = [
        {max: 10, min:-10},
        {max: 10, min:-10}
      ];
      expect(argsAround([0,0],domain)).toEqual([
        [-1,0],[1,0],
        [0,-1],[0,1],
      ]);
    });
  });

  it('minimizes x*x over -10,10', () => {
    let fn = (x) => {return x*x};
    let domain = [{max: 10, min:-10}];
    let result = stepwiseDescent(fn, [0],  domain, 10);
    expect(result.steps).toBe(0);
    expect(result.val).toBe(0);
    expect(result.args).toEqual([0]);
  });

  it('minimizes (x-2)^2 + 2 over -10,10', () => {
    let fn = (x) => {return (x-2)*(x-2) +2};
    let domain = [{max: 10, min:-10}];
    let result = stepwiseDescent(fn, [0],  domain, 10);
    expect(result.val).toBe(2);
    expect(result.args).toEqual([2]);
    expect(result.steps).toBe(2);
  });

});
