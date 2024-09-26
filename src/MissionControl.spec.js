const { MissionControl } = require("./MissionControl.js")


describe("MissionControl", () => {

  let missionParams, missionControl;
  beforeEach(() => {
    missionParams = {
      map: { x: 3, y: 5},
      robots:
        [
           { x: 2, y: 1, d: "N", instructions: ["L", "F", "L", "F", "L"]},
           { x: 2, y: 3, d: "W", instructions: ["R","L","L", "F", "L", "F", "L"]},
           { x: 1, y: 1, d: "S", instructions: ["F", "F","F","F","F","F","F","F","F","F","F"]},
        ]
    }

    missionControl = new MissionControl();

    jest.spyOn(console, 'log').mockImplementation(jest.fn());

  })

  it("Should define default properties", () => {
    expect(missionControl.map).toBe(null);
    expect(missionControl.robots).toEqual([]);

  })


  describe("Pre-mission", () => {
    it("Should load up missions parameters", () => {


      missionParams.map = { x: 4, y: 6 }
      missionParams.robots = [
       { x: 2, y: 1, d: "N", instructions: ["L", "F", "L", "F", "L"]},
      ]


      missionControl.loadMissionParameters(missionParams);

      expect(missionControl.map).toBeDefined();
      expect(missionControl.robots.length).toBe(1);

      expect(missionControl.map.x).toBe(4);
      expect(missionControl.map.y).toBe(6);


      expect(missionControl.robots[0].robot.x).toBe(2);
      expect(missionControl.robots[0].robot.y).toBe(1);
      expect(missionControl.robots[0].instructions).toEqual(["L", "F", "L", "F", "L"]);

    })

  })

  describe("Run mission", () => {


    it("Should run the mission", () => {
      missionControl.loadMissionParameters(missionParams);
      missionControl.runMission();
      const report = missionControl.missionReport();

      expect(report).toEqual(
        [
        "1 0 E",
        "3 2 N",
        "1 0 S LOST"
        ].join("\r\n")
      );

    })

  })

  describe("Robot locations", () => {

    it("Should report locations for registered Robots", () => {

      const mockLocation = jest.fn();
      mockLocation.mockReturnValueOnce("1 2 E")
        .mockReturnValueOnce("2 3 N")
        .mockReturnValue("3 4 S LOST")

      missionControl.robots = {
        "Robot-1" : { robot: { id: 1, report: mockLocation } },
        "Robot-2" : { robot: { id: 2, report: mockLocation } },
        "Robot-3" : { robot: { id: 3, report: mockLocation } },
      }

      const testLocations = missionControl.locations();
      expect(testLocations.length).toBe(3);
      expect(testLocations).toEqual(expect.arrayContaining(["1 2 E", "2 3 N", "3 4 S LOST"]))
    })

  })


})