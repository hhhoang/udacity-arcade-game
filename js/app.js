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
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -10;
        // then set speed to random speed bw 100-300 to add suprise to the game
        this.speed = Math.floor(Math.random() * 300) + 100;
    }
    checkCollisions(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// collision detection 
// https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
// Player: 60*80, Bug: 100*50
function checkCollisions(eachBug){
    if (player.x < eachBug.x + 80 &&
        player.x + 60 > eachBug.x &&
        player.y < eachBug.y + 60 &&
        player.y + 80 > eachBug.y){
            console.log("collideeeeee");
            resetPlayerPosition();
            resetScore();
        }
}


// ******* PLAYER *******
// Now write your own player class
var Player = function(x,y,s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    //TO-DO: allow to choose player characters
    this.sprite = 'images/char-princess-girl.png';
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
    // player reaches water without colliding
    if(this.y == 0){
        console.log("reach water without coliding")
        resetPlayerPosition();
        updateScore();
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy1 = new Enemy(-50, 60, 130);
var enemy2 = new Enemy(-70, 150, 60);
var enemy3 = new Enemy(-100, 230, 80);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Place the player object in a variable called player
var player = new Player(200, 420, 30);


// return to initial position
function resetPlayerPosition(){
    player.x = 200;
    player.y = 420;
}

// **** SCORES *****
let scoreCounter = document.getElementsByClassName('score')[0];
// Update scores
function updateScore(){
    scoreCounter.innerHTML = parseInt(scoreCounter.innerHTML) + 1;
    // display winning message when scores = 5 
    if (parseInt(scoreCounter.innerHTML) == 5){
        displayWonMessage();
    } 
}
// reset scores
function resetScore(){
    scoreCounter.innerHTML = 0;
}

displayWonMessage();


// Display win message
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
function displayWonMessage() {
    // Get the modal
    let modal = document.getElementById('wonMessage');
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName('close')[0];
    // Get the button play me
    let button = document.getElementById('playMe');

    modal.style.display = 'block';

    // Play me button
    button.onclick = function() {
        modal.style.display = 'none';
        restartGame();
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
            modal.style.display = 'none';
        }
        // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// restart the game
function restartGame(){
    resetScore();
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
