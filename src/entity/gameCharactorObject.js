class GameCharactorObject extends GameMovableObject {
  constructor(id, x, y) {
    super.constructor(id, x, y);
    this.health = 100;
    this.state = "stand";
  }

  getState() {
    return this.state;
  }

  startRunning() {
    super.setSpeed(Config.getParam("charactorRunSpeed", 0));
    this.state = "running";
    this.onEvent("onStartRunning", null, this);
  }

  startWalking() {
    super.setSpeed(Config.getParam("charactorWalkSpeed", 0));
    this.state = "running";
    this.onEvent("onStartWalking", null, this);
  }

  stand() {
    super.setSpeed(0);
    this.state = "stand";
    this.onEvent("onStand", null, this);
  }

  beDamaged(hurt) {
    this.health -= hurt;
    if(this.health <= 0) {
      this.die();
      this.health = 0;
    }
    this.onEvent("onBeDamaged", hurt, this);
  }

  die() {
    this.state = "died";
    this.onEvent("onDie", null, this);
  }
}
