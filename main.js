// Classes
class Entity {
  constructor(x,y) {
    console.log('new entity made');
    this.x = x;
    this.y = y;
    this.width = 50;
    this.color = "black";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, 0, 2*Math.PI);
    ctx.fill();
  }

  update() {
    console.log('override me');
  }
}
class Player extends Entity {
  constructor(x,y) {
    super(x,y);
    this.color = "blue";
    this.counter = 0;
  }
  update() {
    //
  }
  shoot() {
    console.log('shot');
  }
}
class Enemy extends Entity {
  constructor(x,y) {
    super(x,y);
    this.color = "red";
  }
}
// Globals & Constants
const FPS = 30;
const FRAME_LENGTH = 1000 / 30; // in milliseconds
const SHOTS_PER_SECOND = 0.5;

var game = {};

// Functions
function init() {
  var canvas = document.getElementById('canvas');
  canvas.width = game.width = window.innerWidth;
  canvas.height = game.height = window.innerHeight;
  game.ctx = canvas.getContext('2d');
  game.entities = [];
  // Set up entities
  game.player = new Player(game.width / 2.0, game.height - 100)
  game.entities.push(game.player);
  // Start game gameLoop
  setInterval(gameLoop, FRAME_LENGTH);
  // Hack player to shoot every second
  setInterval(game.player.shoot, SHOTS_PER_SECOND * 1000);
}
function gameLoop() {
  draw();
  update();
}
function draw() {
  game.ctx.clearRect(0, 0, game.width, game.height);
  for (var i = 0; i < game.entities.length; i++) {
    game.entities[i].draw(game.ctx);
  }
}
function update() {
  for (var i = 0; i < game.entities.length; i++) {
    game.entities[i].update();
  }
}
window.onload = init;
