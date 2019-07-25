var Lamp = illuminated.Lamp
, RectangleObject = illuminated.RectangleObject
, DiscObject = illuminated.DiscObject
, Vec2 = illuminated.Vec2
, Lighting = illuminated.Lighting
, DarkMask = illuminated.DarkMask;

class PotLight {
  constructor(volt) {
    this.voltD = 70.0;
    this.voltS = 5.0;
    this.voltR = 0.5;
    this.volt = volt;
    this.lamp = new Lamp({
      position: new Vec2(0, 0),
      distance: this.voltD * volt,
      radius: this.voltR * volt,
      samples: this.voltS * volt,
      diffuse: 0.4,
      color:'#FFFFFF9E'
    });
  }

  setVolt(v) {
    this.volt = v;
  }

  setAngle(angle) {
    this.lamp.angle = angle;
  }

  changeColor(color) {
    this.lamp.color = color;
  }

  move(x, y) {
    this.lamp.position.x = x;
    this.lamp.position.y = y;
  }
}

class FlashLight {
  constructor(volt) {
    this.voltD = 70.0;
    this.voltS = 5.0;
    this.voltR = 0.5;
    this.volt = volt;
    this.lamp = new Lamp({
      position: new Vec2(0, 0),
      distance: this.voltD * volt,
      radius: this.voltR * volt,
      samples: this.voltS * volt,
      diffuse: 0.1,
      roughness: 0.99,
      angle : 0.1,
      color:'#FFFFFFCE'
    });
  }

  setVolt(v) {
    this.volt = v;
  }
  
  setRoughness(roughness) {
    this.lamp.roughness = roughness;
  }

  setAngle(angle) {
    this.lamp.angle = angle;
  }

  changeColor(color) {
    this.lamp.color = color;
  }

  move(x, y) {
    this.lamp.position.x = x;
    this.lamp.position.y = y;
  }
}

class LightEffect {

  constructor() {
    this.lamps = [];
    this.lightings = [];
    this.darkmask = new DarkMask({ lights: [], color:'rgba(0, 0, 0, 1)' });
    this.obstacles = [];
  }

  addLight(light) {
    this.lamps.push(light.lamp);
    this.darkmask.lights.push(light.lamp);
    var lighting = new Lighting({
      light: light.lamp,
      objects: []
    });
    this.lightings.push(lighting);
  }

  addObstable(obs) {
    this.obstacles.push(obs);

    for(var i = 0; i < this.lightings.length; i ++) {
      var lighting = this.lightings[i];
      lighting.objects.push(obs);
    }
  }

  getObstacles() {
    return this.obstacles;
  }

  update(ctx) {
    var canvas = ctx.canvas;
    for(var i = 0; i < this.lightings.length; i ++) {
      var lighting = this.lightings[i];
      lighting.compute(canvas.width, canvas.height);
    }
    this.darkmask.compute(canvas.width, canvas.height);
  }

  render(ctx) {
    var canvas = ctx.canvas;
    ctx.save();

    ctx.globalCompositeOperation = "lighter";
    for(var i = 0; i < this.lightings.length; i ++) {
      var lighting = this.lightings[i];
      lighting.render(ctx);
    }
    ctx.globalCompositeOperation = "source-over";
    this.darkmask.render(ctx);

    ctx.restore();
  }
}
