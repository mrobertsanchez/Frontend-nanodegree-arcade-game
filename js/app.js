//*************************************MISC VARIABLES AND FUNCTIONS

//score keepers
var playerScore = 0;
var enemyScore = 0;

//random number generation from 0 to 2 to randomize enemy starting y location upon enemy reset off screen
function randomNumber() {
  return Math.floor(Math.random()*Math.floor(3));
};

//*************************************ENEMIES AND THEIR EVIL FUNCTIONS
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    //x, y coordinates, y coordinates ,
    this.x = -100;
    if(randomNumber() === 0) {
      this.y = 60;
    }
    else if (randomNumber() < 1) {
      this.y = 140;
    }
    else {
      this.y = 230;
    }
    //random enemey speed
    this.speed = Math.floor(Math.random() * 100) + 150;
};

Enemy.prototype.update = function(dt) {
    //enemy movement
    this.x = this.x + this.speed * dt;
    //off screen and starting x postions
    this.xOffScreen = 505;
    this.startingX = -100;
    //check for off screen and reset to starting postition if true
    if (this.x >= this.xOffScreen){
      this.reset();
    }
    //checks for collision between heroic player and enemy bug
    collisionCheck(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//reset function to reposition off screen bug to a random starting location with a random speed
Enemy.prototype.reset = function() {
    this.x = -100;
    if(randomNumber() === 0) {
      this.y = 60;
    }
    else if (randomNumber() < 1) {
      this.y = 140;
    }
    else {
      this.y = 230;
    }
    this.speed = Math.floor(Math.random() * 100) + 100;
};

var collisionCheck = function(bugEnemy) {
    // check for collision between bug enemies and the heroic player
    // if a collision occurs enemy score is updated and player is reset
    if (
        player.y + 130 >= bugEnemy.y + 90
        && player.x + 25 <= bugEnemy.x + 90
        && player.y + 75 <= bugEnemy.y + 135
        && player.x + 75 >= bugEnemy.x + 10) {
        enemyScore +=1;
        ctx.fillText(("Enemy Score: " + enemyScore), 250, 100);
        player.reset();
      }
};

//*************************************THE PLAYER AND HIS HEROIC FUNCTIONS

var Player = function() {
  this.sprite = 'images/char-boy.png'
  //player starting position
  this.x = 200;
  this.y = 400;
};

Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if(direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if(direction == 'down' && this.y < 400) {
        this.y += 50;
    }
};

//resets player position to starting position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 420;
};

Player.prototype.update = function() {
	// If the player reaches the water, Hero Sprite resets to original postition
  // Player Score Updates with new score
	  if (player.y < 20) {
      playerScore += 1;
      ctx.fillText(("Player Score: " + playerScore), 10, 100);
	    this.reset();
    }
};
// This renders the Hero Sprite, Player Score and Enemy Score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30px 'Rammetto One', cursive";
    ctx.fillText(("Player Score: " + playerScore), 10, 100);
    ctx.fillText(("Enemy Score: " + enemyScore), 250, 100);
};

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
