const Game = require('./game');
const MovingObject = require('./moving_object');
const Bullet = require('./bullet');

class Ship extends MovingObject {
  constructor(options = {}){
    options.color = 'pink';
    options.radius = 25;
    // options.gunAngle = 1;
    super(options);

    this.startingVel = this.vel; //can delete this, didn't work with 'relocate'
    this.startingPos = this.pos;
    this.isBouncy = false;
    this.gunAngle = 0;
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI
    // );
    //
    // ctx.fill();

    super.draw(ctx);

    this.image = new Image();
    this.image.src = './lib/ship_icon.png';

    ctx.save();
    ctx.translate(
      this.pos[0],
      this.pos[1]
    );
    // let gunsAngle = 1;
    console.log(this.gunAngle);
    ctx.rotate(this.gunAngle);
    ctx.drawImage(
      this.image,
      - this.radius,
      - this.radius,
      this.radius * 2,
      this.radius * 2
    );
    ctx.restore();
    // ctx.rotate(-this.gunAngle);
    // ctx.translate(
    //   -this.pos[0],
    //   -this.pos[1]
    // );

  }

  relocate (){
    this.pos = this.startingPos;
    this.vel = this.startingVel; // this doesn't work for some reason
    this.vel = [0,0];
  }

  rotate (dir) {
    let rads = Math.PI / 16;
    let a = (dir === 'left' ? -rads : rads);
    this.gunAngle = (this.gunAngle + a) % (Math.PI * 2);
    // console.log(this.gunAngle);
  }

  power (impulse){
    this.vel[0] += (Math.abs(this.vel[0] + impulse[0]) > this.game.MAX_SPEED ? 0 : impulse[0]);
    this.vel[1] += (Math.abs(this.vel[1] + impulse[1]) > this.game.MAX_SPEED ? 0 : impulse[1]);
  }

  fireBullet() {
    let y = -Math.cos(this.gunAngle);
    let x = Math.sin(this.gunAngle);
    console.log(x,y);

    const speed = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    const factor = this.game.BULLET_SPEED / speed;
    const vel = [x * factor, y * factor];


    this.game.bullets.push(new Bullet({pos: this.pos, game: this.game, vel}));
    //
    //
    // this.game.bullets.push(new Bullet({pos: this.pos, game: this.game, vel}));
  }

  collideWith(otherObject) {

  }
}

module.exports = Ship;
