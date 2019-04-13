class Brain {
  constructor(size){
    this.directions = [];
    this.step =0;
    this.randomize(size);

  }
  //--------------------------------------------------------------------------------------------------------------------------------
  //sets all the vectors in directions to a random vector with length 1
  randomize(size) {
    for (var i = 0; i< size; i++) {
      this.directions[i] = this.getRandomDirection();
    }
  }

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //returns a random PVector
  getRandomDirection() {
    var randomNumber = floor(random(9));
    switch(randomNumber) {
    case 0:
      return createVector(0, 1);
    case 1:
      return createVector(1, 1);
    case 2:
      return createVector(1, 0);
    case 3:
      return createVector(1, -1);
    case 4:
      return createVector(0, -1);
    case 5:
      return createVector(-1, -1);
    case 6:
      return createVector(-1, 0);
    case 7:
      return createVector(-1, 1);
    case 8:
      return createVector(0, 0);
    }

    return createVector();
  }

  //-------------------------------------------------------------------------------------------------------------------------------------
  //returns a perfect copy of this brain object
  clone() {
    var clone = new Brain(this.directions.length);
    for (var i = 0; i < this.directions.length; i++) {
      clone.directions[i] = this.directions[i].copy();
    }
    return clone;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------

  //mutates the brain by setting some of the directions to random vectors
  mutate(died, deathStep) {
    //chance that any vector in directions gets changed
    for (var i =0; i< this.directions.length; i++) {
      var rand = random(1);
      if (died && i > deathStep - 10) {
        rand = random(0.2);
      }

      if (rand < mutationRate) {
        //set this direction as a random direction
        this.directions[i] = this.getRandomDirection();
      }
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //increases the number of elements in directions by 5
 increaseMoves() {
   for(var i = 0 ; i< increaseMovesBy ;i++){
     this.directions.push(this.getRandomDirection());
   }
  }
}
