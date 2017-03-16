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
const Ship = __webpack_require__(6);
const Bullet = __webpack_require__(7);
const Util = __webpack_require__(0);

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
    this.bindKeyHandlers();
    setInterval(
      () => {
        this.game.step();
        this.game.draw(this.ctx);
      },
      20
    );
  }

  bindKeyHandlers() {
    // key('a', function(){ alert('you pressed a!') });
    key('space',
      () => this.game.ship.fireBullet()
    );
    key('up',
      () => this.game.ship.power([0,-1])
    );
    key('up+right',
      () => this.game.ship.power([1,-1])
    );
    key('up+left',
      () => this.game.ship.power([-1,-1])
    );

    key('down',
      () => this.game.ship.power([0,1])
    );
    key('down+right',
      () => this.game.ship.power([1,1])
    );
    key('down+left',
      () => this.game.ship.power([-1,1])
    );


    key('left',
      () => this.game.ship.power([-1,0])
    );
    key('right',
      () => this.game.ship.power([1,0])
    );

  }
}

module.exports = GameView;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const Ship = __webpack_require__ (6);
const Bullet = __webpack_require__(7);
const MovingObject = __webpack_require__(4);


const DEFAULTS = {
  COLOR: 'grey',
  RADIUS: 15,
  SPEED: 5,
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.radius = Math.floor(Math.random() * 10) + 5;
    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
  }

  collideWith(otherObject) {
    console.log('collideWith');
    if (otherObject instanceof Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Bullet) {
      console.log('bullet hit');
      this.game.remove(otherObject);
      this.game.remove(this);
    }
    // this.game.remove(this);
    // this.game.remove(otherObject);
  }
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
    this.isBoundable = true;
    this.isBouncy = true;
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

  move() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    let shift = [1,1];
    if (this.game.xBounded(this.pos, this.radius)) {shift[0] = -1;}
    if (this.game.yBounded(this.pos, this.radius)) {shift[1] = -1;}
    const outOfBounds = shift[0] === -1 || shift[1] === -1;

    if (outOfBounds && this.isBoundable) {
      this.pos = [this.pos[0] - this.vel[0], this.pos[1] - this.vel[1]];
      if (this.isBouncy) {
        this.vel = [this.vel[0] * shift[0], this.vel[1] * shift[1]];
        // this.move();
      } else {
        this.vel = [0,0];
      }
    }
    else if (outOfBounds) {
      this.game.remove(this);
    }
    // const shift = this.game.changeDirection(this.pos);
    // this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    // if (this.isWrappable) {
    //   this.pos = this.game.wrap(this.pos);
    // } else if (this.game.isOutOfBounds(this.pos)) {
    //   this.game.remove(this);
    // }
  }



  isCollideWith(otherObject) {
    const minDistance = this.radius + otherObject.radius;
    const currentDistance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) + Math.pow((this.pos[1] - otherObject.pos[1]), 2));
    // console.log(minDistance, currentDistance);
    return (minDistance >= currentDistance);
  }

  collideWith(otherObject) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const MovingObject = __webpack_require__(4);
const Bullet = __webpack_require__(7);

class Ship extends MovingObject {
  constructor(options = {}){
    options.color = 'blue';
    options.radius = 10;
    super(options);

    this.startingVel = this.vel; //can delete this, didn't work with 'relocate'
    this.startingPos = this.pos;
    this.isBouncy = false;
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
    const speed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    const factor = this.game.BULLET_SPEED / speed;
    const vel = [this.vel[0] * factor, this.vel[1] * factor];
    this.game.bullets.push(new Bullet({pos: this.pos, game: this.game, vel}));
  }

  collideWith(otherObject) {

  }
}

module.exports = Ship;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(4);
const Asteroid = __webpack_require__(3);

class Bullet extends MovingObject {
  constructor (options = {}) {
    options.radius = 3;
    options.color = 'black';
    super(options);

    // this.isWrappable = false;
    this.isBoundable = false;
    this.isBouncy = false;
  }

  // collideWith(otherObject) {
  //   if (otherObject instanceof Asteroid) {
  //     console.log('bullet hit');
  //     // this.game.remove(otherObject);
  //     // this.game.remove(this);
  //   }
  // }

}

module.exports = Bullet;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map