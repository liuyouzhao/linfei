var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function main() {
  var game = new Game(ctx);
  game.start();
  var controller = game.getController();

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
main();
