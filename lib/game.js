const Asteroid = require('./asteroid.js');
const Util = require('./util.js');

const DIM_X = 200;
const DIM_Y = 200;
const NUM_ASTEROIDS = 10;


class Game {
  constructor () {
    this.asteroids = [];

    this.addAsteroids();
  }

  addAsteroids () {
    for(let i = 0; i < NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid);
    }
  }

  randomPosition () {
    let x = Math.floor(Math.random() * DIM_X);
    let y = Math.floor(Math.random() * DIM_Y);
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect();
    this.asteroids.forEach( (asteroid) => {
      asteroid.draw();
    });
  }

  moveObjects() {
    this.asteroids.forEach( (asteroid) => {
      asteroid.move();
    });
  }
}

module.exports = Game;
