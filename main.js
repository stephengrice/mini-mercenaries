// Classes
class Entity {
  constructor(x,y) {
    // console.log('new entity made');
    this.x = x;
    this.y = y;
    this.width = this.height = 50;
    this.color = "black";
    this.dead = false;
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

  collidesWith(entity) {
    return intersectRect(this.getRect(), entity.getRect());
  }

  getRect() {
    return {
      left: this.x - this.width / 2,
      right: this.x + this.width / 2,
      top: this.y - this.height / 2,
      bottom: this.y + this.height / 2
    };
  }

  die() {
    this.dead = true;
  }
}
class Alien extends Entity {
  constructor(x,y) {
    super(x,y);
    this.health = 100;
    var that = this;
    setInterval(function() {
      that.shoot();
    }, SHOTS_PER_SECOND * 1000);
  }
  draw(ctx) {
    super.draw(ctx);
    // Draw health bar
    ctx.fillStyle = "green";
    ctx.fillRect(this.x - this.width / 2, this.y - this.height - HEALTHBAR_HEIGHT * 2, this.width * (this.health / 100), HEALTHBAR_HEIGHT);
  }
  update() {
    // Check for collisions
    for (var i = 0; i < game.entities.length; i++) {
      var entity = game.entities[i];
      if (entity.dead) continue;
      if (this.collidesWith(entity) && entity instanceof Bullet) {
        this.health -= BULLET_DAMAGE;
        console.log("Ouch!");
        entity.die();
      }
    }
    // Remove me if my health is gone
    if (this.health <= 0) {
      this.die();
    }
  }
}
class Player extends Alien {
  constructor(x,y) {
    super(x,y);
    this.color = "blue";
    this.counter = 0;
  }
  update() {
    //
  }
  shoot() {
    if (this.dead) return;
    var b = new Bullet(this.x, this.y - this.height);
    b.direction = 90;
    b.y -= b.height;
    game.entities.push(b);
  }
}
class Enemy extends Alien {
  constructor(x,y) {
    super(x,y);
    this.color = "red";
  }
  update() {
    super.update();
    if (this.y < 100) {
      this.y += 5;
    }
  }
  shoot() {
    if (this.dead) return;
    var b = new Bullet(this.x, this.y + this.height);
    b.direction = 270;
    b.y += b.height;
    game.entities.push(b);
  }
  die() {
    super.die()
    game.entities.push(new Enemy(this.x, -50));
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
const HEALTHBAR_HEIGHT = 10;
const BULLET_DAMAGE = 5;

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
  game.entities.push(new Enemy(game.width / 2.0, -50));
  // Start game gameLoop
  setInterval(gameLoop, FRAME_LENGTH);
}
function gameLoop() {
  draw();
  update();
}
function draw() {
  game.ctx.clearRect(0, 0, game.width, game.height);
  for (var i = 0; i < game.entities.length; i++) {
    if (!game.entities[i].dead)
      game.entities[i].draw(game.ctx);
  }
}
function update() {
  for (var i = 0; i < game.entities.length; i++) {
    if (!game.entities[i].dead)
      game.entities[i].update();
  }
}
function degrees_to_radians(degrees) {
  return degrees * (Math.PI/180);
}
function intersectRect(r1, r2) {
  return !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}
window.onload = init;
