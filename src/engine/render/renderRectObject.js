class RenderRectObject extends RenderObject {
  constructor(id, x, y, w, h, c) {
    super(id, x, y);
    this.w = w;
    this.h = h;
    this.innerObject = new RectangleObject({ topleft: new Vec2(x, y), bottomright: new Vec2(x + w, y + h) });
    this.innerObject.diffuse = 0;
    this.color = c;
  }

  move(x, y) {
    super.move(x, y);
    var w = this.w;
    var h = this.h;
    this.innerObject.topleft = new Vec2(x, y);
    this.innerObject.bottomright = new Vec2(x + w, y + h);
    this.innerObject.bounds();
    this.innerObject.syncFromTopleftBottomright();
  }

  render(ctx) {
    ctx.save();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    this.innerObject.path(ctx);
    ctx.fill();

    ctx.restore();
  }

  debugRender(ctx) {
    ctx.save();

    ctx.strokeStyle = "#FF0000FF";
    ctx.strokeRect(this.innerObject.topleft.x, this.innerObject.topleft.y, this.w, this.h);

    ctx.restore();
  }

}
