const MarsMap = require("./MarsMap.js");
const Robot = require("./Robot.js");

let robot, map;

describe("Robot", () => {

  beforeEach(() => {
    map = new MarsMap(5, 5);
    robot = new Robot("Wall-e", 1, 2, "N", map);
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
  })

  it("Should define basic properties", () => {

    expect(robot.id).toEqual("Wall-e");
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
    expect(robot.direction).toEqual("N");
    expect(robot.map).toBe(map);
    expect(robot.lost).toBe(false);
  })


  describe("Robot movement", () => {

    it("Should turn left to all 4 directions", () => {
      expect(robot.direction).toEqual("N")
      robot.left();
      expect(robot.direction).toEqual("W")
      robot.left();
      expect(robot.direction).toEqual("S")
      robot.left();
      expect(robot.direction).toEqual("E")
      robot.left();
      expect(robot.direction).toEqual("N")

    })

    it("Should turn right to all 4 directions", () => {
      expect(robot.direction).toEqual("N")
      robot.right();
      expect(robot.direction).toEqual("E")
      robot.right();
      expect(robot.direction).toEqual("S")
      robot.right();
      expect(robot.direction).toEqual("W")
      robot.right();
      expect(robot.direction).toEqual("N")
    })


    describe("Moving forwards", () => {
      it("Should move North", () => {
        robot.direction = "N";
        robot.forward()
        const expected = { x: 1, y: 3, direction: "N"}
        expect({  x: robot.x,
                  y: robot.y,
                  direction: robot.direction
                }).toEqual(expected);
      })

      it("Should move South", () => {
        robot.direction = "S";
        robot.forward()
        const expected = { x: 1, y: 1, direction: "S"}
        expect({  x: robot.x,
                  y: robot.y,
                  direction: robot.direction
                }).toEqual(expected);
      })

      it("Should move West", () => {
        robot.direction = "W";
        robot.forward()
        const expected = { x: 0, y: 2, direction: "W"}
        expect({  x: robot.x,
                  y: robot.y,
                  direction: robot.direction
                }).toEqual(expected);
      })

      it("Should move East", () => {
        robot.direction = "E";
        robot.forward()
        const expected = { x: 2, y: 2, direction: "E"}
        expect({  x: robot.x,
                  y: robot.y,
                  direction: robot.direction
                }).toEqual(expected);
      })
    })

  })

  describe("Reporting location", () => {
    it("Should report its current location and direction", () => {
      robot.x = 2;
      robot.y = 3;
      robot.direction = "N";
      expect(robot.report()).toEqual("2 3 N");
    })
    it("Should report its current location and direction when lost", () => {
      robot.x = 0;
      robot.y = 0;
      robot.lost = true;
      robot.direction = "S";
      expect(robot.report()).toEqual("0 0 S LOST");
    })
  })

  describe("Reporting lost", () => {
    it("Should mark itself lost", () => {
      robot.reportLost();
      expect(robot.lost).toBe(true);
    })

    it("Should report itself lost to the Map", () => {
      jest.spyOn(map, "reportLost");
      robot.x = 0;
      robot.y = 0;
      robot.direction = "W";
      robot.reportLost();
      expect(map.reportLost).toHaveBeenCalledWith(0, 0, "W");

    })
  })

  describe("Getting lost", () => {
    it("Should report itself lost when moving off the edge of the map", () => {

      robot.x = 0;
      robot.y = 0;
      robot.direction = "W";

      expect(robot.lost).toBe(false);
      jest.spyOn(robot, "reportLost");
      robot.forward();

      expect(robot.reportLost).toHaveBeenCalled();
      expect(robot.lost).toBe(true);

    })

    describe("Lost robot", () => {

      it("Should not turn when lost", () => {
          robot.lost = true;
          robot.direction = "N";

          robot.left();
          expect(robot.direction).toEqual("N")
          robot.right();
          expect(robot.direction).toEqual("N")
      })

      it("Should not move forward when lost", () => {
        expect(robot.lost).toBe(false);

        robot.x = 2;
        robot.y = 2;
        robot.direction = "N";
        robot.lost = true;
        robot.forward();

        const expected = { x: 2, y: 2, direction: "N" }
        expect({  x: robot.x,
                  y: robot.y,
                  direction: robot.direction
                }).toEqual(expected);

        expect(robot.lost).toBe(true);

      })
    })

  })

  describe("Detecting a scent", () => {

    it("Should not move forward when a scent is detected in that direction", () => {
      robot.x = 0;
      robot.y = 0;
      robot.direction = "W";
      // map.reportLost(0,0, "W");
      jest.spyOn(robot, "detectSmell").mockReturnValue(true);


      robot.forward();
      expect(robot.detectSmell).toHaveBeenCalled();
      const expected = { x: 0, y: 0, direction: "W" }
      expect({  x: robot.x,
                y: robot.y,
                direction: robot.direction
              }).toEqual(expected);

    })

    it("Should detect a scent from the Map", () => {

      robot.x = 1;
      robot.y = 2;
      robot.direction = "N";
      jest.spyOn(map, "hasScent");
      robot.forward();
      expect(map.hasScent).toHaveBeenCalledWith(1, 2, "N");
    })
  })

})