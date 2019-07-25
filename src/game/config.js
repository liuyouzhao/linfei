var __configs = {
  "duration" : [
    // door, gate, elevator door
    0.5, 3.5, 1.5
  ],
  "charactorSize" : [
    // 50 width, 50 length
    40
  ],
  "charactorSpeed" : [
    1
  ],
  "charactorFlashPower" : [
    1.9
  ]
}


class Config {
  static getParam(key, arg) {
    return __configs[key][arg];
  }

  static PI() {
    return 3.14159;
  }
}
