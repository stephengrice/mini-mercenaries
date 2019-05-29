class Entity {
  constructor(x,y) {
    console.log('new entity made');
    this.x = x;
    this.y = y;
    this.width = 25;
    this.color = "black";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, 0, 2*Math.PI);
    ctx.fill();
  }
}

class Player extends Entity {
  constructor(x,y) {
    super(x,y);
    this.color = "blue";
  }
}
class Enemy extends Entity {
  constructor(x,y) {
    super(x,y);
    this.color = "red";
  }
}

function init() {
  var canvas = document.getElementById('canvas');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var ctx = canvas.getContext('2d');
  new Player(100, 100).draw(ctx);
  new Enemy(100, 101).draw(ctx);
}
window.onload = init;
