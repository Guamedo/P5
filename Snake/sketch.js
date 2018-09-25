let map;
let snake;
let state = 0;
let namnam;
let bimba;
let mute = true;

let population = [];
let numberOfSnakes = 100;
//let snake;
let generation = 0;

let step = 10;

function preload(){
    namnam = loadSound('namnam.mp3');
    bimba = loadSound('bimba.mp3');
}

function setup() {
    createCanvas(17 * 30, 15 * 30 + 40);
    map = new Map();
    snake = new Snake();

    for(let i = 0; i < numberOfSnakes; i++){
        population.push(new Snake());
    }
    //console.log(population[snake].isDead);
}

function draw() {
    background(51);
    stroke(0);
    noFill();
    rect(0, 15 * 30, width, 40);
    textSize(24);
    fill(255);
    //text("Score: " + population[snake].score.toFixed(2) + "  Snake: " + snake + "  Generation: " + generation, 10, 480);


    switch (state){
        case 0:
            manageInput();
            map.update(snake);
            map.draw();
            snake.update(map);
            snake.draw2();
            if(snake.isDead){
                state = 1;
            }
            break;
        case 1:
            map = new Map();
            snake = new Snake();
            state = 0;
            break;
        default:
            break;
    }
    map.update(snake);
    map.draw();

    /*switch (state){
        case 0:
            //manageInput();
            for(let i = 0; i < step; i++) {
                population[snake].update(map);
                map.update(population[snake]);

                map.draw();
                population[snake].draw2();

                if (population[snake].isDead) {
                    //population[snake].score += population[snake].time/120;
                    map = new Map();
                    snake++;
                    if (snake >= numberOfSnakes) {
                        snake = 0;
                        state = 1;
                    }
                }
            }

            break;
        case 1:

            //map = new Map();

            generateNewPopulation();
            state = 0;
            break;
        default:
            break;
    }*/
}

function generateNewPopulation() {
    let patata = [];

    let scoresSum = 0;
    population.forEach(s => scoresSum += s.score);

    patata.push(population[0].score/scoresSum);
    let bestScore = population[0];
    let bestScoreIndex = 0;
    for(let i = 1; i < numberOfSnakes; i++){
        patata.push(population[i].score/scoresSum + patata[i-1]);
        if(population[i].score > bestScore){
            bestScore = population[i].score;
            bestScoreIndex = i;
        }
    }


    let newPopulation = [];
    newPopulation.push(new Snake(population[bestScoreIndex].brain));

    for(let i = 0; i < numberOfSnakes - 1; i++){
        let random1 = random(0, 1);
        let random2 = random(0, 1);

        let p1_index = 0;
        let p2_index = 0;

        let found = false;
        for(let i = 0; i < patata.length && !found; i++){
            if(patata[i] >= random1){
                found = true;
                p1_index = i;
            }
        }

        found = false;
        for(let i = 0; i < patata.length && !found; i++){
            if(patata[i] >= random2){
                found = true;
                p2_index = i;
            }
        }

        let newSnakeBrain = new Snake(population[p1_index].brain.blendWithMutation(population[p2_index].brain, 0.02, 5));
        console.log(newSnakeBrain);
        newPopulation.push(newSnakeBrain);
    }
    population = newPopulation;
    generation++;
}

function keyPressed(){
    if(keyCode === 13){
        switch (step){
            case 10:
                step = 100;
                break;
            case 100:
                step = 10;
                break;
        }
    }
}

function manageInput() {
    if (snake.pos.x % map.blockSize === 0 && snake.pos.y % map.blockSize === 0) {
        if (keyCode === 38)/*UP*/{
            if (snake.dir.y !== 1) {
                snake.faceDir = 0;
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
                snake.faceDir = 3;
                snake.dir = createVector(-1, 0);
            }
        }
        if (keyCode === 39)/*RIGHT*/{
            if (snake.dir.x !== -1) {
                snake.faceDir = 1;
                snake.dir = createVector(1, 0);
            }
        }
    }
}