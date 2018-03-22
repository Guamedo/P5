let brain;

var input = 7;
var hidden = 5;
var output = 1;

var pInput = input;
var pHidden = hidden;
var pOutput = output;

function setup() {
    createCanvas(600, 600);
    background(200);

    brain = new NeuronalNetwork(input, hidden, output);
    let inputArray = [];
    for (let i = 0; i < input; i++) {
        inputArray.push(random(0, 1));
    }
    brain.loadInputFromArray(inputArray);
    brain.predict();
    brain.draw(0, 0, 600, 600);

    var gui = createGui('Parameters', 500, 0);
    sliderRange(1, 100, 1);
    gui.addGlobals('input', 'hidden', 'output');
}

function draw() {
    if(pInput !== input || pHidden !== hidden || pOutput !== output) {
        background(200);
        brain = new NeuronalNetwork(input, hidden, output);
        let inputArray = [];
        for (let i = 0; i < input; i++) {
            inputArray.push(random(0, 1));
        }
        brain.loadInputFromArray(inputArray);
        brain.predict();
        brain.draw(0, 0, 600, 600);
    }
    pInput = input;
    pHidden = hidden;
    pOutput = output;
}