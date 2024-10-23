class Validate {

  static isPositiveIntegerBetween(n, min, max) {
    // find only positive integers between min and max
    return (Number.isInteger(Number(n)) && n > min && n < max);
  }

  static isValidMovementString(movementString) {
    // match anything other that L,R or F
    return !(movementString.match(/[^LRF]+/g));
  }

  static isValidCardinalDirection(direction) {

    if(typeof direction != "string") {
      return false;
    }

    if(direction.length > 1) {
      return false;
    }

    // match anything other than N,E,S or W
    return !(direction.match(/[^NESW]+/g));
  }

}


module.exports = Validate;