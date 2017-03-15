const Game = require('./game.js');

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
