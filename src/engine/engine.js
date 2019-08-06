class Engine {
  constructor(ctx, onUpdate, onEvent) {
    this.renderObjects = {};
    this.renderObjectIds = [];
    this.gameObjects = {};
    this.gameObjectIds = [];
    this.gameRenderMap = {};
    this.renderGameMap = {};
    this.effectIds = [];
    this.effects = {};
    this.renderQueues = {};
    this.eventListeners = {};
    this.ctx = ctx;
    this.viewPort = new ViewPort(ctx.canvas.width, ctx.canvas.height);
    this.onOutterEvent = onEvent;
    this.onUpdate = onUpdate;
    this.started = false;
    this.pedestrian = new Pedestrian();
    this.triggerCenter = new TriggerCenter(this);

    this.__eiEhE = "__engine_inner_Effect-hiddenEffect";
    this.renderQueues[this.__eiEhE] = new RenderQueue(this);
    this.effects[this.__eiEhE] = new BlankEffect(this.__eiEhE, this);
    this.effectIds.push(this.__eiEhE);
  }

  getTriggerCenter() {
    return this.triggerCenter;
  }

  getEffect(id) {
    return this.effects[id];
  }

  addEffect(effect) {
    if(this.effects[effect.id]) {
      throw "Effect id conflicted: " + effect.id;
    }
    this.effectIds.push(effect.id);
    this.effects[effect.id] = effect;
    this.renderQueues[effect.id] = new RenderQueue(this);
  }

  addGameObjectEventListener(gameObject, listener) {
    this.eventListeners[gameObject.id] = listener;
  }

  addBindGameRenderEffectBounding(gameObject, renderObject, effect, bounding) {

    if(!effect) {
      effect = new BlankEffect(this.__eiEhE, this);
    }

    this.renderObjects[renderObject.id] = renderObject;
    this.gameObjects[gameObject.id] = gameObject;
    this.gameRenderMap[gameObject.id] = renderObject.id;
    this.renderGameMap[renderObject.id] = gameObject.id;
    this.renderObjectIds.push(renderObject.id);
    this.gameObjectIds.push(gameObject.id);
    var thiz = this;
    gameObject.setOnEventCallback(function(name, param, gameObject) {
      thiz.onGameObjectEvent(name, param, gameObject);
    });

    if(!this.effects[effect.id]) {
      throw "Effect id is not added, call addEffect first, effect id:" + effect.id;
    }
    this.renderQueues[effect.id].push(renderObject.getLayer(), renderObject);
    effect.addAffectObject(renderObject);

    if(bounding == true) {
      this.pedestrian.addBoundingBox(renderObject.getInnerObject());
    }
  }

  pedestrainFixSpeed(charactorBox, tx, ty) {
    return this.pedestrian.fixSpeed(charactorBox, tx, ty);
  }

  pedestrainCharactorBox(box) {
    this.pedestrian.setCharactorBox(box);
  }

  moveCamera(x, y) {
    this.viewPort.setCenter(x, y);
  }

  findRoByGo(go) {
    return this.renderObjects[this.gameRenderMap[go.id]];
  }

  findRoByGo_Id(goId) {
    return this.renderObjects[this.gameRenderMap[id]];
  }

  findGoByRo(ro) {
    return this.gameObjects[this.renderGameMap[ro.id]];
  }

  findGoByRo_Id(roId) {
    return this.gameObjects[this.renderGameMap[roId]];
  }

  findRoById(roId) {
    return this.renderObjects[roId];
  }

  findGoById(goId) {
    return this.gameObjects[goId];
  }

  onGameObjectEvent(name, param, gameObject) {
    var renderObjectId = this.gameRenderMap[gameObject.id];
    var renderObject = this.renderObjects[renderObjectId];

    /// dispatch listener
    var listener = this.eventListeners[gameObject.id];
    if(listener) {
      listener(name, param, gameObject);
    }

    if(this.onOutterEvent)
      this.onOutterEvent(name, param, gameObject, renderObject, this);
    renderObject.dispatchEvent(name, param);
  }

  __visibilityCallbackRender(renderId, engine) {
    var renderObject = engine.renderObjects[renderId];
    var visible = engine.findGoByRo_Id(renderId).getVisibility();
    var inside = engine.viewPort.rectInsideView({x:renderObject.getX(), y:renderObject.getY()},
                          {x:renderObject.getX() + renderObject.getWidth(), y:renderObject.getY() + renderObject.getHeight()});
    return visible && inside;
  }

  __visibilityCallbackLatentRender(renderId, engine) {
    var renderObject = engine.renderObjects[renderId];
    var inside = engine.viewPort.rectInsideView({x:renderObject.getX(), y:renderObject.getY()},
                          {x:renderObject.getX() + renderObject.getWidth(), y:renderObject.getY() + renderObject.getHeight()});
    return inside;
  }

  __visibilityCallbackEffect(renderId, engine) {
    var renderObject = engine.renderObjects[renderId];
    var inside = engine.viewPort.pointInsideView(renderObject.getX(), renderObject.getY());
    var visible = engine.findGoByRo_Id(renderId).getVisibility();
    return visible && inside;
  }

  recalculateRenderLocations() {
    for(var i = 0; i < this.renderObjectIds.length; i ++) {
      var renderObjectId = this.renderObjectIds[i];
      var renderObject = this.renderObjects[renderObjectId];
      var gameObject = this.findGoByRo_Id(renderObjectId);
      var currentViewPosition = this.viewPort.convertToViewPosition(gameObject.getX(), gameObject.getY());
      renderObject.move(currentViewPosition.x, currentViewPosition.y);
    }
  }

  flushAllEffects() {
    for(var i = 0; i < this.effectIds.length; i ++) {
      var eff = this.effects[this.effectIds[i]];
      eff.flushAffectObject();
    }
  }

  updateEffect() {
    for(var i = 0; i < this.effectIds.length; i ++) {
      var effectId = this.effectIds[i];
      this.effects[effectId].update(this.ctx, this.__visibilityCallbackEffect);
    }
  }

  ignite() {
    this.onUpdate(this);
    this.recalculateRenderLocations();
    this.triggerCenter.compute(this.ctx, this.__visibilityCallbackLatentRender);

    /* Update effect */
    this.updateEffect();

    /* Main Rendering */
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < this.effectIds.length; i ++) {
      var effectId = this.effectIds[i];
      this.renderQueues[effectId].render(this.ctx, this.__visibilityCallbackRender);
      this.effects[effectId].render(this.ctx, this.__visibilityCallbackEffect);
    }


    if(this.debug == true) {
      for(var i = 0; i < this.renderObjectIds.length; i ++) {
        var renderId = this.renderObjectIds[i];
        var renderObject = this.renderObjects[renderId];
        renderObject.debugRender(this.ctx);
      }
    }
  }

  start() {

    this.flushAllEffects();
    this.started = true;
    var thiz = this;

    requestAnimFrame(function loop(){
      if(thiz.started == true) {
        requestAnimFrame(loop, thiz.ctx.canvas);
        thiz.ignite();
      }
    }, this.ctx.canvas);
  }

  stop() {
    this.started = false;
  }
}
