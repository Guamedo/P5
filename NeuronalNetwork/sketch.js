let brain;
var pInput = 4;
var pHidden = 3;
var pOutput = 2;
var input = 4;
var hidden = 3;
var output = 2;

function setup() {
    createCanvas(600, 600);
    background(200);

    brain = new NeuronalNetwork(input, hidden, output);
    brain.loadInputFromArray([0.2, 0.8, 0.1, 0.67]);
    brain.predict();
    brain.draw(0, 0, 600, 600);

    var gui = createGui('Parameters');
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