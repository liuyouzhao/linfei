class Charactor {
  constructor() {
    this.blood = 100;
    this.speed = Config.getParam("charactorSpeed", 0);
    /// 0 is x dir, 0-2*PI, unclockwise
    this.dir = 0;
    this._bodySize = Config.getParam("charactorSize", 0);
    this.box = {};
    this.box.leftTop = new Vec2(0, 0);
    this.box.rightBottom = new Vec2(this._bodySize, this._bodySize);
    this.pedestrian = null;
    this.x = 0;
    this.y = 0;
    this.body = new DiscObject({ center: new Vec2(0, 0), radius: Config.getParam("charactorSize", 0) / 2 });
    this.head = new DiscObject({ center: new Vec2(0, 0), radius: Config.getParam("charactorSize", 0) / 4 });
  }

  bindPedestrian(pd) {
    this.pedestrian = pd;
    this.pedestrian.setCharactorBox(this.box);
  }

  setDirection(dir) {
    this.dir = dir;
  }

  getBodySize() {
    return this._bodySize;
  }

  setLocation(x, y) {
    if(this.pedestrian != null && this.pedestrian.isBumped(x, y)) {
      var map = Map.instance();
      var w = map.width();
      var h = map.height();

      var fdx1 = 0;
      var fdx2 = 0;
      var fdy1 = 0;
      var fdy2 = 0;
      var tx = 0;
      var ty = 0;

      for(var _x = x; _x < w; _x ++, fdx1 ++) {
        if(this.pedestrian.isBumped(_x, y) == false) {
          tx = _x;
          break;
        }
      }
      for(var _x = x; _x >= 0; _x --, fdx2 ++) {
        if(this.pedestrian.isBumped(_x, y) == false) {
          if(fdx2 < fdx1) {
            fdx1 = fdx2;
            tx = _x;
          }
          break;
        }
      }
      for(var _y = y; _y < h; _y ++, fdy1 ++) {
        if(this.pedestrian.isBumped(x, _y) == false) {
          ty = _y;
          break;
        }
      }
      for(var _y = y; _y >= 0; _y --, fdy2 ++) {
        if(this.pedestrian.isBumped(x, _y) == false) {
          if(fdy2 < fdy1) {
            fdy1 = fdy2;
            ty = _y;
          }
          break;
        }
      }

      if(fdx1 < fdy1) {
        x = tx;
      }
      else {
        y = ty;
      }
    }
    this.x = x;
    this.y = y;
    this.body.center.x = this.x;
    this.body.center.y = this.y;
    this.head.center.x = this.x;
    this.head.center.y = this.y;
    this.box.leftTop.x = this.x - 0.5 * this._bodySize;
    this.box.leftTop.y = this.y - 0.5 * this._bodySize;
    this.box.rightBottom.x = this.x + 0.5 * this._bodySize;
    this.box.rightBottom.y = this.y + 0.5 * this._bodySize;
  }

  forward() {
    var dx = Math.cos(this.dir) * this.speed;
    var dy = -Math.sin(this.dir) * this.speed;

    if(this.pedestrian != null) {
      var spd = this.pedestrian.fixSpeed(dx, dy);
      dx = spd.x;
      dy = spd.y;
    }
    this.x += dx;
    this.y += dy;
    this.body.center.x = this.x;
    this.body.center.y = this.y;
    this.head.center.x = this.x + dx * 2;
    this.head.center.y = this.y + dy * 2;
    this.box.leftTop.x = this.x - 0.5 * this._bodySize;
    this.box.leftTop.y = this.y - 0.5 * this._bodySize;
    this.box.rightBottom.x = this.x + 0.5 * this._bodySize;
    this.box.rightBottom.y = this.y + 0.5 * this._bodySize;
  }

  getForwardLocation(dist) {
    var dx = Math.cos(this.dir) * dist;
    var dy = -Math.sin(this.dir) * dist;
    var location = {};
    location.x = this.x + dx;
    location.y = this.y + dy;
    return location;
  }
}
