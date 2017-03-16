const Game = require('./game');
const MovingObject = require('./moving_object');
const Bullet = require('./bullet');

class Ship extends MovingObject {
  constructor(options = {}){
    options.color = 'blue';
    options.radius = 10;
    super(options);

    this.startingVel = this.vel; //can delete this, didn't work with 'relocate'
    this.startingPos = this.pos;
  }

  relocate (){
    this.pos = this.startingPos;
    this.vel = this.startingVel; // this doesn't work for some reason
    this.vel = [0,0];
  }

  power (impulse){
    this.vel[0] += (Math.abs(this.vel[0] + impulse[0]) > this.game.MAX_SPEED ? 0 : impulse[0]);
    this.vel[1] += (Math.abs(this.vel[1] + impulse[1]) > this.game.MAX_SPEED ? 0 : impulse[1]);
  }

  fireBullet() {
    // this.vel
    const vel = [1,1];
    this.game.bullets.push(new Bullet({pos: this.pos, game: this.game, vel}));
  }

  collideWith(otherObject) {

  }
}

module.exports = Ship;
