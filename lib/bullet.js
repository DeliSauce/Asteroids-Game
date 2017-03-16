const MovingObject = require('./moving_object');
const Asteroid = require('./asteroid');

class Bullet extends MovingObject {
  constructor (options = {}) {
    options.radius = 3;
    options.color = 'black';
    super(options);

    this.isWrappable = false;
  }

  // collideWith(otherObject) {
  //   if (otherObject instanceof Asteroid) {
  //     console.log('bullet hit');
  //     // this.game.remove(otherObject);
  //     // this.game.remove(this);
  //   }
  // }

}

module.exports = Bullet;
