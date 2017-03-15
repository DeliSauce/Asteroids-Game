const MovingObject = require('./moving_object');

class Ship extends MovingObject {
  constructor(options = {}){
    options.color = 'blue';
    options.radius = 10;
    super(options);

    this.startingVel = options.vel;
    this.startingPos = options.pos;
  }

  relocate (){
    this.pos = this.startingPos;
    this.vel = this.startingVel;
  }

  power (impulse){

  }
}

module.exports = Ship;
