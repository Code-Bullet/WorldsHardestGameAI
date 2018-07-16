class Tile{

  constructor(x,y){
    this.matrixPos = createVector(x,y);
    this.pixelPos = createVector(x*tileSize+xoff, y*tileSize+yoff);
    this.safe = false;
    this.goal = false;
    this.wall = false;
    this.edges = [];

  }

   show(){
     if ((this.matrixPos.x +this.matrixPos.y) % 2 ==0) {
      fill(247,247,255);
    } else {
      fill(230,230,255);
    }
    if (this.wall) {
      fill(180, 181, 254);
    }
    if (this.goal || this.safe) {
      fill(181, 254, 180);
    }
    noStroke();
    rect(this.pixelPos.x,this.pixelPos.y,tileSize,tileSize);

  }

  showEdges(){
    for (var i = 0; i< this.edges.length; i++) {
      stroke(0);
      strokeWeight(4);
      switch(this.edges[i]) {
        case 4:
          line(this.pixelPos.x, this.pixelPos.y, this.pixelPos.x+tileSize,this.pixelPos.y);
          break;
        case 1:
          line(this.pixelPos.x+tileSize, this.pixelPos.y, this.pixelPos.x+tileSize, this.pixelPos.y+tileSize);
          break;
        case 2:
          line(this.pixelPos.x, this.pixelPos.y+tileSize, this.pixelPos.x+tileSize, this.pixelPos.y+tileSize);
          break;
        case 3:
          line(this.pixelPos.x, this.pixelPos.y, this.pixelPos.x, this.pixelPos.y+tileSize);
          break;
      }
    }
  }



}
