const fs = require('node:fs');
const readline = require('node:readline');

class MissionParameters {

  static async parseMissionData(missionFilePath) {

    const lines = await this.loadMissionFile(missionFilePath);

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

    // first line is the map size
    // remaining twoline pairs are robot positions and movements
    missionParameters.map = this.parseMapCoords(lines.shift());

    let robotPos;
    while(robotPos = lines.shift()) {
      const robotInstructions = lines.shift();

      const convertedInstructions = this.normaliseRobotInstructions(robotInstructions);

      const robotData = this.parseRobotLines(robotPos, convertedInstructions);

      missionParameters.robots.push(robotData);
    }

    return missionParameters;

  }

  /**
   * This is to support different robor movement data, where move forward is converted from `M`, to `F`
   * @param  {string} string representing instructions e.g. `MLLRLM`
   * @return {string} normalised instruction set, e.g. `FLLRLF`
   */
  static normaliseRobotInstructions(instructions) {
    // replace M's for F's
    return instructions.replaceAll("M", "F");
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
      lines.push(line);
    }
    return lines;
  }
}

module.exports = MissionParameters;
