

const MarsMap = require('../src/MarsMap.js')
const Robot = require('../src/Robot.js')


// x x x x x
// x x x x x
// x x x x x
let map = new MarsMap(5, 3)

// x x x x x
// x > x x x
// x x x x x
let dave = new Robot("Dave", 1, 1, "E", map);

// x x x x x
// x x x x x
// x x x ^ x
let steve = new Robot("Steve", 3, 2, "N", map);

// x x x x x
// x x x x x
// < x x x x
let mike = new Robot("Mike", 0, 3, "W", map);

map.register(dave);
map.register(steve);
map.register(mike);

// RFRFRFRF
dave
  .right()
  .forward()
  .right()
  .forward()
  .right()
  .forward()
  .right()
  .forward()
console.log(dave.report());

// FRRFLLFFRRFLL
steve
  .forward()
  .right()
  .right()
  .forward()
  .left()
  .left()
  .forward()
  .forward()
  .right()
  .right()
  .forward()
  .left()
  .left()
  .left()
console.log(steve.report());


// LLFFFLFLFL
mike
  .left()
  .left()
  .forward()
  .forward()
  .forward()
  .left()
  .forward()
  .left()
  .forward()
  .left()
console.log(mike.report());

console.log("Locations", map.locations());
