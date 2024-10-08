# Mission to Mars


This project runs Robot missions on Mars! 🤖🤖🤖

There is an example mission file in `mission-1.txt` . 


## Setup

Install npm dependencies (if you want to run tests)

`npm install` 


# Run the mission

`node scripts/runmission.js ./mission-1.txt`

Show some more information when running using the `MISSION_MODE=DEBUG` env var, like: 

`MISSION_MODE=DEBUG node scripts/runmission.js  ./mission-1.txt`


## Notes

Assumes node 20ish. (`nvm use`);

Run tests with `npm run test` or `npm run test:watch` requires `jest`. 

The `MissionControl` class  is responsible for running missions, using `MarsMap` and `Robot`  classes. 

See `scripts/basic.js` for example of moving robots about a map. 


# TODO:

- more test coverage for MissionControl
- better input checking when reading file
- defensive coding/error checking
- move the robot location tracking to MissionControl, so that we don't ask a lost robot to report it's location (i.e. track the   coords before and after each move)


## Example Output

```
$ node ./scripts/runmission.js ./mission-1.txt
1 1 E
3 3 N LOST
2 3 S
```

