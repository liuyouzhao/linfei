class RenderRectObject extends RenderObject {
  constructor(id, x, y, w, h) {
    super.constructor(id, x, y);
    this.innerObject = new RectangleObject({ topleft: new Vec2(x, y), bottomright: new Vec2(x + w, y + h) });
    this.color = "#949494FF";
  }

  move(x, y) {
    super.move(x, y);
    this.innerObject.topleft.x = x; this.innerObject.topleft.y = y;
    this.innerObject.bottomright.x = x; this.innerObject.bottomright.y = x;
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
