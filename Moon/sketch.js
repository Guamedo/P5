let moon;

let phase = 0.0;
let speed = 0.002;

let starNumber = 50;
let stars = [];

// GUI
var gui;

var rad = 150;
var radMin = 20;
var radMax = 300;

var r = 255;
var rMin = 0;
var rMax = 255;

var g = 255;
var gMin = 0;
var gMax = 255;

var b = 255;
var bMin = 0;
var bMax = 255;

function setup() {
    let canvas = createCanvas(window.windowWidth - 10, window.windowHeight - 10);
    canvas.position(5, 5);

    radMax = Math.min(width/2 - 10, height/2 -10);
    rad = (radMin+radMax)/2;

    gui = createGui('Moon Parameters');
    gui.addGlobals('rad', 'r', 'g', 'b');

    stars = generateStarsBlueNoise(starNumber, width, height);
    moon = new Moon(width/2, height/2, rad, color(r, g, b));
}

function draw() {

    moon.update(rad, color(r, g, b));

    background(0);

    fill(255);
    noStroke();
    stars.forEach(s => ellipse(s.x, s.y, random(2, 6)));

    moon.draw(2*phase);

    phase = (phase + speed)%1.0;
}

function windowResized() {

    // Store window previous size
    pWidth = width;
    pHeight = height;

    // Resize the canvas
    resizeCanvas(window.windowWidth - 10, window.windowHeight - 10);

    // Recalculate the stars position
    for(let i = 0; i < stars.length; i++){
        stars[i].x = stars[i].x * width/pWidth;
        stars[i].y = stars[i].y * height/pHeight;
    }

    // Recalculate the moon radius
    moon.pos.x = width/2;
    moon.pos.y = height/2;
}
