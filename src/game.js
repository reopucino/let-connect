window.onload = function(){
  game = new Phaser.Game(480, 480, Phaser.AUTO);
  game.state.add("GameArea", Gamearea);
  game.state.start("GameArea");
}

var Gamearea = function(game){};

Gamearea.prototype = {
  firstClick:true,
  nodeCheck : [],
  init:function(){
    this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
  },
  preload:function(){
    this.load.path = "assets/";
	  game.stage.backgroundColor = "#3F7CB6";
    this.load.spritesheet('shape', 'simple-img.png', 50,50);
  },

  create:function(){
    this.simpleShape = this.add.group();
    var firstCheck = false;
  	for(var i = 0;i <8;i++){
  		for(var j =0; j<8;j++){
  			var sShape = this.simpleShape.create( 5+60*i, 5+60*j, 'shape');
        sShape.inputEnabled = true;
        sShape.arX = i;
        sShape.arY = j;
        sShape.isCheck = false;
        sShape.indexNumberArray = -1;
        if(!firstCheck){
          firstCheck = true;
          sShape.indexNumberArray = 0;
          sShape.isCheck = true;
          sShape.tint = 0xFFF000;
          this.nodeCheck.push(sShape);
        }
  		}
  	}
  },

  update:function(){
    if(this.input.activePointer.isDown){
      this.simpleShape.forEach(this.clickShape, this);
      if(this.firstClick)this.firstClick = false;
    }
    else{
      if(!this.firstClick)this.firstClick = true;
    }
  },
  clickShape:function(whatNode){
    if(whatNode.input.pointerOver())
    {
      this.checkingLastNode(whatNode);
    }
  },
  checkingLastNode:function(newNode){
    if(!newNode.isCheck){
      var lastIntNode = this.nodeCheck.length-1;
      var lastNode = this.nodeCheck[lastIntNode];
      if(lastNode.arX == newNode.arX){
        if(lastNode.arY+1 == newNode.arY || lastNode.arY-1 == newNode.arY){
          //console.log("down or up from last node");
          newNode.tint = 0xFFF000;
          newNode.isCheck = true;
          newNode.indexNumberArray = this.nodeCheck.length;
          this.nodeCheck.push(newNode);
        }
      }
      else if(lastNode.arY == newNode.arY){
        if(lastNode.arX+1 == newNode.arX || lastNode.arX-1 == newNode.arX){
          //console.log("left or right from last node");
          newNode.tint = 0xFFF000;
          newNode.isCheck = true;
          newNode.indexNumberArray = this.nodeCheck.length;
          this.nodeCheck.push(newNode);
        }
      }
    }
    else{
      if(this.firstClick){
        var removeNodeUntil = newNode.indexNumberArray+1;
        while(this.nodeCheck.length > removeNodeUntil){
          var lastNode = this.nodeCheck[this.nodeCheck.length-1];
          lastNode.tint = 0xFFFFFF;
          lastNode.isCheck = false;
          lastNode.indexNumberArray = -1;
          this.nodeCheck.pop();
        }
      }
      else{ //is_cliciking
        var lastIntNode = this.nodeCheck.length-2;
        var lastNode = this.nodeCheck[lastIntNode];
        if(newNode == lastNode){
          var removeNode = this.nodeCheck[this.nodeCheck.length-1];
          removeNode.tint = 0xFFFFFF;
          removeNode.isCheck = false;
          removeNode.indexNumberArray = -1;
          this.nodeCheck.pop();
          //console.log("aav");
        }
      }
    }
  },
  render:function(){
    //game.debug.pointer( game.input.activePointer );
  }
}
