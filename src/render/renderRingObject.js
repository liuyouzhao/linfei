class RenderRingObject extends RenderObject {
  constructor(id, x, y, r, dx, dy, rs) {
    super.constructor(id, x, y);
    this.innerObject = new DiscObject(){ center: new Vec2(x, y), radius: r });
    this.innerObjectSmall = new DiscObject(){ center: new Vec2(x + dx, y + dy), radius: rs });
    this.color = "#949494FF";
    this.smallColor = "#323232FF";
  }

  setColorSmall(color) {
    this.smallColor = color;
  }

  move(x, y) {
    super.move(x, y);
    this.innerObject.center.x = x;
    this.innerObject.center.y = y;
  }

  alterSmallRelevant(dx, dy) {
    this.innerObjectSmall.center.x = this.x + dx;
    this.innerObjectSmall.center.y = this.y + dy;
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

}
