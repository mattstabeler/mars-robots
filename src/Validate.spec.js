const Validate = require("./Validate");


describe("Validate", () => {


  describe("isPositiveIntegerBetween", () => {
    let min,max;

    beforeEach(() => {
      min = 0;
      max = 10;
    })

    it("Should return true for a valid number", () => {
        expect(Validate.isPositiveIntegerBetween(2, min, max)).toBe(true);
    })
    it("Should return true for a valid numeric string ", () => {
        expect(Validate.isPositiveIntegerBetween("3", min, max)).toBe(true);
    })

    it("Should return false for a negative number", () => {
        expect(Validate.isPositiveIntegerBetween(-1, min, max)).toBe(false);
    })

    it("Should return false for a non-integer number", () => {
        expect(Validate.isPositiveIntegerBetween(1.23, min, max)).toBe(false);
    })

    it("Should return false for non numeric string", () => {
        expect(Validate.isPositiveIntegerBetween("H", min, max)).toBe(false);
    })
  })


  describe("isValidMovementString", () => {

    it("Should return true for a string only containing LRF characters", () => {
      expect(Validate.isValidMovementString("LRFLRFLF")).toBe(true);
    })
    it("Should return false for a string only containing invalid characters", () => {
      expect(Validate.isValidMovementString("LRFXYZ")).toBe(false);
    })

  })

  describe("isValidCardinalDirection", () => {

    it.each(["N", "E", "S", "W"])("Should return true for a string containing only valid character %s", (D) => {
      expect(Validate.isValidCardinalDirection(D)).toBe(true);
    })

    it.each(["X", "2", 1, "NN"])("Should return false for invalid character %s", (D) => {
      expect(Validate.isValidCardinalDirection(D)).toBe(false);
    })

  })


})