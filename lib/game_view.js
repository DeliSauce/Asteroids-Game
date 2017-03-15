// const Game = require('./game.js');

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }


  start() {
    setInterval(
      function(){
        this.game.moveObjects();
        this.game.draw();
      },
      2000
    );
  }
}
