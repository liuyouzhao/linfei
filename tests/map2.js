var lightEffect = new LightEffect();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var objects = [];
var debug = true;

var map = Map.instance();
var charactor = new Charactor();
charactor.setLocation(300, 300);
charactor.setDirection(3.14 / 4);

var light = new FlashLight(0.8);
light.move(250, 65);
light.setAngle(-3.14 * 0.5);
light.setRoughness(0.6);

var light2 = new PotLight(4);
light2.move(1100, 600);
lightEffect.addLight(light);
lightEffect.addLight(light2);

var playerFlashLight = new FlashLight(Config.getParam("charactorFlashPower", 0));
playerFlashLight.setRoughness(0.99);
lightEffect.addLight(playerFlashLight);

var viewPort = new View(canvas.width, canvas.height);

function testMapInit() {
  for(var i = 0; i < 50; i ++) {
    var floor = new Floor(i + "");
    map.addFloor(floor);
  }
  map.addWallsToFloorFromJArr(testFloorWallsJson, "25");
}

function switchFloor(floorId) {
  var floor = map.getFloor(floorId);
  charactor.bindPedestrian(floor.getPedestrian());
  charactor.setLocation(300, 300);
  for(var i = 0; i < floor.wallIds.length; i ++) {
    var id = floor.wallIds[i];
    var wall = map.getWall(id);
    lightEffect.addObstable(wall.rect());
  }

  /// charactor obstacal
  lightEffect.addObstable(charactor.body);
  lightEffect.addObstable(charactor.head);
}

var time1 = new Date().getMilliseconds();

function update() {
  charactor.forward();
  viewPort.setCenter(charactor.x, charactor.y);
  
  playerFlashLight.setAngle(charactor.dir);
  var charactorOneStep = charactor.getForwardLocation(charactor.getBodySize() * 0.75);
  playerFlashLight.move(charactorOneStep.x, charactorOneStep.y);
  lightEffect.update(ctx);

}


function render () {

  var time2 = new Date().getMilliseconds();
  var elispedTime = time2 - time1;
  time1 = time2;

  update();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var ids = map.wallIds;
  for(var i = 0; i < ids.length; i ++) {
    var wall = map.getWall(ids[i]);
    var obj = wall.rect();
    ctx.fillStyle = wall.color;
    ctx.beginPath();
    obj.path(ctx);
    ctx.fill();
  }
  ctx.fillStyle = "#FEFEFE";
  ctx.beginPath();
  charactor.body.path(ctx);
  ctx.fill();

  ctx.fillStyle = "#646464";
  ctx.beginPath();
  charactor.head.path(ctx);
  ctx.fill();

  lightEffect.render(ctx);

  if(debug) {
    var c = charactor.box;
    ctx.save();
    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(c.leftTop.x, c.leftTop.y, c.rightBottom.x - c.leftTop.x, c.rightBottom.y - c.leftTop.y);
    ctx.restore();

    for(var i = 0; i < ids.length; i ++) {
      var wall = map.getWall(ids[i]);
      var box = wall.getBox();
      ctx.save();
      ctx.strokeStyle = "#FFFF00";
      ctx.strokeRect(box.leftTop.x, box.leftTop.y, box.rightBottom.x - box.leftTop.x, box.rightBottom.y - box.leftTop.y);
      ctx.restore();
    }
    ctx.save();
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillText("elisped: " + elispedTime, 10, 90);
    ctx.restore();

  }
}

requestAnimFrame(function loop(){
  requestAnimFrame(loop, canvas);
  render();
}, canvas);

testMapInit();
switchFloor("25");
