const Asteroid = require('./asteroid');
const Util = require('./util');

const DIM_X = 1200;
const DIM_Y = 400;
const NUM_ASTEROIDS = 10;


class Game {
  constructor () {
    this.asteroids = [];

    this.addAsteroids();
  }

  step() {
    this.moveObjects();
    this.checkCollisions();
  }

  checkCollisions(){
    for(let i = 0; i < this.asteroids.length; i++) {
      for(let j = 0; j < this.asteroids.length; j++) {
        if (i !== j) {
          if (this.asteroids[i].isCollideWith(this.asteroids[j])) {
            this.asteroids[i].collideWith(this.asteroids[j]);
            // console.log('collision');
            return;
          }
        }
      }
    }
    // this.asteroids.forEach( (asteroid, i) => {
    //   this.asteroids.forEach( (otherAsteroid, j) => {
    //     if (i !== j) {
    //       if (asteroid.isCollideWith(otherAsteroid)) {
    //         asteroid.collideWith(otherAsteroid);
    //         console.log('collision');
    //         return;
    //       }
    //     }
    //   });
    // });
  }

  addAsteroids () {
    for(let i = 0; i < NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid({game: this}));
    }
  }

  remove (asteroid) {
    console.log('remove');
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  }

  randomPosition () {
    let x = Math.floor(Math.random() * DIM_X);
    let y = Math.floor(Math.random() * DIM_Y);
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    window.list = this.asteroids;
    this.asteroids.forEach( (asteroid) => {
      asteroid.draw(ctx);
    });
  }

  moveObjects() {
    this.asteroids.forEach( (asteroid) => {
      asteroid.move();
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

}

module.exports = Game;
