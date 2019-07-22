class Light {
  constructor(type) {
    this.type = type;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.strength = 50;

    this.l = 0;
    this.t = 0;
    this.w = 0;
    this.h = 0;

    this.mask = null;
    // 1 : 9, 9 is the direction, 1 is the back
    this.dirOffsetRate = 0.1;
    // height is 0.5*width, width = 2 * strength
    this.hwRate = 0.5;
    this.valid = true;

    this.r = 1;
    this.g = 1;
    this.b = 1;
  }

  setLocation(x, y) {
    this.x = x;
    this.y = y;
  }

  setDirection(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }

  setStength(int st) {
    this.strength = st;
  }

  updateRect() {
    if(this.type == 0) {
      this.l = this.x - this.strength;
      this.t = this.y - this.strength;
      this.w = this.strength * 2;
      this.h = this.w;
    }
    else if(this.type == 1) {
      this.w = this.strength * 2;
      this.h = this.hwRate * this.w;
      this.l = this.x - this.dirOffsetRate * this.w;
      this.t = this.y - this.h * 0.5;
    }
  }

  isVisible(viewRect) {
    if(this.l > viewRect.l + viewRect.w || this.t > viewRect.t + viewRect.h) {
      return false;
    }
    if(this.l + w < viewRect.l || this.t + h < viewRect.t) {
      return false;
    }
    return true;
  }

  updateMask() {
    /* point light */
    if(this.type == 0) {
      this.mask = [];
      var cx = this.w / 2;
      var cy = this.h / 2;
      var r = this.w / 2;
      for(var i = 0; i < this.h; i ++) {
        for(var j = 0; j < this.w; j ++) {
          var dst = Math.sqrt((i - cy) * (i - cy) + (j - cx) * (j - cx));
          var rt = dst / r * 3.14159 * 0.5;
          var param = 1.0 - Math.tan(rt) / 10.0;
          param = param < 0 ? 0 : param;
        }
      }
    }
    /* Direction light */
    else if(this.type == 1) {
    }
  }

  getMask() {
    return this.mask;
  }
}

class Shadow {
  constructor(ctx) {
    this.lightIds = [];
    this.lights = {};
    this.imgData = ctx.getImageData(0, 0, env.screenWidth, env.screenHeight);
  }

  addLight(key, light) {
    this.lightIds.append(key);
    this.lights[key] = light;
  }

  render() {
    for(var i = 0; i < this.lightIds.length; i ++) {
      var id = this.lightIds[i];
      if(this.lights[id].isVisible()) {

      }
    }
  }
}
