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
    var b = new Bullet(this.x, this.y - this.height);
    b.direction = 90;
    b.y -= b.height;
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
  shoot() {
    var b = new Bullet(this.x, this.y + this.height);
    b.direction = 270;
    b.y += b.height;
    game.entities.push(b);
  }
}
class Bullet extends Entity {
  constructor(x,y) {
    super(x,y);
    this.color = "black";
    this.width = this.height = 10;
    this.direction = 90;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
  update() {
    this.x += BULLET_SPEED * Math.cos(degrees_to_radians(this.direction));
    this.y -= BULLET_SPEED * Math.sin(degrees_to_radians(this.direction));
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
  setInterval(function() {game.player.shoot(); game.entities[1].shoot()}, SHOTS_PER_SECOND * 1000);
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
function degrees_to_radians(degrees) {
  return degrees * (Math.PI/180);
}
window.onload = init;
