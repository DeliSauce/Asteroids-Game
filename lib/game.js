const Asteroid = require('./asteroid');
const Ship = require('./ship');
const Bullet = require('./bullet');
const Util = require('./util');

const DIM_X = 1200;
const DIM_Y = 400;
const NUM_ASTEROIDS = 10;


class Game {
  constructor () {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new Ship({game: this, pos: [DIM_X/2, DIM_Y/2], vel: [0,0]});
  }

  allObjects() {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  }

  step() {
    this.moveObjects();
    this.checkCollisions();
  }

  checkCollisions(){
    const allObjects = this.allObjects();
    for(let i = 0; i < allObjects.length; i++) {
      for(let j = 0; j < allObjects.length; j++) {
        if (i !== j) {
          if (allObjects[i].isCollideWith(allObjects[j])) {
            allObjects[i].collideWith(allObjects[j]);
            return;
          }
        }
      }
    }
  }

  addAsteroids () {
    for(let i = 0; i < NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid({game: this}));
    }
  }

  remove (object) {
    if (object instanceof Asteroid) {
      console.log('remove asteroid');
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Bullet) {
      console.log('remove bullet');
      this.bullets.splice(this.bullets.indexOf(object), 1);
    }
  }

  randomPosition () {
    let x = Math.floor(Math.random() * DIM_X);
    let y = Math.floor(Math.random() * DIM_Y);
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    // window.list = this.asteroids;
    this.allObjects().forEach( (asteroid) => {
      asteroid.draw(ctx);
    });
  }

  moveObjects() {
    this.allObjects().forEach( (object) => {
      object.move();
    });
  }

  wrap(pos){
    if (pos[0] > DIM_X) {
      pos[0] = 0;
    } else if (pos[0] < 0) {
      pos[0] = DIM_X;
    }

    if (pos[1] > DIM_Y) {
      pos[1] = 0;
    } else if (pos[1] < 0) {
      pos[1] = DIM_Y;
    }
    return [pos[0], pos[1]];
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0 || pos[0] > DIM_X || pos[1] < 0 || pos[1] > DIM_Y);
  }

}

module.exports = Game;
