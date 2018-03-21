let brain;

function setup() {
    createCanvas(600, 600);
    background(51);
    brain = new NeuronalNetwork(4, 3, 1);
    brain.draw();

}

function draw() {

}