var Lamp = illuminated.Lamp
, RectangleObject = illuminated.RectangleObject
, DiscObject = illuminated.DiscObject
, Vec2 = illuminated.Vec2
, Lighting = illuminated.Lighting
, DarkMask = illuminated.DarkMask;

class LightEffect {

  constructor(id, engine) {
    this.id = id;
    this.lamps = [];
    this.renderObjects = [];
    this.lightings = [];
    this.darkmask = new DarkMask({ lights: [], color:'rgba(0, 0, 0, 1.0)' });
    this.obstacles = [];
    this.engine = engine;
  }

  addRenderLight(light) {
    this.renderObjects.push(light);
    this.darkmask.lights.push(light.getLamp());
    var lighting = new Lighting({
      light: light.getLamp(),
      objects: []
    });
    this.lightings.push(lighting);
  }

  clearRenderLight() {
    this.lightings = [];
    this.renderObjects = [];
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

  addAffectObject(renderObject) {
    this.obstacles.push(renderObject);
  }

  flushAffectObject() {
    for(var j = 0; j < this.obstacles.length; j ++) {
      for(var i = 0; i < this.lightings.length; i ++) {
        var lighting = this.lightings[i];
        lighting.objects.push(this.obstacles[j].getInnerObject());
      }
    }
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

  update(ctx, visibleCallback) {
    var canvas = ctx.canvas;
    for(var i = 0; i < this.lightings.length; i ++) {
      var lighting = this.lightings[i];
      var position = lighting.light.position;
      if(visibleCallback(this.renderObjects[i].id, this.engine) == true) {
        lighting.objects = [];
        for(var i = 0; i < this.obstacles.length; i ++) {
          if(this.obstacles[i].getVisibility() == true) {
            lighting.objects.push(this.obstacles[i].getInnerObject());
          }
        }
        lighting.compute(canvas.width, canvas.height);
      }
    }
    this.darkmask.compute(canvas.width, canvas.height);
  }

  render(ctx, visibleCallback) {
    var canvas = ctx.canvas;
    ctx.save();

    ctx.globalCompositeOperation = "lighter";
    for(var i = 0; i < this.lightings.length; i ++) {
      var lighting = this.lightings[i];
      var position = lighting.light.position;
      if(visibleCallback(this.renderObjects[i].id, this.engine) == true) {
        lighting.render(ctx);
      }
    }
    ctx.globalCompositeOperation = "source-over";
    this.darkmask.render(ctx);

    ctx.restore();

  }
}
