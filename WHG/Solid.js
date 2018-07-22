class Solid {

  constructor(topL,botR){
    var lineWidth = 1;
    this.pos = createVector(topL.pixelPos.x-lineWidth, topL.pixelPos.y-lineWidth);
    this.w = botR.pixelPos.x + tileSize - this.pos.x + lineWidth;
    this.h =  botR.pixelPos.y + tileSize - this.pos.y + lineWidth;
    this.bottomRight = createVector(this.pos.x + this.w, this.pos.y + this.h);

  }

  restrictMovement(tl, br, movement) {//player dimensions
    //add the x first

    var x = movement.x;
    var y = movement.y;
    //
    // movement.x = round(movement.x);
    // movement.y = round(movement.y);
	
    if ((tl.x + x < this.bottomRight.x && br.x + x > this.pos.x) && (tl.y < this.bottomRight.y && br.y > this.pos.y)) {
      x = 0;
    }

    //check the y movement
    if ((tl.x < this.bottomRight.x && br.x > this.pos.x) && (tl.y + y < this.bottomRight.y && br.y + y > this.pos.y)) {
      y = 0;
    }

    return createVector(x, y);
  }

  collision(ptl, pbr) {//player dimensions
    //add the x first

    if ((ptl.x <this.bottomRight.x && pbr.x > this.pos.x) &&( ptl.y < this.bottomRight.y && pbr.y > this.pos.y)) {
      return true;
    }
    return false;
  }
}
