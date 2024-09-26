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



# TODO:

- more test coverage for MissionControl
- better input checking when reading file


## Example Output

```
$ node ./scripts/runmission.js ./mission-1.txt
1 1 E
3 3 N LOST
2 3 S
```

