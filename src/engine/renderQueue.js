class RenderQueue {
  constructor(engine) {
    this.queue = [];
    for(var i = 0; i < Config.getParam("renderQueueSize", 0); i ++) {
      this.queue[i] = [];
    }
    this.engine = engine;
  }

  push(layer, renderObject) {
    if(layer >= this.queue.length) {
      throw "layer " + layer + " exceeded the range of 0 to " + Config.getParam("renderQueueSize", 0);
    }
    this.queue[layer].push(renderObject);
  }

  render(ctx, ifVisibleCb) {
    for(var i = 0; i < this.queue.length; i ++) {
      for(var j = 0; j < this.queue[i].length; j ++) {
        var renderObject = this.queue[i][j];
        if(ifVisibleCb(renderObject.id, this.engine))
          renderObject.render(ctx);
      }
    }
  }
}
