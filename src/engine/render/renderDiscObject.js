class RenderDiscObject extends RenderObject {
  constructor(id, x, y, r) {
    super(id, x, y);
    this.innerObject = new DiscObject({ center: new Vec2(x, y), radius: r });
  }

  move(x, y) {
    super.move(x, y);
    this.innerObject.center.x = x;
    this.innerObject.center.y = y;
  }

  render(ctx) {
    ctx.save();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    this.innerObject.path(ctx);
    ctx.fill();

    ctx.restore();
  }

}
