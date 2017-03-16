const MovingObject = require('./moving_object');

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
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }
}

module.exports = Ship;
