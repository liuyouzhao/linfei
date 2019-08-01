class Pedestrian {
  constructor() {
    this.boundingBoxes = [];
    this.charactorBox = {};
  }

  setCharactorBox(box) {
    this.charactorBox = box;
  }

  addBoundingBox(box) {
    this.boundingBoxes.push(box);
  }

  clearBoundigBox() {
    this.boundingBoxes = [];
  }

  isBumped(x, y) {
    var c = this.charactorBox;
    for(var i = 0; i < this.boundingBoxes.length; i ++) {
      var b = this.boundingBoxes[i];
      if(c.topleft.x > b.bottomright.x || c.bottomright.x < b.topleft.x
      || c.topleft.y > b.bottomright.y || c.bottomright.y < b.topleft.y) {}
      else {
        return true;
      }
    }
  }

  fixSpeed(charactorBox, dx, dy) {
    var fixed = new Vec2(dx, dy);

    this.charactorBox = charactorBox;

    var c1 = {}; var c2 = {};
    c1.topleft = {}; c1.bottomright = {};
    c2.topleft = {}; c2.bottomright = {};

    c1.topleft.x = this.charactorBox.topleft.x; c1.topleft.y = this.charactorBox.topleft.y;
    c1.bottomright.x = this.charactorBox.bottomright.x; c1.bottomright.y = this.charactorBox.bottomright.y;
    c2.topleft.x = this.charactorBox.topleft.x; c2.topleft.y = this.charactorBox.topleft.y;
    c2.bottomright.x = this.charactorBox.bottomright.x; c2.bottomright.y = this.charactorBox.bottomright.y;

    var param = 2;
    c1.topleft.x += dx * param; c2.topleft.y += dy * param;
    c1.bottomright.x += dx * param; c2.bottomright.y += dy * param;

    for(var i = 0; i < this.boundingBoxes.length; i ++) {
      var b = this.boundingBoxes[i];
      if(c1.topleft.x > b.bottomright.x || c1.bottomright.x < b.topleft.x
      || c1.topleft.y > b.bottomright.y || c1.bottomright.y < b.topleft.y) {}
      else {
        fixed.x = 0;
      }
      if(c2.topleft.x > b.bottomright.x || c2.bottomright.x < b.topleft.x
      || c2.topleft.y > b.bottomright.y || c2.bottomright.y < b.topleft.y) {}
      else {
        fixed.y = 0;
      }
      if(fixed.x == 0 || fixed.y == 0) {
        break;
      }
    }
    return fixed;
  }
}
