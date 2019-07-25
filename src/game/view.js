class View {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.w2 = w / 2;
    this.h2 = h / 2;
    this.offx = 0;
    this.offy = 0;
    this.x = 0;
    this.y = 0;
    this.cx = w * 0.5;
    this.cy = h * 0.5;
  }

  setCenter(mcx, mcy) {
    this.cx = mcx;
    this.cy = mcy;
    this.recalculate();
  }

  recalculate() {
    this.x = this.cx - this.w2;
    this.y = this.cy - this.h2;
    this.offx = -this.x;
    this.offy = -this.y;
  }

  cvt(point) {
    var rt = {};
    rt.x = point.x + this.offx;
    rt.y = point.y + this.offy;
    return rt;
  }

  getOffX() {
    return this.offx;
  }

  getOffY() {
    return this.offy;
  }

  move(dmcx, dmcy) {
    this.cx += dmcx;
    this.cy += dmcy;
    this.recalculate();
  }
}
