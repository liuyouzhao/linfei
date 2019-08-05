class Trigger {
  constructor(id) {
    this.id = id;
    this.triggerTimes = 0;
  }

  setOnTriggerCallback(onTrigger) {
    this.onTrigger = onTrigger;
  }

  compute() {
  }

  trigger(event) {
    this.triggerTimes ++;
    this.onTrigger(this.id, event, this);
  }
}
