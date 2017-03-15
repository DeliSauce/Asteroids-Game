const Util = require('./util');

class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    // this.isWrappable = true;
  }
  // Write a MovingObect.prototype.draw(ctx) method. Draw a circle of the appropriate radius centered at pos. Fill it with the appropriate color. Refer to the Drunken Circles demo if you need a refresher on Canvas.
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    );

    ctx.fill();

  }
  // Write a MovingObject.prototype.move method. Increment the pos by the vel.
  move() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.pos = this.game.wrap(this.pos);
    // this.pos = [this.pos[0] + 1, this.pos[1] + 1];
  }

  isCollideWith(otherObject) {
    const minDistance = this.radius + otherObject.radius;
    const currentDistance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) + Math.pow((this.pos[1] - otherObject.pos[1]), 2));
    // console.log(minDistance, currentDistance);
    return (minDistance >= currentDistance);
  }

  collideWith(otherObject) {
    console.log('collideWith');
    this.game.remove(this);
    this.game.remove(otherObject);
  }

}


module.exports = MovingObject;
