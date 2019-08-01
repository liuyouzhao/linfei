class GameLightObject extends GameMovableObject {
  constructor(id, x, y, v) {
    super(id, x, y);
    this.isOn = true;
    this.volt = v;
  }

  setColor(c) {
    this.onEvent("onChangeColor", c, this);
  }

  setVolt(v) {
    this.volt = v;
    this.onEvent("onChangeVolt", v, this);
  }

  getVolt() {
    return this.volt;
  }

  turnOff() {
    this.isOn = false;
    this.onEvent("onTurnOff", 0, this);
  }

  turnOn() {
    this.isOn = true;
    this.onEvent("onTurnOn", this.volt, this);
  }
}
