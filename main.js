// Classes
class Entity {
  constructor(x,y) {
    // console.log('new entity made');
    this.x = x;
    this.y = y;
    this.width = this.height = 50;
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
    var b = new Bullet(this.x, this.y - this.height);
    b.y -= b.height;
    console.log(this);
    console.log(b);
    game.entities.push(b);
  }
}
class Enemy extends Entity {
  constructor(x,y) {
    super(x,y);
    this.color = "red";
  }
  update() {

  }
}
class Bullet extends Entity {
  constructor(x,y) {
    super(x,y);
    this.color = "black";
    this.width = this.height = 10;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
  update() {
    this.y -= BULLET_SPEED;
  }
}
// Globals & Constants
const FPS = 30;
const FRAME_LENGTH = 1000 / 30; // in milliseconds
const SHOTS_PER_SECOND = 0.5;
const BULLET_SPEED = 30;

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
  game.entities.push(new Enemy(game.width / 2.0, 100));
  // Start game gameLoop
  setInterval(gameLoop, FRAME_LENGTH);
  // Hack player to shoot every second
  setInterval(function() {game.player.shoot()}, SHOTS_PER_SECOND * 1000);
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
