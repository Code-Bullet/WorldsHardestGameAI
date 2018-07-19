class Population {

  constructor(size) {
    this.players = [];
    this.fitnessSum = 0.0;
    this.gen = 1;
    this.bestPlayer =0;
    this.minStep = 10000;
    this.genPlayers = [];
    this.bestFitness = 0;
    this.solutionFound = false;

    for (var i = 0; i< size; i++) {
      this.players[i] = new Player();
    }
  }


  //------------------------------------------------------------------------------------------------------------------------------
  //show all players
   show() {
    if (!showBest) {
      for (var i = 1; i< this.players.length; i++) {
        this.players[i].show();
      }
    }
    this.players[0].show();
  }

  //-------------------------------------------------------------------------------------------------------------------------------
  //update all players
   update() {
    for (var i = 0; i< this.players.length; i++) {
      if (this.players[i].brain.step > this.minStep) {//if the player has already taken more steps than the best player has taken to reach the goal
        this.players[i].dead = true;//then it dead
      } else {
        this.players[i].update();
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------------------------
  //calculate all the fitnesses
   calculateFitness() {
    for (var i = 0; i< this.players.length; i++) {
      this.players[i].calculateFitness();
    }
  }


  //------------------------------------------------------------------------------------------------------------------------------------
  //returns whether all the players are either dead or have reached the goal
   allPlayersDead() {
    for (var i = 0; i< this.players.length; i++) {
      if (!this.players[i].dead && !this.players[i].reachedGoal) {
        return false;
      }
    }
    print("bah:");
    return true;
  }



  //-------------------------------------------------------------------------------------------------------------------------------------

  //gets the next generation of players
   naturalSelection() {
    var newPlayers = [];//next gen
    this.setBestPlayer();
    this.calculateFitnessSum();

    //the champion lives on
    newPlayers[0] = this.players[this.bestPlayer].gimmeBaby();
    newPlayers[0].isBest = true;
    for (var i = 1; i< populationSize; i++) {
      //select parent based on fitness
      var parent = this.selectParent();

      //get baby from them
      newPlayers[i] = parent.gimmeBaby();
    }

    // this.players = newPlayers.slice();
    this.players = [];
    for(var i = 0 ; i< newPlayers.length;i++){
      this.players[i] = newPlayers[i];
    }
    this.gen ++;
  }


  //--------------------------------------------------------------------------------------------------------------------------------------
  //you get it
   calculateFitnessSum() {
    this.fitnessSum = 0;
    for (var i = 0; i< this.players.length; i++) {
      this.fitnessSum += this.players[i].fitness;
    }
  }

  //-------------------------------------------------------------------------------------------------------------------------------------

  //chooses player from the population to return randomly(considering fitness)

  //this function works by randomly choosing a value between 0 and the sum of all the fitnesses
  //then go through all the players and add their fitness to a running sum and if that sum is greater than the random value generated that player is chosen
  //since players with a higher fitness function add more to the running sum then they have a higher chance of being chosen
   selectParent() {
    var rand = random(this.fitnessSum);


    var runningSum = 0;

    for (var i = 0; i< this.players.length; i++) {
      runningSum+= this.players[i].fitness;
      if (runningSum > rand) {
        return this.players[i];
      }
    }

    //should never get to this point

    return null;
  }

  //------------------------------------------------------------------------------------------------------------------------------------------
  //mutates all the brains of the babies
   mutateDemBabies() {
    for (var i = 1; i< this.players.length; i++) {
      this.players[i].brain.mutate(this.players[i].deathByDot, this.players[i].deathAtStep);
      this.players[i].deathByDot = false;
      this.players[i].gen = this.gen;
    }
    this.players[0].deathByDot = false;
    this.players[0].gen = this.gen;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------
  //finds the player with the highest fitness and sets it as the best player
   setBestPlayer() {
    var max = 0;
    var maxIndex = 0;
    for (var i = 0; i< this.players.length; i++) {
      if (this.players[i].fitness > max) {
        max = this.players[i].fitness;
        maxIndex = i;
      }
    }

    this.bestPlayer = maxIndex;

    if (max > this.bestFitness) {
      this.bestFitness = max;
      this.genPlayers.push(this.players[this.bestPlayer].gimmeBaby());
    }

    //if this player reached the goal then reset the minimum number of steps it takes to get to the goal
    if (this.players[this.bestPlayer].reachedGoal) {
      this.minStep = this.players[this.bestPlayer].brain.step;
      this.solutionFound = true;
    }
  }


 increaseMoves() {
    if (this.players[0].brain.directions.length < 120 && !this.solutionFound) {
      for (var i = 0; i< this.players.length; i++) {
        this.players[i].brain.increaseMoves();
      }
    }
  }
}
