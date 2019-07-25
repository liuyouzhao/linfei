class GameDoorObject extends GameAnimationObject {
  constructor(id, x, y, type) {
    // normal door
    if(type == 1) {
      super.constructor(id, x, y, 600, 6);
    }
    // parallal door
    else if(type == 2) {
      super.constructor(id, x, y, 1000, 8);
    }
    // big gate
    else if(type == 3) {
      super.constructor(id, x, y, 2000, 30);
    }

    this.opened = false;
    this.locked = false;
  }

  getOpened() {
      return this.opened;
  }

  getLocked() {
    return this.locked;
  }

  open() {
    if(this.locked == false) {
      this.opened = true;
    }
    this.onEvent("onOpen", this.opened, this);
  }

  close() {
    this.opened = false;
    this.onEvent("onClose", null, this);
  }

  lock() {
    if(this.opened == true) {
      this.close();
    }
    this.locked = true;
    this.onEvent("onLock", null, this);
  }

  unlock() {
    this.locked = false;
    this.onEvent("onUnLock", null, this);
  }
}
