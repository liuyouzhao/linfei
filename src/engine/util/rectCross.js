class RectCross {
  constructor() {
  }

  static cross(tl1, br1, tl2, br2) {
    if(tl1.x > br2.x || tl1.y > br2.y || tl2.x > br1.x || tl2.y > br1.y) {
      return false;
    }
    return true;
  }
}
