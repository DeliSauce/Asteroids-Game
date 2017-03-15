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

  addAsteroids () {
    for(let i = 0; i < NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid({game: this}));
    }
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
}

module.exports = Game;
