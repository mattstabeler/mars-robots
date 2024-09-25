
const moves = {
  // BOTTOM LEFT is 0,0
  N : { x:  0,  y :  1,  symbol: "^"},
  E : { x:  1,  y :  0,  symbol: ">" },
  S : { x:  0,  y : -1,  symbol: "v" },
  W : { x: -1,  y :  0,  symbol: "<" },
}

const rotatations = {
  right : {
    N : "E",
    E : "S",
    S : "W",
    W : "N",
  },
  left : {
    N : "W",
    E : "N",
    S : "E",
    W : "S",
  }
}


class Map {

  // the upper-right coordinates of the rectangular world, the lower-left
  // coordinates are assumed to be 0, 0.
  constructor(x, y) {

    this.x = x;
    this.y = y;

    this.robots = { };
    this.badSmell = {

    }
  }

  register(r) {
    this.robots[r.id] = r;
  }

  hasScent(x, y, direction) {
    return this.badSmell?.[`${x}${y}${direction}`];
  }

  reportLost(x, y, direction) {
    this.badSmell[`${x}${y}${direction}`] = true;
  }

  locations() {
    const locs = [];
    for(const r in this.robots) {
      const robot = this.robots[r];
      locs.push(robot.report())
    }
    return locs;
  }

}

class Robot {

  constructor(id, x, y, direction, map) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.map = map;
    this.lost = false;

  }

  left() {
    // console.log("turn left")
    if(this.lost) {
      return this;
    }
    this.direction = rotatations.left[this.direction];
    this.log(`turn left, now facing ${this.direction}`)
    return this;
  }

  right() {

    if(this.lost) {
      return this;
    }

    this.direction = rotatations.right[this.direction];
    this.log(`turn right, now facing ${this.direction}`)

    return this;

  }

  forward() {

    if(this.lost) {
      return this;
    }

    if(this.detectSmell()) {
      this.log(`Bad smell at ${this.x}, ${this.y}, ${this.direction}, not moving, ✋🏻`);
      return this;
    }
    this.log("move forward")

    let newX = this.x + moves[this.direction].x
    let newY = this.y + moves[this.direction].y;

    // check co-ordinates
    if(
      newX < 0 || newX > map.x || newY < 0 || newY > this.map.y) {

      this.reportLost();
      this.log("Arrggggg the lost to the infinity of space! 👾 (but still reporting because radios still work right?) :hidethepain:")
      return this;
    }

    this.x = newX;
    this.y = newY;

    // this.map.reportMove(this.id, this.x, this.y, this.direction, this.lost);

    return this;
  }

  reportLost() {
    this.lost = true;
    this.map.reportLost(this.x, this.y, this.direction);
  }


  report() {
    // return { x: this.x, y: this.y, direction: this.direction }
    return `${this.x} ${this.y} ${this.direction}${(this.lost ? " LOST" : "")}`
  }

  detectSmell(x, y, direction) {
    return this.map.hasScent(this.x, this.y, this.direction)
  }
  get position() {
    return `${this.x}, ${this.y}, ${this.direction}`;
  }

  log(message) {
    console.log(`[${this.id} (${this.position})]: ${message}`);
  }
}


// x x x x x
// x x x x x
// x x x x x
let map = new Map(5, 3)

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
