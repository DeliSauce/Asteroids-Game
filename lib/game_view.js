// const Game = require('./game.js');

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }


  start() {
    this.game.moveObjects();
    this.game.draw(this.ctx);

  //   setInterval(
  //     function(){
  //       this.game.moveObjects();
  //       this.game.draw();
  //     },
  //     2000
  //   );
  }
}

module.exports = GameView;
