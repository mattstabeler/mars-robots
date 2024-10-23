const MissionParameters = require("../src/MissionParameters.js");
const { MissionControl } = require("../src/MissionControl.js");

// Sample Input
// 5 3
// 1 1 E
// RFRFRFRF
// 3 2 N
// FRRFLLFFRRFLL
// 0 3 W
// LLFFFLFLFL


// const missionParameters = {

//   map: { x: 5, y: 3},
//   robots:
//     [
//       {
//         x: 1, y: 1, d: "E",
//         instructions: "RFRFRFRF".split("")
//       },
//       { x: 3, y: 2, d: "N",
//         instructions: "FRRFLLFFRRFLL".split("")
//       },
//       { x: 0, y: 3, d: "W",
//         instructions: "LLFFFLFLFL".split("")
//       },
//     ]
// }

((args) => {
  const fname = args?.[2];
  if(fname) {
    (async ()  => {
      try {
        const missionParameters = await MissionParameters.parseMissionData(fname);
        const mission = new MissionControl(missionParameters);
        console.log(mission.missionReport());

      } catch(err){
        console.error("Unable to run mission", err.message);
      }
    })()
  }else {
    console.error("Missing filename");
  }
})(process.argv)
