class Charactor {
  constructor(id, engine) {
    this.x = 0;
    this.y = 0;
    this.id = id;
    this.engine = engine;
    this.turnSpeed = Config.getParam("charactorTurnSpeed", 0);
    this.size = Config.getParam("charactorSize", 0);
    this.charactor = new GameCharactorObject(id + "_gameObject", this.x, this.y);
    this.charactor.setSpeed(Config.getParam("charactorSpeed", 0));
    this.charactorRender = new RenderRingObject(id + "_renderObject", this.x, this.y, this.size, 1, 0, this.size * 0.4);
    engine.addBindGameRenderEffectBounding(this.charactor, this.charactorRender, engine.getEffect("light-effect"));

    this.charactorLight = new GameLightObject("charactor-light", this.x, this.y, Config.getParam("charactorFlashPower", 0));
    this.renderCharactorLight = new RenderLightObject("render-charactor-light",
                                  this.x, this.y, this.charactorLight.getVolt(), 0.3, 0, 0.76, "#FFFFFFFF", 2.5);
    engine.addBindGameRenderEffectBounding(this.charactorLight, this.renderCharactorLight, engine.getEffect("blank-effect"));
    engine.getEffect("light-effect").addRenderLight(this.renderCharactorLight);

    var thiz = this;
    engine.addGameObjectEventListener(this.charactor, function(name, param, gameObject) {
      switch(name) {
        case "onMove": {
          var tx = thiz.charactor.getDx() * thiz.charactorRender.getR();
          var ty = thiz.charactor.getDy() * thiz.charactorRender.getR();
          thiz.charactorLight.move(thiz.charactor.getX() + tx, thiz.charactor.getY() + ty);
          break;
        }
        case "onChangeAngle": {
          var tx = thiz.charactor.getDx() * thiz.charactorRender.getR();
          var ty = thiz.charactor.getDy() * thiz.charactorRender.getR();
          thiz.charactorLight.move(thiz.charactor.getX() + tx, thiz.charactor.getY() + ty);
          thiz.charactorLight.setAngle(param);
          break;
        }
      }

    });
  }

  getRenderObject() {
    return this.charactorRender;
  }

  getX() {  return this.x;  }
  getY() {  return this.y;  }

  setLightVolt(volt) {
    this.charactorLight.setVolt(volt);
  }

  move(x, y) {
    this.charactor.move(x, y);
  }

  stand() {
    this.charactor.stand();
  }

  getLocation() {
    return {x:this.charactor.getX(), y:this.charactor.getY()};
  }

  turn(angle) {
    this.charactor.setAngle(angle);
  }

  forward() {
    var tx = this.charactor.getDx() * this.charactor.getSpeed();
    var ty = this.charactor.getDy() * this.charactor.getSpeed();
    var newxy = this.engine.pedestrainFixSpeed(this.charactorRender.getInnerObject().bounds(), tx, ty);
    this.charactor.setSpeed(Config.getParam("charactorSpeed", 0));
    this.charactor.step(newxy.x, newxy.y);
  }

  backward() {
    var tx = this.charactor.getDx() * this.charactor.getSpeed();
    var ty = this.charactor.getDy() * this.charactor.getSpeed();
    var newxy = this.engine.pedestrainFixSpeed(this.charactorRender.getInnerObject().bounds(), tx, ty);
    this.charactor.setSpeed(Config.getParam("charactorSpeed", 0));
    this.charactor.step(-newxy.x, -newxy.y);
  }

  turnLeft() {
    var angle = this.charactor.getAngle();
    this.charactor.setAngle(angle + this.turnSpeed);
  }

  turnRight() {
    var angle = this.charactor.getAngle();
    this.charactor.setAngle(angle - this.turnSpeed);
  }
}
