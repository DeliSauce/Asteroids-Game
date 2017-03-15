const Util = require('./util');
const Ship = require ('./ship');
const MovingObject = require('./moving_object');


const DEFAULTS = {
  COLOR: 'red',
  RADIUS: 15,
  SPEED: 5,
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
  }

  collideWith(otherObject) {
    console.log('collideWith');
    if (otherObject instanceof Ship) {
      otherObject.relocate();
    }
    // this.game.remove(this);
    // this.game.remove(otherObject);
  }
}

module.exports = Asteroid;
