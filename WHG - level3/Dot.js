class Dot {

  constructor( t1, t2, t3, t4,startingTile,velX,velY) {
    this.position = createVector(startingTile.pixelPos.x + tileSize/2, startingTile.pixelPos.y + tileSize/2);
    this.startingPos = createVector(startingTile.pixelPos.x + tileSize/2, startingTile.pixelPos.y + tileSize/2);
    this.speed = tileSize/15.0;
    this.velocity = createVector(velX*this.speed, velY*this.speed);
    this.startingVel = createVector(velX*this.speed, velY*this.speed);

    this.startingTile = startingTile;

    this.bouncers = [];
    this.bouncers[0] = t1;
    this.bouncers[1] = t2;
    this.bouncers[2] = t3;
    this.bouncers[3] = t4;

    this.diameter = tileSize/2.0;
    this.bounceWait = -1;
    this.bounceTimer = -1;
  }

  //------------------------------------------------------------------------------------------------------------
  //moves the dot
   move() {

    for (var i = 0; i < this.bouncers.length; i++) {
      if (this.bounceTimer<0 && dist(this.position.x, this.position.y, this.bouncers[i].pixelPos.x + tileSize/2, this.bouncers[i].pixelPos.y + tileSize/2) < 0.01) {//if reached bouncer
        this.bounceTimer = 5;
        // this.bounceWait= 1;//wait 1 frames then change direction
        this.turnDotRight();
        break;
      }
    }
    // if (this.bounceWait ==0) {
    //   //change direction
    //   this.velocity.y *= -1;
    //   this.velocity.x *= -1;
    //
    // }

    this.position.add(this.velocity);//move dot
    this.bounceTimer --;
    this.bounceWait --;
  }
  turnDotRight(){
    if(this.velocity.x > 0 && this.velocity.y == 0){
      this.velocity = createVector(0,1.0*this.speed);
    }else if(this.velocity.x ==0 && this.velocity.y >0){
      this.velocity = createVector(-1.0*this.speed,0);
    }else if(this.velocity.x <0  && this.velocity.y ==0){
      this.velocity = createVector(0,-1.0*this.speed);
    }else if(this.velocity.x ==0 && this.velocity.y < 0){
      this.velocity = createVector(1.0*this.speed,0);
    }

  }
  //------------------------------------------------------------------------------------------------------------
  //draws the dot
  show() {
    fill(0, 0, 255);
    stroke(0);
    strokeWeight(4);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }


  //------------------------------------------------------------------------------------------------------------
  //returns true of the Pvectors define a square which collides with this dot
  collides(ptl, pbr) {//player dimensions

    var topLeft = createVector(this.position.x - this.diameter/2, this.position.y-this.diameter/2);
    var bottomRight = createVector(this.position.x + this.diameter/2, this.position.y + this.diameter/2);
    var playerSize = bottomRight.x - topLeft.x;
    if ((ptl.x <bottomRight.x && pbr.x > topLeft.x) &&( ptl.y < bottomRight.y && pbr.y > topLeft.y)) {

      if (dist(this.position.x, this.position.y, (ptl.x + pbr.x) /2.0, (ptl.y + pbr.y) /2.0)< this.diameter/2 + sqrt(playerSize*playerSize *2)/2) {
        return true;
      }
    }
    return false;
  }
  //------------------------------------------------------------------------------------------------------------
  //returns the dot to its starting state

  resetDot() {
    this.position = this.startingPos.copy();
    this.velocity = this.startingVel.copy();
    this.bounceTimer = -1;
    this.bounceWait = -1;
  }
  //------------------------------------------------------------------------------------------------------------
  //returns a copy of this dot object
  clone() {
    var clone = new Dot(this.bouncers[0], this.bouncers[1],this.bouncers[2], this.bouncers[3], this.startingTile, floor(this.velocity.x), floor(this.velocity.y));
    clone.velocity = this.velocity.copy();
    clone.position = this.position.copy();
    clone.startingVel = this.startingVel.copy();
    clone.bounceTimer = this.bounceTimer;
    clone.bounceWait = this.bounceWait;
    return clone;
  }
}
