var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var playerCharactor = null;

var controller = {};
var walls = [];

function onUpdate(engine) {
  if(playerCharactor) {
    if(controller.up == true) {
      playerCharactor.forward();
    }
    else if(controller.down == true) {
      playerCharactor.backward();
    }
    if(controller.left == true) {
      playerCharactor.turnLeft();
    }
    else if(controller.right == true) {
      playerCharactor.turnRight();
    }
  }
  var location = playerCharactor.getLocation();
  engine.moveCamera(location.x, location.y);

  /* Judge visibility */
  for(var i = 0; i < walls.length; i ++) {
    //walls[i].setVisibility(false);
  }

}

function onEvent(name, param, gameObject, renderObject, engine) {
  switch(name) {
    case "onMove": {
    }
  }
}


function createWorld(engine) {
  var ww = 20;
  var wl = 100;

  var lightEffect = new LightEffect("light-effect", engine);
  var blankEffect = new BlankEffect("blank-effect", engine);
  engine.addEffect(lightEffect);
  engine.addEffect(blankEffect);

  var cols = 0;
  var rows = 0;
  for(var i = 0; i < rows; i ++) {
    for(var j = 0; j < cols; j ++) {

      // if(i == 0 || j == 0 || i == rows - 1 || j == cols - 1) {
      //     var piller = new GameWallObject("east-wall" + i * 10 + j, j * wl, i * wl, wl, wl);
      //     var pillerRender = new RenderRectObject("render-east-wall" + i * 10 + j, j * wl-1, i * wl-1, wl+1, wl+1, "#787878");
      //     engine.bindGameRenderEffect(piller, pillerRender, lightEffect, true);
      //     walls.push(piller);
      // }
      // else if(i % 4 != 0) {
      //   continue;
      // }
      if(i % 4 != 0) {
        continue;
      }
      if(Math.random() < 0.7) {
        var piller = new GameWallObject("east-wall" + i * 10 + j, j * wl, i * wl, wl, wl);
        var pillerRender = new RenderRectObject("render-east-wall" + i * 10 + j, j * wl-1, i * wl-1, wl+1, wl+1, "#787878");
        engine.addBindGameRenderEffectBounding(piller, pillerRender, lightEffect, true);
        walls.push(piller);
      }
    }
  }

  var charactor = new Charactor("player_charactor", engine);
  charactor.move(400, 300);
  charactor.stand();
  charactor.turn(3.14159 * 1);
  charactor.setLightVolt(400);
  playerCharactor = charactor;

  var triggerGameObject = new GameRectObject("trigger-area-gamerect-001", charactor.getX() - 50, charactor.getY(), 100, 150);
  var triggerRenderObject = new RenderRectObject("trigger-area-renderrect-001", charactor.getX() - 50, charactor.getY(), 100, 150);
  triggerRenderObject.setVisibility(false);
  var trigger = new AreaTrigger("trap_trigger_001", triggerRenderObject);
  engine.getTriggerCenter().addTrigger(trigger);
  engine.addBindGameRenderEffectBounding(triggerGameObject, triggerRenderObject);

  engine.getTriggerCenter().addTriggerer(playerCharactor.getRenderObject());

  document.addEventListener('keydown', function(key) {
    switch(key.code) {
      case "ArrowUp": {
        controller.up = true;
        break;
      }
      case "ArrowDown": {
        controller.down = true;
        break;
      }
      case "ArrowLeft": {
        controller.left = true;
        break;
      }
      case "ArrowRight": {
        controller.right = true;
        break;
      }
    }
  });

  document.addEventListener('keyup', function(key) {
    switch(key.code) {
      case "ArrowUp": {
        controller.up = false;
        break;
      }
      case "ArrowDown": {
        controller.down = false;
        break;
      }
      case "ArrowLeft": {
        controller.left = false;
        break;
      }
      case "ArrowRight": {
        controller.right = false;
        break;
      }
    }
  });
}

function main() {
  var engine = new Engine(ctx, onUpdate, onEvent);
  engine.debug = true;
  createWorld(engine);
  engine.start();
}
main();
