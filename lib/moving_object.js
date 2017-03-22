// const Ship = require('./ship');
// const Bullet = require('./bullet');
const Util = require('./util');


class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    // this.isWrappable = true;
    this.isBoundable = true;
    this.isBouncy = true;
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

  move() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    let shift = [1,1];
    if (this.game.xBounded(this.pos, this.radius)) {shift[0] = -1;}
    if (this.game.yBounded(this.pos, this.radius)) {shift[1] = -1;}
    const outOfBounds = shift[0] === -1 || shift[1] === -1;

    if (outOfBounds && this.isBoundable) {
      this.pos = [this.pos[0] - this.vel[0], this.pos[1] - this.vel[1]];
      if (this.isBouncy) {
        this.vel = [this.vel[0] * shift[0], this.vel[1] * shift[1]];
        // this.move();
      } else {
        this.vel = [0,0];
      }
    }
    else if (outOfBounds) {
      this.game.remove(this);
    }
    // const shift = this.game.changeDirection(this.pos);
    // this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    // if (this.isWrappable) {
    //   this.pos = this.game.wrap(this.pos);
    // } else if (this.game.isOutOfBounds(this.pos)) {
    //   this.game.remove(this);
    // }
  }



  isCollideWith(otherObject) {
    const minDistance = this.radius + otherObject.radius;
    const currentDistance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) + Math.pow((this.pos[1] - otherObject.pos[1]), 2));
    // console.log(minDistance, currentDistance);
    return (minDistance >= currentDistance);
  }

  collideWith(otherObject) {

  }

}


module.exports = MovingObject;
