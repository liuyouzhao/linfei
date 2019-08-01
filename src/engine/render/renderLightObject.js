class RenderLightObject extends RenderDiscObject {
  constructor(id, x, y, r, diff, ang, rough, co, rlight) {
    super(id, x, y, rlight);
    this.lamp = new Lamp({
      position: new Vec2(x, y),
      distance: r,
      radius: rlight,
      samples: r,
      diffuse: diff,
      roughness: rough,
      angle : ang,
      color:co
    });
    this.distance = r;
    this.radius = rlight;
    this.color = "#FFFFFF9F";
  }

  getLamp() {
    return this.lamp;
  }

  move(x, y) {
    super.move(x, y);
    this.lamp.position = new Vec2(x, y);
  }

  setAngle(angle) {
    this.lamp.angle = angle;
  }

  setDiffuse(diff) {
    this.lamp.diffuse = diff;
  }

  setRoughness(rough) {
    this.roughness = rough;
  }

  dispatchEvent(name, param) {
    switch(name) {
      case "onChangeVolt": {
        this.lamp.distance = param;
        break;
      }
      case "onChangeColor": {
        this.lamp.color = param;
        break;
      }
      case "onTurnOff": {
        this.lamp.distance = 0;
        this.lamp.radius = 0;
        this.color = "#1212129F";
        break;
      }
      case "onTurnOn": {
        this.lamp.distance = this.distance;
        this.lamp.radius = this.radius;
        this.color = "#FFFFFFAF";
        break;
      }
      case "onMove": {
        this.move(param.x, param.y);
        break;
      }
      case "onChangeAngle": {
        this.lamp.angle = param;
        break;
      }
    }
  }
}
