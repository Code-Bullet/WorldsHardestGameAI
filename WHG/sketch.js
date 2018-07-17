var tileSize = 50;
var xoff = 80;
var yoff = 100;

//human playing vars
var humanPlaying = false;
var left = false;
var right = false;
var up = false;
var down = false;
var p;

//arrays
var tiles = [];
var solids = [];
var dots = [];
var savedDots = [];

var showBest = false;

var winArea;//a solid which is the win zone i.e. the green bits

//gen replay vars
var replayGens = false;
var genPlayer;
var upToGenPos = 0;

//population vars
var numberOfSteps = 10;
var testPopulation;

var winCounter = -1;

var img;
var flip = true;
function setup() {
  var canvas = createCanvas(1280,720);
  for (var i = 0; i< 22; i++) {
    tiles[i] = [];
    for (var j = 0; j< 10; j++) {
      tiles[i][j] = new Tile(i, j);
    }
  }

  setLevel1Walls();
   setLevel1Goal();
   setLevel1SafeArea();
   setEdges();
   setSolids();

   p = new Player();
   setDots();
   winArea = new Solid(tiles[17][2], tiles[19][7]);
   testPopulation = new Population(500);
   img = loadImage("assets/DAB.png");

}

function draw(){
  background(180, 181, 254);
 drawTiles();
 writeShit();


 if (humanPlaying) {//if the user is controlling the square
   if ((p.dead && p.fadeCounter<=0) || p.reachedGoal) {
     //reset player and dots
     if(p.reachedGoal){
       winCounter = 100;

     }
     p = new Player();
     p.human = true;
     resetDots();

   } else {
     //update the dots and the players and show them to the screen
     moveAndShowDots();

     p.update();
     p.show();
   }
 } else
   if (replayGens) {//if replaying the best generations
     if ((genPlayer.dead && genPlayer.fadeCounter <=0) || genPlayer.reachedGoal) { //if the current gen is done
       upToGenPos ++;//next gen
       if (testPopulation.genPlayers.length <= upToGenPos) {//if reached the final gen
         //stop replaying gens
         upToGenPos = 0;
         replayGens = false;
         //return the dots to their saved position

         loadDots();
       } else {//if there are more generations to show
         //set gen player as the best player of that generation
         genPlayer = testPopulation.genPlayers[upToGenPos].gimmeBaby();
         //reset the dots positions
         resetDots();
       }
     } else {//if not done
       //move and show dots
       moveAndShowDots();
       //move and update player
       genPlayer.update();
       genPlayer.show();
     }
   } else//if training normaly
     if (testPopulation.allPlayersDead()) {
       //genetic algorithm
       testPopulation.calculateFitness();
       testPopulation.naturalSelection();
       testPopulation.mutateDemBabies();
       //reset dots
      resetDots();

       //every 5 generations incease the number of moves by 5
       if (testPopulation.gen % 5 ==0) {
         testPopulation.increaseMoves();
       }

     } else {
       moveAndShowDots();
       //update and show population
       testPopulation.update();
       testPopulation.show();
     }

}
function moveAndShowDots(){
  for (var i = 0; i < dots.length; i ++) {
    dots[i].move();
    dots[i].show();
  }

}
function resetDots(){
  for (var i = 0; i < dots.length; i ++) {
    dots[i].resetDot();
  }

}
function drawTiles(){
  for (var i = 0; i< tiles.length; i++) {
    for (var j = 0; j< tiles[0].length; j++) {
      tiles[i][j].show();
    }
  }
  for (var i = 0; i< tiles.length; i++) {
    for (var j = 0; j< tiles[0].length; j++) {
      tiles[i][j].showEdges();
    }
  }
}

function loadDots(){
  for (var i = 0; i< dots.length; i++) {
    dots[i] = savedDots[i].clone();
  }
}

function saveDots(){
  for (var i = 0; i< dots.length; i++) {
    savedDots[i] = dots[i].clone();
  }
}

function writeShit(){

  fill(247, 247, 255);
  textSize(20);
  noStroke();
  text(" \tPress P to play the game yourself \t\t\t\t\t\t\t\t Press G to replay evolution highlights",250,620 );
  text("Press SPACE to only show the best player", 450,680);
  textSize(36);
  if(winCounter > 0){

    if(flip){
      push();

      scale(-1.0,1.0);
      image(img,-300 -img.width + random(5),100+ random(5));
      pop();
    }else{
    image(img,300+ random(5),100 + random(5));
    }
    textSize(100);
    stroke(0);

    text("WOOOOOOOOOOOO", 110,400);
    winCounter --;
    if(winCounter % 10 ==0){

      flip = !flip;
    }
    textSize(36);
    noStroke();
  }
  if (replayGens) {
    text("Generation: " + genPlayer.gen, 200, 90);
    text("Number of moves: " + genPlayer.brain.directions.length, 700, 90);
  } else if(!humanPlaying) {
    text("Generation: " + testPopulation.gen, 200, 90);
    if(testPopulation.solutionFound){
      text("Wins in " + testPopulation.minStep + " moves",700, 90);
    }else{
      text("Number of moves: " + testPopulation.players[0].brain.directions.length, 700, 90);
    }
  }else{
    text("Have Fun ;)", 500,90);
  }
}
function keyPressed(){
  if(humanPlaying){
    switch(keyCode) {
    case UP_ARROW:
      up = true;
      break;
    case DOWN_ARROW:
      down = true;
      break;
    case RIGHT_ARROW:
      right = true;
      break;
    case LEFT_ARROW:
      left = true;
      break;
    }
    setPlayerVelocity();
  }else{//if human is not playing
    switch(key) {
    case ' ':
      showBest = !showBest;
      break;
    case 'G'://replay gens
      if (replayGens) {
        upToGenPos = 0;
        replayGens = false;
        loadDots();
      } else
        if (testPopulation.genPlayers.length > 0) {
          replayGens = true;
          genPlayer = testPopulation.genPlayers[0].gimmeBaby();
          saveDots();
          resetDots();
        }
      break;
    }
  }

  if(key == 'P'){
    if (humanPlaying) {//if human is currently playing

     //reset dots to position
     humanPlaying = false;
     loadDots();
   } else {//if AI is currently playing
     if (replayGens) {
       upToGenPos = 0;
       replayGens = false;
     }
     humanPlaying = true;
     p = new Player();
     p.human = true;
     //save the positions of the dots
     saveDots();
     resetDots();
   }
  }
}


function keyReleased(){
  if(humanPlaying){
    switch(keyCode) {
    case UP_ARROW:
      up = false;
      break;
    case DOWN_ARROW:
      down = false;
      break;
    case RIGHT_ARROW:
      right = false;
      break;
    case LEFT_ARROW:
      left = false;
      break;
    }

    setPlayerVelocity();
  }

}
//set the velocity of the player based on what keys are currently down

function setPlayerVelocity(){
  p.vel.y= 0;
  if (up) {
    p.vel.y -=1;
  }
  if (down) {
    p.vel.y +=1;
  }
  p.vel.x= 0;
  if (left) {
    p.vel.x -=1;
  }
  if (right) {
    p.vel.x +=1;
  }

}
