let particleSwarm = [];
let swarmSize = 50;
let C1;
let p1;
let C2;
let p2;
let bestGlobalSolX = 1000;
let bestGlobalSolY = 1000;

function setup() {
    createCanvas(600, 600);
    background(51);
    C1 = random(-300, 300);
    p1 = random(-300, 300);
    C2 = random(-300, 300);
    p2 = random(-300, 300);
    for(let i = 0; i < swarmSize; i++){
        particleSwarm.push(new Particle());
    }
}

function draw() {
    background(51);
    particleSwarm.forEach(p => p.updateSol());
    particleSwarm.forEach(function(p){
       if(p.bestSolX < bestGlobalSolX){
           bestGlobalSolX = p.bestSolX;
       }
        if(p.bestSolY < bestGlobalSolY){
            bestGlobalSolY = p.bestSolY;
        }
    });
    particleSwarm.forEach(p => p.update(C1, p1, C2, p2, bestGlobalSolX, bestGlobalSolY));
    particleSwarm.forEach(p => p.draw());
}