const Util = require('./util.js');
const MovingObject = require('./moving_object.js');


const DEFAULTS = {
  COLOR: 'red',
  RADIUS: 25,
  SPEED: 5,
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.COLOR = DEFAULTS.COLOR;
    options.RADIUS = 5;
    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
  }

  collideWith(otherObject) {

  }
}

module.exports = Asteroid;
