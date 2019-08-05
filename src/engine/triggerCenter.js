class TriggerCenter {
  constructor(engine) {
    this.triggerIds = [];
    this.triggers = {};
    this.triggerers = [];
    this.engine = engine;
  }

  addTrigger(trigger) {
    this.triggerIds.push(trigger.id);
    this.triggers[trigger.id] = trigger;
    trigger.setOnTriggerCallback(this.onTriggered);
  }

  /**
   * triggerer is a renderObject
  */
  addTriggerer(triggerer) {
    this.triggerers.push(triggerer);
  }

  compute(ctx, isVisible) {
    for(var i = 0; i < this.triggerIds.length; i ++) {
      var id = this.triggerIds[i];
      var trigger = this.triggers[id];

      if( trigger.type == "area" && isVisible(trigger.getRenderObject().id, this.engine) == false) {
        continue;
      }

      for(var j = 0; j < this.triggerers.length; j ++) {
        var triggerer = this.triggerers[i];
        var bound = triggerer.getBounds();
        trigger.compute(bound.topleft, bound.bottomright);
      }
    }
  }

  onTriggered(id, event, triggerer) {
    console.log("Trigger: ", id, event);
  }
}
