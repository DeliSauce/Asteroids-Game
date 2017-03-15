const Game = require('./game.js');

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }


  start() {
    // this.game.moveObjects();
    // this.game.draw(this.ctx);

    setInterval(
      () => this.step(),
      20
    );
  }

  step () {
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }
}

module.exports = GameView;
