const Robot = require('./Robot.js')
const MarsMap = require('./MarsMap.js')

class MissionControl {

  constructor() {
    this.map = null;
    this.robots = [];
    // const mapParams = parameters.map;

    // this.map = new MarsMap(mapParams.x, mapParams.y)

    // const robotParams = this.parameters.robots || [];

    // robotParams.forEach(r => {
    //   this.robots = {
    //     robot: new Robot("x",r.x, r.y, r.d, this.map),
    //     instructions: r.instructions
    //   }
    // })

    // this.robots = new Map(mapParams.x, this.parameters.map.y)
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
      const robotData  =  {
        robot: new Robot(robotId,r.x, r.y, r.d, this.map),
        instructions: r?.instructions || []
      }

      // this.map.register(robot.id, robot);
      this.robots.push(robotData);
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
}



module.exports = { MissionControl  };
