class Dot {

  constructor( t1, t2, velX) {
    this.position = createVector(t1.pixelPos.x + tileSize/2, t1.pixelPos.y + tileSize/2);
    this.startingPos = createVector(t1.pixelPos.x + tileSize/2, t1.pixelPos.y + tileSize/2);
    this.speed = floor(tileSize/6.6);
    this.velocity = createVector(velX*this.speed, 0);
    this.startingVel = createVector(velX*this.speed, 0);
    this.bouncers = [];
    this.bouncers[0] = t1;
    this.bouncers[1] = t2;
    this.diameter = tileSize/2.0;
    this.bounceWait = -1;
    this.bounceTimer = 10;
  }

  //------------------------------------------------------------------------------------------------------------
  //moves the dot
   move() {

    for (var i = 0; i < this.bouncers.length; i++) {
      if (this.bounceTimer < 0 && dist(this.position.x, this.position.y, this.bouncers[i].pixelPos.x + tileSize/2, this.bouncers[i].pixelPos.y + tileSize/2) < this.speed) {//if reached bouncer
        this.bounceTimer = 10;
        this.bounceWait= 1;//wait 1 frames then change direction
      }
    }
    if (this.bounceWait ==0) {
      //change direction
      this.velocity.x *= -1;
    }

    this.position.add(this.velocity);//move dot
    this.bounceTimer --;
    this.bounceWait --;
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

    var topLeftX = this.position.x - this.diameter/2;
    var topLeftY = this.position.y - this.diameter/2;
    var bottomRightX = this.position.x + this.diameter/2;
    var bottomRightY = this.position.y + this.diameter/2;
	
    var playerSize = bottomRightX - topLeftX;
    if ((ptl.x < bottomRightX && pbr.x > topLeftX) && (ptl.y < bottomRightY && pbr.y > topLeftY)) {

      if (dist(this.position.x, this.position.y, (ptl.x + pbr.x) /2.0, (ptl.y + pbr.y) /2.0) < this.diameter/2 + sqrt(playerSize*playerSize *2)/2) {
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
    this.bounceTimer = 10;
    this.bounceWait = -1;
  }
  //------------------------------------------------------------------------------------------------------------
  //returns a copy of this dot object
  clone() {
    var clone = new Dot(this.bouncers[0], this.bouncers[1], floor(this.velocity.x));
    clone.velocity = this.velocity.copy();
    clone.position = this.position.copy();
    clone.startingVel = this.startingVel.copy();
    clone.bounceTimer = this.bounceTimer;
    clone.bounceWait = this.bounceWait;
    return clone;
  }
}
