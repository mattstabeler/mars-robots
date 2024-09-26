const fs = require('node:fs');
const readline = require('node:readline');

class MissionParameters {

  static async parseMissionData(missionFilePath) {

    // first line is the map size
    // remaining twoline parts are robot positions then movements
    //
    const lines = await this.loadMissionFile(missionFilePath);
    // console.log(lines);

    // Map x, y
    // Robots [
    //  { x, y, d, instructions: ["L", "R", "F"] }
    //  { x, y, d, instructions: ["L", "R", "F"] }
    //  { x, y, d, instructions: ["L", "R", "F"] }
    // ]
    //
    const missionParameters = {
      map: {},
      robots: []
    }

    missionParameters.map = this.parseMapCoords(lines.shift());

    let robotPos;
    while(robotPos = lines.shift()) {
      const robotInstructions = lines.shift();
      const robotData = this.parseRobotLines(robotPos, robotInstructions);
      missionParameters.robots.push(robotData);
    }

    return missionParameters;

  }

  static parseRobotLines(robotPos, robotInstructions) {

      let pos = robotPos.split(" ");
      const robotData = {
          x: parseInt(pos.shift()),
          y: parseInt(pos.shift()),
          d: pos.shift(),
          instructions: robotInstructions.split("")
      }

      return robotData;

  }

  static parseMapCoords(line) {
    let parts = line.split(" ");
    return { x: parts[0], y: parts[1]};
  }


  static async loadMissionFile(fileName) {


    const fileStream = fs.createReadStream(fileName);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const lines = [];
    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      // console.log(`Line from file: ${line}`);
      lines.push(line);
    }
    return lines;

      // return ["5 3",
      //   "1 1 E",
      //   "RFRFRFRF",
      //   "3 2 N",
      //   "FRRFLLFFRRFLL",
      //   "0 3 W",
      //   "LLFFFLFLFL"]

  }
}

module.exports = MissionParameters;
