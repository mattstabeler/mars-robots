const Robot = require('./Robot.js')
const MarsMap = require('./MarsMap.js')

class MissionControl {

  constructor(missionParams = null) {
    this.map = null;
    this.robots = [];

    if(missionParams) {
      this.loadMissionParameters(missionParams);
      this.runMission()
    }
  }

  loadMissionParameters(missionParams) {

    // load up mission config
    // this.parameters = parameters;
    // Map x, y
    // Robots [
    //  { x, y, d, instructions: ["L", "R", "F"] }
    //  { x, y, d, instructions: ["L", "R", "F"] }
    //  { x, y, d, instructions: ["L", "R", "F"] }
    // ]
    //
    //
    const mapParams = missionParams.map;

    this.map = new MarsMap(mapParams.x, mapParams.y)

    const robotParams = missionParams.robots || [];

    robotParams.forEach((r, idx) => {
      const robotId = `Robot-${idx+1}`;

      const robot = new Robot(robotId, r.x, r.y, r.d, this.map);
      const robotData  =  {
        robot: robot,
        instructions: r?.instructions || []
      }

      this.robots.push(robotData);
    })
  }

  runMission() {
    // process all robot moves
    //
    this.robots.forEach(r => {

      const robot = r.robot;
      const instructions = r.instructions;

      instructions.forEach(move => {
        switch(move) {
          case "L":
            // code block
            robot.left();
            break;
          case "R":
            robot.right();
            // code block
            break;
          case "F":
            robot.forward();
            // code block
            break;
          default:
            console.log("Not a valid instruction")
            // code block
        }
      })

    })
  }

  locations() {
    const locs = [];
    for(const r in this.robots) {
      const robot = this.robots[r].robot;
      locs.push(robot.report())
    }
    return locs;
  }


  missionReport() {
    // output results
    const robotLocations = this.locations();
    // console.log("robotLocations", robotLocations);
    return robotLocations.join("\n");
  }
}

module.exports = { MissionControl };
