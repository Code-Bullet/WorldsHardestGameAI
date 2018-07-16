class Node { //used to define short term goals for the players 
  //------------------------------------------------------------------------------------------------------------------------------
  constructor(nodeTile) {
    this.reached = false;
    this.distToFinish = 0.0;
    this.pos = createVector(nodeTile.pixelPos.x, nodeTile.pixelPos.y);
    this.w =  tileSize;
    this.h =  tileSize;
    this.bottomRight = createVector(this.pos.x + this.w, this.pos.y + this.h);
  }
  //------------------------------------------------------------------------------------------------------------------------------
   collision( ptl,  pbr) {//player dimensions
    if ((ptl.x <this.bottomRight.x && pbr.x > this.pos.x) &&( ptl.y < this.bottomRight.y && pbr.y > this.pos.y)) {
      this.reached = true;
      return true;
    }else if(pbr.x < this.pos.x){
      this.reached = false;

    }
    return false;
  }
//------------------------------------------------------------------------------------------------------------------------------
  //set the distance to finish by adding the distance to the finish for the node n plus the distance from this node to node n
  setDistanceToFinish(n) {
    this.distToFinish = n.distToFinish + dist(this.pos.x, this.pos.y, n.pos.x, n.pos.y);
  }
}
