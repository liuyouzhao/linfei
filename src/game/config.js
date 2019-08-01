var __configs = {
  "duration" : [
    // door, gate, elevator door
    0.5, 3.5, 1.5
  ],
  "charactorSize" : [
    // 50 width, 50 length
    20
  ],
  "charactorSpeed" : [
    5
  ],
  "charactorTurnSpeed" : [
    0.1
  ],
  "charactorFlashPower" : [
    180
  ],
  "renderQueueSize" : [
    32
  ]
}

class Config {
  static getParam(key, arg) {
    if(!__configs[key] || !__configs[key][arg]) {
      throw "key " + key + " the " + arg + " is not exist, please check your config in config.js:1";
    }
    return __configs[key][arg];
  }

  static PI() {
    return 3.14159;
  }
}
