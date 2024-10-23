

const MissionParameters = require("./MissionParameters");

describe("MissionParameters", () => {


  describe("parseMapCoords", () => {

    it("Should parse map dimensions from a string", ()=> {
      expect(MissionParameters.parseMapCoords("3 4")).toEqual({ x:3, y:4});
    })

    it.each([
        ["3", "Invalid map dimensions"],
        ["3 4 3", "Too many map dimensions"],
        ["X 4", "Invalid map coordinates, must be positive integers between 0 and 50"],
        ["-1 10", "Invalid map coordinates, must be positive integers between 0 and 50"],
        ["2 55", "Invalid map coordinates, must be positive integers between 0 and 50"],
      ])('Should not parse `%s` with error `%s`', (dimensions, errorMessage) => {
        expect(() => {
          MissionParameters.parseMapCoords(dimensions);
        }).toThrow(errorMessage);

      })
  })

  describe("parseRobotLines", () => {

    it("Should parse valid robot Lines", () => {

      const robotPos = "3 4 N";
      const robotInstructions = "FLR";
      const expected = {
          d: "N",
          x: 3,
          y: 4,
          instructions: "FLR".split("")
      }

      expect(MissionParameters.parseRobotLines(robotPos, robotInstructions)).toEqual(expected)

    })

    it.each([
        ["3 4 N", "XXXX" , "Invalid robot movement instructions"],
        ["X X X X", "FLR" , "Incorrect number of robot position data elements"],
        ["3 4 X", "FLR" , "Invalid robot position data"],
        ["3 S N", "FLR" , "Invalid robot position data"],
        ["-1 3 N", "FLR" , "Invalid robot position data"],
        ["0 55 N", "FLR" , "Invalid robot position data"],
      ])('Should not parse `%s`, `%s` with error `%s`', (robotPos, robotInstructions, errorMessage) => {
        expect(() => {
          MissionParameters.parseRobotLines(robotPos, robotInstructions);
        }).toThrow(errorMessage);

      })


  })
})