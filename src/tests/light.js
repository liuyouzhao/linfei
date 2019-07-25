(function(){
  var Lamp = illuminated.Lamp
  , RectangleObject = illuminated.RectangleObject
  , DiscObject = illuminated.DiscObject
  , Vec2 = illuminated.Vec2
  , Lighting = illuminated.Lighting
  , DarkMask = illuminated.DarkMask
  ;

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var light1 = new Lamp({
    position: new Vec2(100, 250),
    distance: 200,
    radius: 10,
    samples: 150
  });
  var light2 = new Lamp({
    position: new Vec2(300, 50),
    color: '#CCF',
    distance: 200,
    radius: 10,
    samples: 150
  });
  var disc = new DiscObject({ center: new Vec2(100, 100), radius: 30 });
  var rect = new RectangleObject({ topleft: new Vec2(250, 200), bottomright: new Vec2(350, 250) });

  var objects = [ disc, rect ];

  var lighting1 = new Lighting({
    light: light1,
    objects: objects
  });
  var lighting2 = new Lighting({
    light: light2,
    objects: [ disc, rect ]
  });

  var darkmask = new DarkMask({ lights: [light1, light2], color:'rgba(0, 0, 0, 0.9)' });

//!START
// ...
  var startAt = +new Date();
  var lastd;

  function render () {
    var t = +new Date() - startAt;
    var d = Math.round(100*Math.cos(t/1000));
    if (d == lastd) return; // nothing has changed
    lastd = d;

    light1.position = new Vec2(200-d, 150+d);
    //light2.position = new Vec2(200+d, 150-d);
    light1.angle = 0.0;
    light2.angle = d/10;
    light1.roughness = 1.0;
    light2.roughness = 1.0;

    lighting1.compute(canvas.width, canvas.height);
    lighting2.compute(canvas.width, canvas.height);
    darkmask.compute(canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.beginPath();
    disc.path(ctx);
    ctx.fill();
    ctx.beginPath();
    rect.path(ctx);
    ctx.fill();

    ctx.globalCompositeOperation = "lighter";
    lighting1.render(ctx);
    lighting2.render(ctx);

    ctx.globalCompositeOperation = "source-over";
    darkmask.render(ctx);
  }

  requestAnimFrame(function loop(){
    requestAnimFrame(loop, canvas);
    render();
  }, canvas);
//!STOP
}());
