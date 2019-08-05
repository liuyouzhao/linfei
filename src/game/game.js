class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.controller = {};

    this.engine = new Engine(ctx, this.onUpdate, this.onEvent);
    this.engine.debug = false;

  }

  loadWorld() {
    
    this.playerCharactor = new Charactor("player_charactor", engine);
    this.playerCharactor.move(400, 300);
    this.playerCharactor.stand();
    this.playerCharactor.turn(3.14159 * 1);
    this.playerCharactor.setLightVolt(400);
  }

  getController() {
    return this.controller;
  }

  start() {
    this.loadWorld();
    this.engine.start();
  }

  onUpdate(engine) {
    if(this.playerCharactor) {
      if(this.controller.up == true) {
        this.playerCharactor.forward();
      }
      else if(controller.down == true) {
        this.playerCharactor.backward();
      }
      if(this.controller.left == true) {
        this.playerCharactor.turnLeft();
      }
      else if(this.controller.right == true) {
        this.playerCharactor.turnRight();
      }
    }
    var location = this.playerCharactor.getLocation();
    this.engine.moveCamera(location.x, location.y);

  }

  onEvent(name, param, gameObject, renderObject, engine) {

  }
}
