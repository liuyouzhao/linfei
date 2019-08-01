var lightEffect = new LightEffect();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var objects = [];

var light = new PotLight(2);
light.move(250, 600);
var light2 = new PotLight(8);
light2.move(1100, 600);
lightEffect.addLight(light);
lightEffect.addLight(light2);

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

// floors
for(var r = 0; r < 2; r ++) {
  for(var i = 0; i < 9; i ++) {
    var floor = new RectangleObject({ topleft: new Vec2(i * 200, roomHeight * r + offset), bottomright: new Vec2(i * 200 + 210, roomHeight * r + 30 + offset) });
    lightEffect.addObstable(floor);
    objects.push(floor);
  }
}


// wall
// door
for(var i = 0; i < 3; i ++) {
  var wall = new RectangleObject({ topleft: new Vec2(i * 700, ceilingLocation.y), bottomright: new Vec2(i * 700 + 20, (ceilingLocation.y + floorLocation.y) / 2) });
  lightEffect.addObstable(wall);
  objects.push(wall);
}




/*
for(var i = 1; i < 3; i ++) {
  for(var j = 1; j < 3; j ++) {
    if(Math.random() < 0.5) {
      var disc = new DiscObject({ center: new Vec2(j * 125, i * 125), radius: 30 });
      lightEffect.addObstable(disc);
      objects.push(disc);
    }
    else {
      var rect = new RectangleObject({ topleft: new Vec2(j * 125, i * 125), bottomright: new Vec2(j * 125 + 50, i * 125 + 50) });
      lightEffect.addObstable(rect);
      objects.push(rect);
    }
  }
}
*/

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
