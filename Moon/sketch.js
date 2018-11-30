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

//let mushrooms = [];
//let img;

//Moon image
let moonImage;

function preload(){
    //img = loadImage("images/Mushroom.png");
    moonImage = loadImage("images/moon.png");
}

function setup() {
    let canvas = createCanvas(window.windowWidth - 10, window.windowHeight - 10);
    canvas.position(5, 5);

    radMax = Math.min(width/2 - 10, height/3 - 10);
    rad = (radMin+radMax)/1.3;

    gui = createGui('Moon Parameters');
    gui.addGlobals('rad', 'r', 'g', 'b');

    stars = generateStarsBlueNoise(starNumber, width, height);
    moon = new Moon(width/2, height/3, rad, color(r, g, b));

    /*
    for(let i = 0; i < 40; i++){
        let pos;

        let found = false;
        while(!found){
            found = true;
            pos = createVector(random(20, width-20), height-random(40, 50));
            for(let i = 0; i < mushrooms.length; i++){
                if(mushrooms[i].dist(pos) < 20){
                    found = false;
                }
            }
        }
        mushrooms.push(pos);
    }
    mushrooms.sort(function (a, b) {
        return a.y - b.y;
    });*/
}

function draw() {

    moon.update(rad, color(r, g, b));

    background(0);

    fill(255);
    noStroke();
    stars.forEach(s => ellipse(s.x, s.y, random(2, 6)));

    moon.draw(2*phase);

    /*
    // Draw the floor
    fill(161, 229, 76);
    noStroke();
    rect(0, height-40, width, 40);

    // Draw the mushrooms
    imageMode(CENTER);
    mushrooms.forEach(m => image(img, m.x, m.y, 40, 40));
    */

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

    for(let i = 0; i < mushrooms.length; i++){
        mushrooms[i].x = mushrooms[i].x * width/pWidth;
        mushrooms[i].y = mushrooms[i].y + height-pHeight;
    }

    // Recalculate the moon position
    moon.pos.x = width/2;
    moon.pos.y = height/3;
}
