var lightEffect = new LightEffect();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var objects = [];

var light = new FlashLight(3);
light.move(250, 65);
light.setAngle(3.14 / 2 * 3);
light.setRoughness(0.6);
var light2 = new PotLight(18);
light2.move(1100, 600);
lightEffect.addLight(light);
lightEffect.addLight(light2);

var map = Map.instance();
function testMapInit() {
  for(var i = 0; i < 50; i ++) {
    var floor = new Floor(i + "");
    map.addFloor(floor);
  }

  map.addWallsToFloorFromJArr(testFloorWallsJson, "25");
}

function switchFloor(floorId) {
  var floor = map.getFloor(floorId);
  for(var i = 0; i < floor.wallIds.length; i ++) {
    var id = floor.wallIds[i];
    var wall = map.getWall(id);
    lightEffect.addObstable(wall.rect());
  }
}

var offset = 320;
var roomHeight = 500;

var ceilingLocation = {
  x : 0,
  y : offset
};

var floorLocation = {
  x : 0,
  y : offset + roomHeight
}

for(var i = 0; i < 3; i ++) {
  var wall = new RectangleObject({ topleft: new Vec2(i * 700, ceilingLocation.y), bottomright: new Vec2(i * 700 + 20, (ceilingLocation.y + floorLocation.y) / 2) });
  lightEffect.addObstable(wall);
  objects.push(wall);
}

var startAt = +new Date();
var lastd;

function render () {
  var t = +new Date() - startAt;
  var d = Math.round(100*Math.cos(t/1000));
  if (d == lastd) return; // nothing has changed
  lastd = d;

  if(Math.random() < 0.5) {
    light2.lamp.distance = 1;
  }
  else {
    light2.lamp.distance = 500;
  }

  lightEffect.update(ctx);

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

  for(var i = 0; i < objects.length; i ++) {
    var obj = objects[i];
    ctx.fillStyle = "#484848";
    ctx.beginPath();
    obj.path(ctx);
    ctx.fill();
  }

  lightEffect.render(ctx);
}

requestAnimFrame(function loop(){
  requestAnimFrame(loop, canvas);
  render();
}, canvas);

testMapInit();
switchFloor("25");
