/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  // Return a randomly oriented vector with the given length.
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }



};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(3);
const Util = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }


  start() {
    setInterval(
      () => {
        this.game.step();
        this.game.draw(this.ctx);
      },
      20
    );
  }
}

module.exports = GameView;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(4);


const DEFAULTS = {
  COLOR: 'red',
  RADIUS: 25,
  SPEED: 5,
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
  }

  // collideWith(otherObject) {
  //
  // }
}

module.exports = Asteroid;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    // this.isWrappable = true;
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
  // Write a MovingObject.prototype.move method. Increment the pos by the vel.
  move() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.pos = this.game.wrap(this.pos);
    // this.pos = [this.pos[0] + 1, this.pos[1] + 1];
  }

  isCollideWith(otherObject) {
    const minDistance = this.radius + otherObject.radius;
    const currentDistance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) + Math.pow((this.pos[1] - otherObject.pos[1]), 2));
    // console.log(minDistance, currentDistance);
    return (minDistance >= currentDistance);
  }

  collideWith(otherObject) {
    console.log('collideWith');
    this.game.remove(this);
    this.game.remove(otherObject);
  }

}


module.exports = MovingObject;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const GameView = __webpack_require__(2);

document.addEventListener('DOMContentLoaded', function(){
  const canvasEl = document.getElementById('game-canvas');

  canvasEl.width = 1200;
  canvasEl.height = 400;

  const ctx = canvasEl.getContext('2d');
  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map