class RenderRingObject extends RenderObject {
  constructor(id, x, y, r, dx, dy, rs) {
    super(id, x, y);
    this.innerObject = new DiscObject({ center: new Vec2(x, y), radius: r });
    this.innerObjectSmall = new DiscObject({ center: new Vec2(x + dx, y + dy), radius: rs });
    this.smallColor = "#323232FF";
    this.smallDist = r * 0.25;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.rs = rs;
  }

  getR() {
    return this.r;
  }

  getRs() {
    return this.rs;
  }

  setColorSmall(color) {
    this.smallColor = color;
  }

  move(x, y) {
    super.move(x, y);
    this.innerObject.center.x = x;
    this.innerObject.center.y = y;
    this.alterSmallRelevant(this.dx, this.dy);
  }

  alterSmallRelevant(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    this.innerObjectSmall.center.x = this.x + dx * this.smallDist;
    this.innerObjectSmall.center.y = this.y + dy * this.smallDist;
  }

  render(ctx) {
    ctx.save();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    this.innerObject.path(ctx);
    ctx.fill();

    ctx.fillStyle = this.smallColor;
    ctx.beginPath();
    this.innerObjectSmall.path(ctx);
    ctx.fill();

    ctx.restore();
  }

  dispatchEvent(name, param) {
    switch(name) {
      case "onChangeAngle": {
        var dx = Math.cos(param);
        var dy = -Math.sin(param);
        this.alterSmallRelevant(dx, dy);
        break;
      }
      case "onStartWalking": {
        this.smallDist = this.r * 0.5;
        break;
      }
      case "onStartRunning": {
        this.smallDist = this.r * 0.75;
        break;
      }
      case "onStand": {
        this.smallDist = this.r * 0.1;
        break;
      }
      case "onMove": {
        this.move(param.x, param.y);
      }
    }
  }

}
