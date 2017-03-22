const Game = require('./game');

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
    key('a',
     () => this.game.ship.rotate('left')
    );
    key('f',
     () => this.game.ship.rotate('right')
    );
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
