class GameMovableObject extends GameObject {
  constructor(id, x, y) {
    super(id, x, y);
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.speed = 1;
    this.dx = 1;
    this.dy = 0;
  }

  getDx() {
    return this.dx;
  }

  getDy() {
    return this.dy;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  getSpeed() {
    return this.speed;
  }

  step(tx, ty) {
    this.move(this.x + tx, this.y + ty);
  }

  forward() {
    var fx = this.dx * this.speed;
    var fy = this.dy * this.speed;
    this.move(this.x + fx, this.y + fy);
  }

  backward() {
    var fx = this.dx * this.speed;
    var fy = this.dy * this.speed;
    this.move(this.x - fx, this.y - fy);
  }

  turnBack() {
    this.angle = Config.PI() - this.angle;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.onEvent("onMove", {x:this.x, y:this.y}, this);
  }

  setAngle(angle) {
    this.angle = angle;
    this.dx = Math.cos(this.angle);
    this.dy = -Math.sin(this.angle);
    this.onEvent("onChangeAngle", angle, this);
  }

  getAngle() {
    return this.angle;
  }
}
