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
      if(c.leftTop.x > b.rightBottom.x || c.rightBottom.x < b.leftTop.x
      || c.leftTop.y > b.rightBottom.y || c.rightBottom.y < b.leftTop.y) {}
      else {
        return true;
      }
    }
  }

  fixSpeed(dx, dy) {
    var fixed = new Vec2(dx, dy);

    var c1 = {}; var c2 = {};
    c1.leftTop = {}; c1.rightBottom = {};
    c2.leftTop = {}; c2.rightBottom = {};

    c1.leftTop.x = this.charactorBox.leftTop.x; c1.leftTop.y = this.charactorBox.leftTop.y;
    c1.rightBottom.x = this.charactorBox.rightBottom.x; c1.rightBottom.y = this.charactorBox.rightBottom.y;
    c2.leftTop.x = this.charactorBox.leftTop.x; c2.leftTop.y = this.charactorBox.leftTop.y;
    c2.rightBottom.x = this.charactorBox.rightBottom.x; c2.rightBottom.y = this.charactorBox.rightBottom.y;

    var param = 2;
    c1.leftTop.x += dx * param; c2.leftTop.y += dy * param;
    c1.rightBottom.x += dx * param; c2.rightBottom.y += dy * param;

    for(var i = 0; i < this.boundingBoxes.length; i ++) {
      var b = this.boundingBoxes[i];
      if(c1.leftTop.x > b.rightBottom.x || c1.rightBottom.x < b.leftTop.x
      || c1.leftTop.y > b.rightBottom.y || c1.rightBottom.y < b.leftTop.y) {}
      else {
        fixed.x = 0;
      }
      if(c2.leftTop.x > b.rightBottom.x || c2.rightBottom.x < b.leftTop.x
      || c2.leftTop.y > b.rightBottom.y || c2.rightBottom.y < b.leftTop.y) {}
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
