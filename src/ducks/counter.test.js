import reducer, { increase, decrease } from "./counter";

describe("ducks counter", () => {
  describe("increase", () => {
    it("icreases count by one", () => {
      let newState = reducer({ count: 10 }, increase());

      expect(newState).toEqual({
        count: 11
      });
    });
    it("allow to increase by other values", () => {
      expect(reducer(undefined, increase(10))).toEqual({
        count: 10
      });
    });
  });
});
describe("ducks counter", () => {
  describe("decrease", () => {
    it("decrease count by one", () => {
      let newState = reducer({ count: 10 }, decrease());

      expect(newState).toEqual({
        count: 9
      });
    });
    it("allow to decrease by other values", () => {
      expect(reducer(undefined, decrease(10))).toEqual({
        count: -10
      });
    });
  });
});

// function sum(a, b) {
//   return a + b;
// }

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });
