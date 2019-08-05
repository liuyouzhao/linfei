var Door001 = {
  "id":"door-001",
  "type":"door",
  "region"{
    "topleft":{
      "x":100,
      "y":200
    },
    "bottomright":{
      "x":200,
      "y":400
    }
  }
}

var Room0001 =
{
  "id":"room-0001",
  "type":"room",
  "region":{
    "topleft":{
      "x":100,
      "y":200
    },
    "bottomright":{
      "x":200,
      "y":400
    }
  },
  "components":[
    {
      "id":"walls001"
      "type":"wall",
      "gos":[
        {
          "id":"",
          "type":"",

        },
      ]
    },
    {
    }
  ]
}

class TemplateAssociation {
  constructor() {
    this.instances = [];
  }
  addInstance(instance) {
    this.instances.push(instance);
  }
}
