class GameLightObject extends GameMovableObject {
  constructor(id, x, y, type, v) {
    super.constructor(id, x, y);
    this.isOn = true;
    this.volt = v;
    this.type = type;
  }

  setColor(c) {
    this.onEvent("onChangeColor", this, c);
  }

  setVolt(v) {
    this.volt = v;
    this.onEvent("onChangeVolt", this, v);
  }

  turnOff() {
    this.isOn = false;
    this.onEvent("onChangeVolt", this, 0);
  }

  turnOn() {
    this.isOn = true;
    this.onEvent("onChangeVolt", this, this.volt);
  }
}
