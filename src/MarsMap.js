
class MarsMap {

  // the upper-right coordinates of the rectangular world, the lower-left
  // coordinates are assumed to be 0, 0.
  constructor(x, y) {

    this.x = x;
    this.y = y;
    this.badSmell = { };
  }

  hasScent(x, y, direction) {
    return !!this.badSmell?.[`${x}${y}${direction}`];
  }

  reportLost(x, y, direction) {
    this.badSmell[`${x}${y}${direction}`] = true;
  }


}

module.exports = MarsMap