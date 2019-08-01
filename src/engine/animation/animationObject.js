class AnimationObject {
  constructor(id, x, y, ticks, frames) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.ticks = ticks;
    this.frames = frames;
    this.currentFrame = 0;
    this.currentTick = 0;
    this.startTime = 0;
    this.started = false;
  }

  getCurrentTick() {
    return this.currentTick;
  }

  getCurrentFrame() {
    return this.currentFrame;
  }

  getTicks() {
    return this.ticks;
  }

  getFrames() {
    return this.frames;
  }

  start(time) {
    this.startTime = time;
    this.started = true;
  }

  stop() {
    this.started = false;
  }

  reset(time) {
    this.startTime = time;
    this.currentTick = 0;
    this.currentFrame = 0;
  }

  updateFrame(time) {
    if(this.started == true) {
      this.currentTick = time - this.startTime;
      if(this.currentTick > this.ticks) {
        this.currentTick = this.ticks;
        this.currentFrame = this.frames;
      }
      else {
        this.currentFrame = this.frames * (this.currentTick / this.ticks);
      }
      this.onEvent("onUpdateFrame", this.currentFrame / this.frames * 100, this);
    }
  }

}
