const moves = {
  // BOTTOM LEFT is 0,0
  N : { x:  0,  y :  1,  symbol: "^"},
  E : { x:  1,  y :  0,  symbol: ">" },
  S : { x:  0,  y : -1,  symbol: "v" },
  W : { x: -1,  y :  0,  symbol: "<" },
}

const rotations = {
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
    this.direction = rotations.left[this.direction];
    this.log(`turn left, now facing ${this.direction}`)
    return this;
  }

  right() {

    if(this.lost) {
      return this;
    }

    this.direction = rotations.right[this.direction];
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
      newX < 0 || newX > this.map.x || newY < 0 || newY > this.map.y) {

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
    if(process.env.MISSION_MODE == "DEBUG") {
      console.log(`[${this.id} (${this.position})]: ${message}`);
    }
  }
}


module.exports = Robot;
module.exports.config = { moves, rotations};
