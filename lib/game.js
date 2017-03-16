const Asteroid = require('./asteroid');
const Ship = require('./ship');
const Bullet = require('./bullet');
const Util = require('./util');

const MAX = 5;

class Game {
  constructor () {
    this.MAX_SPEED = 6;
    this.BULLET_SPEED = 10;
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new Ship({game: this, pos: [Game.DIM_X/2, Game.DIM_Y/2], vel: [0,0]});
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
    for(let i = 0; i < Game.NUM_ASTEROIDS; i++) {
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
    let x = Math.floor(Math.random() * Game.DIM_X);
    let y = Math.floor(Math.random() * Game.DIM_Y);
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // window.list = this.asteroids;
    this.allObjects().forEach( (asteroid) => {
      asteroid.draw(ctx);
    });
  }

  // changeDirection(pos) {
  //   if (pos[0] === 0 || pos[0] === Game.DIM_X) {
  //     return [-1,1];
  //   } else if (pos[1] === 0 || pos[1] === Game.DIM_Y) {
  //     return [1,-1];
  //   } else {return [1,1];}
  // }

  xBounded(pos, radius) {
    return (pos[0] < 0 + radius || pos[0] > Game.DIM_X - radius);
  }

  yBounded(pos, radius) {
    return (pos[1] < 0 + radius || pos[1] > Game.DIM_Y - radius);
  }

  moveObjects() {
    this.allObjects().forEach( (object) => {
      object.move();
    });
  }

  // wrap(pos){
  //   if (pos[0] > Game.DIM_X) {
  //     pos[0] = 0;
  //   } else if (pos[0] < 0) {
  //     pos[0] = Game.DIM_X;
  //   }
  //
  //   if (pos[1] > Game.DIM_Y) {
  //     pos[1] = 0;
  //   } else if (pos[1] < 0) {
  //     pos[1] = Game.DIM_Y;
  //   }
  //   return [pos[0], pos[1]];
  // }

  // isOutOfBounds(pos) {
  //   return (pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y);
  // }



}

Game.DIM_X = 1200;
Game.DIM_Y = 400;
Game.NUM_ASTEROIDS = 10;


module.exports = Game;
