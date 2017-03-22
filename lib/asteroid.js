const Util = require('./util');
const Ship = require ('./ship');
const Bullet = require('./bullet');
const MovingObject = require('./moving_object');


const DEFAULTS = {
  COLOR: 'grey',
  RADIUS: 15,
  SPEED: 5,
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.radius = Math.floor(Math.random() * 10) + 5;
    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Bullet) {
      console.log('bullet hit');
      this.game.remove(otherObject);
      this.game.remove(this);
    }
    // this.game.remove(this);
    // this.game.remove(otherObject);
  }
}

module.exports = Asteroid;
