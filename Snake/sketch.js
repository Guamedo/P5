let map;
let snake;
let state = 0;
let namnam;
let bimba;

function preload(){
    namnam = loadSound('namnam.mp3');
    bimba = loadSound('bimba.mp3');
}

function setup() {
    createCanvas(17 * 30, 15 * 30 + 40);
    map = new Map();
    snake = new Snake();
}

function draw() {
    background(51);
    stroke(0);
    noFill();
    rect(0, 15 * 30, width, 40);
    textSize(24);
    fill(255);
    text("Score: " + snake.score, 10, 480)
    switch (state){
        case 0:
            manageInput();

            snake.update(map);
            map.update(snake);

            map.draw();
            snake.draw2();

            if(snake.isDead){
                bimba.play();
                state = 1;
            }
            break;
        case 1:
            textSize(50);
            fill(255);
            text("GAME OVER", 90, height/2);
            if(keyIsPressed){
                if(keyCode === 13){
                    map = new Map();
                    snake = new Snake();
                    state = 0;
                }
            }
            break;
        default:
            break;
    }


}

function manageInput() {
    if (snake.pos.x % map.blockSize === 0 && snake.pos.y % map.blockSize === 0) {
        if (keyCode === 38)/*UP*/{
            if (snake.dir.y !== 1) {
                snake.faceDir = 3;
                snake.dir = createVector(0, -1);
            }
        }
        if (keyCode === 40)/*DOWN*/{
            if (snake.dir.y !== -1) {
                snake.faceDir = 2;
                snake.dir = createVector(0, 1);
            }
        }
        if (keyCode === 37)/*LEFT*/{
            if (snake.dir.x !== 1) {
                snake.faceDir = 1;
                snake.dir = createVector(-1, 0);
            }
        }
        if (keyCode === 39)/*RIGHT*/{
            if (snake.dir.x !== -1) {
                snake.faceDir = 0;
                snake.dir = createVector(1, 0);
            }
        }
    }
}