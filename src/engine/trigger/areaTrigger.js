class AreaTrigger extends Trigger {
  constructor(id, renderObject) {
    super(id);
    this.renderObject = renderObject;
    this.pause = false;
    this.type = "area";
  }

  getRenderObject() {
    return this.renderObject;
  }

  compute(topleft, bottomright) {

    this.topleft = {x:this.renderObject.getX(), y:this.renderObject.getY()};
    this.bottomright = {x:this.renderObject.getX() + this.renderObject.getWidth(), y:this.renderObject.getY() + this.renderObject.getHeight()};

    if(RectCross.cross(this.topleft, this.bottomright, topleft, bottomright) && this.pause == false) {
      this.pause = true;
      this.trigger("in");
    }
    else if(!RectCross.cross(this.topleft, this.bottomright, topleft, bottomright) && this.pause == true) {
      this.pause = false;
      this.trigger("out");
    }
  }
}
