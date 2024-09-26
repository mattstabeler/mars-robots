
class MarsMap {

  // the upper-right coordinates of the rectangular world, the lower-left
  // coordinates are assumed to be 0, 0.
  constructor(x, y) {

    this.x = x;
    this.y = y;

    this.robots = { };
    this.badSmell = { };
  }

  register(r) {
    this.robots[r.id] = r;
  }

  hasScent(x, y, direction) {
    return !!this.badSmell?.[`${x}${y}${direction}`];
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

module.exports = MarsMap