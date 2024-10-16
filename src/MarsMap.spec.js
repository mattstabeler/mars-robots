const MarsMap = require("./MarsMap.js")

describe("MarsMap", () => {

  let map;

  beforeEach(() => {
    map = new MarsMap(3, 4);
  })

  it("Should define basic properties", () => {

    expect(map.x).toBe(3);
    expect(map.y).toBe(4);
    expect(map.badSmell).toEqual({});

  })

  describe("Lost robots", () => {

    it("Should record a scent when a robot is lost", () => {
      map.reportLost(1, 2, "N");
      expect(map.badSmell[`12N`]).toBe(true);
    })

    it("Should have a scent when a robot is reported lost", () => {
      map.reportLost(2, 3, "W");
      expect(map.hasScent(2, 3, "W")).toBe(true)
    })

    it("Should not have a scent for a location not reported", () => {
      expect(map.hasScent(4, 4, "S")).toBe(false)
    })

  })





})