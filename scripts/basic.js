


class Map {

  // the upper-right coordinates of the rectangular world, the lower-left
  // coordinates are assumed to be 0, 0.
  constructor(x, y) {

    this.x = x;
    this.y = y;




  }


}


const moves = {
  N : { x: 1,  y : 0,  symbol: "^"},
  E : { x: 0,  y : 1,  symbol: ">" },
  S : { x: -1, y : 0,  symbol: "v" },
  W : { x: 0,  y : -1, symbol: "<" },
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



class Robot {

  constructor(id, x, y, direction, map) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.map = map;

  }



  left() {
    // console.log("turn left")
    this.direction = rotatations.left[this.direction];
    console.log(`turn left, now facing ${this.direction}`)
  }

  right() {
    this.direction = rotatations.right[this.direction];
    console.log(`turn right, now facing ${this.direction}`)

  }

  forward() {

    console.log("move forward")
    this.x += moves[this.direction].x;
    this.y += moves[this.direction].y;


  }

  report() {
    return `${this.x} ${this.y} ${this.direction}`
  }
}


let map = new Map(7, 4)

// x x x x x x x x
// x x x x x x x x
// x ^ x x x x x x
// x x x x x x x x

let r = new Robot("Dave", 1, 2, "N", map);

console.log(r.report());
r.forward();
console.log(r.report());
r.right();
console.log(r.report());
r.forward();
console.log(r.report());
r.forward();
console.log(r.report());
r.forward();
console.log(r.report());
r.forward();
console.log(r.report());

