let birds = [];
let walls = [];
let state = 0;
let birdsNum = 200;
let mutationRate = 0.02;
let mutationSize = 10;
let steps = 10;
let changeSteps = false;
let generation = 0;
let bestGeneration = 0;
let maxF = 0;
let bestBirdString = "";
let time = 0;

function setup() {
    createCanvas(411, 617);
    for(let i = 0; i < birdsNum; i++) {
        birds.push(new Bird());
    }
    createButton('save').position(width+10, 10).mousePressed(function() {
                                                                let list = split(bestBirdString, '\n');
                                                                saveStrings(list, 'bestBirdNN.txt');
    });
}

function draw() {

    background(51);
    if(frameRate() >0){
        time += (1.0/frameRate())*steps;
    }
    switch (state){
        case 0/*PLAY*/:

            if(changeSteps){
                switch(steps){
                    case 1:
                        steps = 10;
                        break;
                    case 10:
                        steps = 1;
                        break;
                    default:
                        steps = 1;
                        break;
                }
                changeSteps = false;
            }

            for(let i = 0; i < steps; i++){
                walls.forEach(function(w){
                    let deadBirds = w.update(birds);
                    deadBirds.forEach(db => birds[db].isDead = true);
                });
                birds.forEach(function(b){
                    if(!b.isDead){
                        b.update(walls);
                    }
                });
                let bestBirdFitness = 0;
                for(let j = 0; j < birds.length; j++){
                    if(!birds[j].isDead && birds[j].fitness > bestBirdFitness){
                        bestBirdFitness = birds[j].fitness;
                    }
                }
                if(bestBirdFitness > maxF){
                    maxF = bestBirdFitness;
                }

                /*if(frameCount % (80*steps) === 0){
                    walls.push(new Wall(30, 200));
                }*/

                walls = walls.filter(w => w.x >= -w.width/2);

                let allBirdsAreDead = true;
                birds.forEach(b => allBirdsAreDead = allBirdsAreDead & b.isDead);

                if(allBirdsAreDead){
                    state = 1;
                }
            }
            if(frameCount % (100/steps) === 0){
                walls.push(new Wall(30, 150));
            }

            walls.forEach(w => w.draw());
            birds.forEach(function(b){
                if(!b.isDead){
                    b.show();
                }
            });

            fill(51);
            rect(0, 0, width, 40);
            rect(0, height-40, width, 40);
            fill(255);
            textSize(20);
            text("Generation: " + generation, 10, 30);
            text("X" + steps, width-40, 30);
            text("Max fitness: " + maxF, 10, height - 10);
            text("Time: " + Math.floor(time/3600) + ":" + Math.floor(time/60)%60 + ":" + Math.floor(time)%60, 200, height - 10);
            break;
        case 1/*DEAD*/:
            time = 0;
            walls = [];
            state = 0;
            generateNewPopulation();
            generation++;
            break;
        default:
            break;
    }
}

function generateNewPopulation(){

    let patata = [];
    let sum = 0;
    birds.forEach(b => sum += b.fitness);
    let maxFitness = -1;
    let maxFitnessIndex = 0;
    for(let i = 0; i < birdsNum; i++){
        if(birds[i].fitness > maxFitness){
            maxFitness = birds[i].fitness;
            maxFitnessIndex = i;
        }
    }

    if(maxFitness > maxF){
        maxF = maxFitness;
        bestGeneration = generation;
        WriteBestBird(birds[maxFitnessIndex]);
    }

    let newGen = [];
    if(generation - bestGeneration >= 20){
        for (let i = 0; i < birdsNum; i++) {
            bestGeneration = generation;
            newGen.push(new Bird());
        }
    }else {
        patata.push(birds[0].fitness / sum);
        for (let i = 1; i < birdsNum - 1; i++) {
            patata.push(patata[i - 1] + birds[i].fitness / sum);
        }
        patata.push(1);


        let bestBird = birds[maxFitnessIndex];
        newGen.push(new Bird(bestBird.W1, bestBird.b1, bestBird.W2, bestBird.b2));
        for (let i = 0; i < birdsNum - 1; i++) {
            let rand1 = random(0, 1);
            let rand2 = random(0, 1);
            let parent1;
            let parent2;

            let found = false;
            if (rand1 < patata[0]) {
                parent1 = birds[i];
                found = true;
            }
            for (let i = 1; i < birdsNum && !found; i++) {
                if (rand1 >= patata[i - 1] && rand1 < patata[i]) {
                    parent1 = birds[i];
                    found = true;
                }
            }
            if (!found) {
                parent1 = birds[birdsNum - 1];
            }

            found = false;
            if (rand2 < patata[0]) {
                parent2 = birds[i];
                found = true;
            }
            for (let i = 1; i < birdsNum && !found; i++) {
                if (rand2 >= patata[i - 1] && rand2 < patata[i]) {
                    parent2 = birds[i];
                    found = true;
                }
            }
            if (!found) {
                parent2 = birds[birdsNum - 1];
            }

            // Generate the new W1
            let W1 = [];
            for (let i = 0; i < 4; i++) {
                W1[i] = [0, 0, 0];
            }

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    if (random(0, 1) <= 0.5) {
                        W1[i][j] = parent1.W1[i][j];
                        if (random(0, 1) <= mutationRate) {
                            W1[i][j] += random(-mutationSize, mutationSize);
                        }
                    } else {
                        W1[i][j] = parent2.W1[i][j];
                        if (random(0, 1) <= mutationRate) {
                            W1[i][j] += random(-mutationSize, mutationSize);
                        }
                    }
                }
            }
            // Generate the new b1
            let b1 = [];
            for (let i = 0; i < 3; i++) {
                if (random(0, 1) <= 0.5) {
                    b1.push(parent1.b1[i]);
                    if (random(0, 1) <= mutationRate) {
                        b1[i] += random(-mutationSize, mutationSize);
                    }
                } else {
                    b1.push(parent2.b1[i]);
                    if (random(0, 1) <= mutationRate) {
                        b1[i] += random(-mutationSize, mutationSize);
                    }
                }
            }
            // Generate the new W2
            let W2 = [];
            for (let i = 0; i < 3; i++) {
                if (random(0, 1) <= 0.5) {
                    W2.push(parent1.W2[i]);
                    if (random(0, 1) <= mutationRate) {
                        W2[i] += random(-mutationSize, mutationSize);
                    }
                } else {
                    W2.push(parent2.W2[i]);
                    if (random(0, 1) <= mutationRate) {
                        W2[i] += random(-mutationSize, mutationSize);
                    }
                }
            }
            // Generate the new b2
            let b2;
            if (random(0, 1) <= 0.5) {
                b2 = parent1.b2;
                if (random(0, 1) <= mutationRate) {
                    b2 += random(-mutationSize, mutationSize);
                }
            } else {
                b2 = parent2.b2;
                if (random(0, 1) <= mutationRate) {
                    b2 += random(-mutationSize, mutationSize);
                }
            }

            newGen.push(new Bird(W1, b1, W2, b2));
        }
    }
    birds = newGen;
}

function keyPressed(){
    if(keyCode = 13){
        changeSteps = true;
    }
}

function WriteBestBird(bird) {
        bestBirdString = bird.W1[0].toString() + "\n";
        bestBirdString += bird.W1[1].toString() + "\n";
        bestBirdString += bird.W1[2].toString() + "\n";
        bestBirdString += bird.W1[3].toString() + "\n";
        bestBirdString += bird.b1.toString() + "\n";
        bestBirdString += bird.W2.toString() + "\n";
        bestBirdString += bird.b2 + "\n";
}
