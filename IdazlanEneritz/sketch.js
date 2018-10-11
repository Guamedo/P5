let txt = "Rainbow";
let txtSize = 250;
let font;

let lettersPoints = [];
let charPointList = [];

let offset = 0.0;
let rainbow = [];

function preload(){
    //Load the font for the text
    font = this.loadFont('fonts/RainbowColors.ttf');
}

function setup() {
    this.createCanvas(800, 400);

    //Add the rainbow colors to the vector
    rainbow.push(color(255, 0, 0));
    rainbow.push(color(255, 165, 0));
    rainbow.push(color(255, 255, 0));
    rainbow.push(color(0, 255, 0));
    rainbow.push(color(0, 0, 255));
    rainbow.push(color(75, 0, 130));
    rainbow.push(color(238, 130, 238));

    // Generate the point vector for the text
    let points = font.textToPoints(txt, 75, 250, txtSize, {
        sampleFactor: 1,
        simplifyThreshold: 0
    });

    // Calculate the number of points for each letter of the text
    let splitText = txt.split('');
    splitText.forEach(function (c) {
        let word = font.textToPoints(c, 75, 250, txtSize, {
            sampleFactor: 1,
            simplifyThreshold: 0
        });
        lettersPoints.push(word.length);
    });

    // Divide the text points vector in a CharPoints vector
    // A CharPoints object contains the points for each letter of the text
    let startIndex = 0;
    for(let i = 0; i < lettersPoints.length; i++){
        charPointList.push(new CharPoint(points.slice(startIndex, startIndex + lettersPoints[i] - 1), splitText[i]));
        startIndex += lettersPoints[i];
    }
}

function draw() {
    background(51);

    // Draw all the letters of the text
    for(let i = 0; i < charPointList.length; i++){
        strokeWeight(2);
        charPointList[i].draw(i, offset, this.frameCount, this);
    }
    offset -= 0.01;
}