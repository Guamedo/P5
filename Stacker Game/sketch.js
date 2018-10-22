let canvas;
let sep = 10;

let cols = 7;
let rows = 15;
let blockSize = 40;

let gameMap = [];
let gameColor;
let fr = 5;

let playerRow = rows - 1;
let playerCols = [0, 1, 2];
let playerDir = 1;

function setup() {

    for(let i = 0; i < rows; i++){
        let col = [];
        for(let j = 0; j < cols; j++){
            col.push(0);
        }
        gameMap.push(col);
    }

    canvas = this.createCanvas(cols*blockSize, rows*blockSize);
    canvas.position(window.windowWidth/2 - width/2, window.windowHeight/2 - height/2);
    gameColor = color(200, 50, 50);
    this.frameRate(fr);
}

function draw() {
    background(51);

    updatePlayer();

    drawMap();
    drawPlayer();
    drawLines();


}

function keyPressed() {
    //console.log(keyCode);
    if(keyCode === 32){
        if(playerRow === rows - 1){
            for(let i = 0; i < playerCols.length; i++){
                gameMap[playerRow][playerCols[i]] = 1;
                playerCols[i] = i;
            }

            playerDir = 1;
            playerRow--;
            fr++;
            this.frameRate(fr);
        }else{
            let newPlayerCols = [];
            for(let i = 0; i < playerCols.length; i++){

                if(gameMap[playerRow+1][playerCols[i]] === 1){
                    newPlayerCols.push(playerCols[i]);
                }

            }
            if(newPlayerCols.length > 0){
                playerCols = newPlayerCols;
                for(let i = 0; i < playerCols.length; i++){
                    gameMap[playerRow][playerCols[i]] = 1;
                    playerCols[i] = i;
                }
                if(playerRow > 0){
                    playerDir = 1;
                    playerRow--;
                    fr++;
                    this.frameRate(fr);
                }else{
                    gameOver(1);
                }
            }else{
                gameOver(0);
            }
        }
    }
}

function gameOver(win) {
    if(win){
        console.log("Game Over, You Win!");
    }else{
        console.log("Game Over");
    }
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            gameMap[i][j] = 0;
        }
    }
    fr = 5;
    this.frameRate(fr);

    playerRow = rows - 1;
    playerCols = [0, 1, 2];
    playerDir = 1;
}

function updatePlayer() {
    if(playerCols[playerCols.length-1] + playerDir >= cols || playerCols[0] + playerDir < 0){
        playerDir = -playerDir;
    }
    for(let i = 0; i < playerCols.length; i++){
        playerCols[i] += playerDir;
    }
}

function drawPlayer() {
    push();
    fill(gameColor);
    playerCols.forEach(pc => rect(pc*blockSize, playerRow*blockSize, blockSize, blockSize));
    pop();
}

function drawMap(){
    push();
    noStroke();
    fill(gameColor);
    for(let i = 0; i < rows; i++){
        let col = [];
        for(let j = 0; j < cols; j++){
            if(gameMap[i][j] === 1){
                rect(j*blockSize, i*blockSize, blockSize, blockSize);
            }
        }
    }
    pop();
}

function drawLines(){
    push();
    stroke(255);
    for(let i = 0; i <= cols; i++){
        line(i*blockSize, 0, i*blockSize, height);
    }
    for(let i = 0; i <= rows; i++){
        if(i === 0 || i === 1 || i === 4 || i === 5){
            strokeWeight(4);
        }else{
            strokeWeight(1);
        }
        line(0, i*blockSize, width, i*blockSize);
    }
    pop();
}