// Canvas Size
//canvas.width = 505;
//canvas.height = 606;

// ******** ENEMIES ********
// Enemies our player must avoid
var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = s;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ******* PLAYER *******
// Now write your own player class
var Player = function(x,y,s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    //TO-DO: only char-boy image works
    this.sprite = 'images/char-boy.png';
};
// This class requires an update(), render() and
Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
// move the player subject to the movement of arrow key 
Player.prototype.handleInput = function(key){
    console.log(key);
    switch(key){
        case "left":
            if(this.x - 50 >= 0){
                this.x -= 50;
            } else{
                this.x = 0;
            }
            break;
        case "right":
            if(this.x + 50 <= 450){
                this.x += 50;
            } else{
                this.x = 450;
            }    

            break;
        case "up":
            if(this.y - 50 >= 0){
                this.y -= 50;
            } else{
                this.y = 0;
                // player reaches water
            }             
            break;
        case "down":
            if(this.y + 50 <= 450){
                this.y += 50;
                console.log(this.x, this.y);
            } else{
                this.y = 450;
            }
            break;    
    }
    // player reaches water
    if(this.y == 0){
        console.log("reach water")
        resetPlayerPosition();
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

var enemy1 = new Enemy(-100, 60, 130);
var enemy2 = new Enemy(-100, 150, 60);
var enemy3 = new Enemy(-100, 230, 80);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Place the player object in a variable called player
var player = new Player(100,400,20);


// TO-DO:
// When player reaches the water without colliding, return to initial position
function resetPlayerPosition(){
    player.x = 100;
    player.y = 400;
}

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
