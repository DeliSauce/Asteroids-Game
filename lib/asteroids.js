const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener('DOMContentLoaded', function(){
  const canvasEl = document.getElementById('game-canvas');

  canvasEl.width = 1200;
  canvasEl.height = 400;

  const ctx = canvasEl.getContext('2d');
  const game = new Game();
  new GameView(game, ctx).start();
});
