class ViewPort {
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

  convertToViewPosition(x, y) {
    var rt = {};
    rt.x = x + this.offx;
    rt.y = y + this.offy;
    return rt;
  }

  rectInsideView(lt, rb) {
    if(lt.x > this.w || lt.y > this.h || rb.x < 0 || rb.y < 0) {
         return false;
    }
    return true;
  }

  pointInsideView(x, y) {
    if(x < 0 || x > this.w || y < 0 || y > this.h) {
      return false;
    }
    return true;
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
