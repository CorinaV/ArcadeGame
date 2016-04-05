"use strict";
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
// if statement checking for collision
    if (this.x < player.x + player_size.width &&
       this.x + enemy_size.width > player.x &&
       this.y < player.y + player_size.height &&
       enemy_size.height + this.y > player.y) {
         player.reset();
    }
    if (this.x > canvasWidth){
      this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Reset method for Enemy to get random speed
Enemy.prototype.reset = function() {
  this.x = -100;
  this.speed = randomSpeed();
};


// Player object //
// TODO: add other items to collect for player

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(lives){
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 370;
    this.lives = lives;
    this.gameover = false;
    this.victory = false;
};

Player.prototype.update = function(){
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if (this.gameover) {
      ctx.font = '22pt Helvetica';
      ctx.strokeStyle = 'white';
      ctx.strokeText('GAME OVER', 150, 260);
      ctx.fillStyle = 'red';
      ctx.fillText('GAME OVER', 150, 260);
    }

    if (this.victory) {
      ctx.font = '22pt Helvetica';
      ctx.strokeStyle = 'white';
      ctx.strokeText('YOU WIN!', 180, 260);
      ctx.fillStyle = 'red';
      ctx.fillText('YOU WIN!', 180, 260);
    }
};

Player.prototype.reset = function(){
  this.x = 200;
  this.y = 370;
  this.lives -= 1;

  if (this.lives == 0) {
    this.gameover = true;
  }
};

Player.prototype.handleInput = function(direction){
  if (this.gameover === true || this.victory === true){
    return;
  }

  switch(direction) {
    case 'left':
      if (this.x - 100 >= 0) {
        this.x -= 100;
      }
      break;
    case 'right':
      if (this.x + 100 <= 400){
        this.x += 100;
      }
      break;
    case 'up':
      if (this.y - 80 >= -30){
        this.y -= 80;
      }
      break;
    case 'down':
      if (this.y + 80 <= 400){
        this.y += 80;
      }
      break;
  };

  if(this.y < 0){
    this.victory = true;
  }
};



// Function that sets random speed for enemy
var randomSpeed =  function(){
  var result = speeds[Math.floor(Math.random() * speeds.length)];
  return result;
};

var speeds = [160, 180, 200, 220, 240, 260, 280, 300];


// global variables for canvas dimensions
var canvasWidth = 505;
var canvasHeight = 606;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  new Enemy(0, 60, randomSpeed()),
  new Enemy(200, 145, randomSpeed()),
  new Enemy(50, 230, randomSpeed())
];
var player = new Player(3);

var enemy_size = {width: 80, height: 60};
var player_size = {width: 80, height: 80};

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
