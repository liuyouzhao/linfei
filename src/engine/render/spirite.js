class MotionFrame {
  constructor(ux, uy, uw, uh, tick) {
    this.ux = ux;
    this.uy = uy;
    this.uw = uw;
    this.uh = uh;
    this.tick = tick;
  }
}

class Motion {
  constructor(name, loop) {
    this.name = name;
    this.loop = loop;
    this.frames = [];
  }

  loadFramesFromJArray(jsonFramesArr) {
    for(var i = 0; i < jsonFramesArr.length; i ++) {
      var jsonFrame = jsonFramesArr[i];
      var uv = jsonFrame["uv"];
      var tick = jsonFrame["tick"];
      this.frames[i] = new MotionFrame(uv["ux"], uv["uy"], uv["uw"], uv["uh"], tick);
    }
  }
}

class Spirite {
  constructor(x, y, w, h) {
    this.id = (new UUID()).create_UUID();
    this.layerId = "";
    this.effectId = "";
    this.img = null;
    this.ux = 0;
    this.uy = 0;
    this.uw = 0;
    this.uh = 0;
    this.motions = [];
    this.motion = null;
    this.innerData = null;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  setMotion(motionName) {

  }

  setLayer(layerId) {
    this.layerId = layerId;
  }

  render() {
    var ctx = env.context;



  }
}
