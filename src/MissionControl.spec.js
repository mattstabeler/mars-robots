const { MissionControl  } = require("./MissionControl.js")


describe("MissionControl", () => {

  let missionParams, missionControl;
  beforeEach(() => {
    missionParams = {
      map: { x: 3, y: 5},
      robots:
        [
           { x: 2, y: 1, d: "N", instructions: ["L", "F", "L", "F", "L"]},
           { x: 2, y: 3, d: "W", instructions: ["L","L","L", "F", "L", "F", "L"]},
        ]
    }

    missionControl = new MissionControl();

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

})