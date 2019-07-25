class GameMovableObject extends GameObject {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.speed = 1;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  getSpeed() {
    return this.speed;
  }

  forward() {
    var dx = Math.cos(this.angle) * this.speed;
    var dy = -Math.sin(this.angle) * this.speed;
    this.move(x + dx, y + dy);
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
    this.onEvent("onChangeAngle", this.angle, this);
  }

  getAngle() {
    return angle;
  }
}
