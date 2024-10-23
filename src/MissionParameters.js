const fs = require('node:fs');
const readline = require('node:readline');

const Validate = require("./Validate");


const MAP_MIN_COORD = 0;
const MAP_MAX_COORD = 50;

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

      // make sure we have two lines of robot data
      if(!(robotPos && robotInstructions)) {
        throw new Error("Missing robot instruction data")
      }

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

      // validate instructions only contain L,R and F
      if(!Validate.isValidMovementString(robotInstructions)){
        throw new Error("Invalid robot movement instructions");
      }

      let pos = robotPos.split(" ");

      // validate
      if(pos.length != 3) {
        throw new Error("Incorrect number of robot position data elements");
      }

      const robotData = {
          x: parseInt(pos.shift()),
          y: parseInt(pos.shift()),
          d: pos.shift(),
          instructions: robotInstructions.split("")
      }

      // validate robot posision data
      if(!(
          Validate.isPositiveIntegerBetween(robotData.x, MAP_MIN_COORD, MAP_MAX_COORD) &&
          Validate.isPositiveIntegerBetween(robotData.y, MAP_MIN_COORD, MAP_MAX_COORD) &&
          Validate.isValidCardinalDirection(robotData.d)
        )) {
        throw new Error("Invalid robot position data");
      }

      return robotData;

  }

  static parseMapCoords(line) {

    if(line.length < 3) {
      throw new Error("Invalid map dimensions");
    }

    let parts = line.split(" ");
    // validate

    // more than 2 entries on this line
    if(parts.length > 2) {
      throw new Error("Too many map dimensions");
    }

    // either entry is a positive integer between 0 and 50
    if(parts.find(n => !(Validate.isPositiveIntegerBetween(n, MAP_MIN_COORD, MAP_MAX_COORD)))) {
      throw new Error("Invalid map coordinates, must be positive integers between 0 and 50");
    }

    return { x: Number.parseInt(parts[0]), y: Number.parseInt(parts[1])};
  }




  static async loadMissionFile(fileName) {

    if(!fs.existsSync(fileName)) {
      throw new Error(`File does not exist: ${fileName}`);
    }

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