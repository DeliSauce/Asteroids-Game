const Util = require('./util');
const MovingObject = require('./moving_object');


const DEFAULTS = {
  COLOR: 'red',
  RADIUS: 25,
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

  }
}

module.exports = Asteroid;
