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
- defensive coding/error checking
- move the robot location tracking to MissionControl, so that we don't ask a lost robot to report it's location (i.e. track the coords before and after each move)

# TODO: Mission Spec 1

- better input checking when reading file (to check for maximum map size, and movement length)


# TODO: Mission Spec 2

- feature toggle for turning off "scent" logic from Mission 1



## Mission 1 - Example Output

```
$ node ./scripts/runmission.js ./mission-1.txt
1 1 E
3 3 N LOST
2 3 S
```

## Mission 2 - Example Output
```
$ node ./scripts/runmission.js mission-2.txt 
1 3 N
5 1 E
```
