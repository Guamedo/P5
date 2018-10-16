let txt = "IDAZLANA ENERITZ";
let txtSize = 300;
let margin = 50;
let font;
let fontFile = "RainbowColors.ttf";
let charType;

let lettersPoints = [];
let charPointList = [];

let offset = 0.0;
let rainbow = [];

let drawSpeed = 4;
let drawIndex = 0;

function preload(){
    //Load the font for the text
    font = this.loadFont("fonts/" + fontFile);

    // Set the char type to 0 or to 1 depending of the font you are using
    // to check which one you should use test both and stay with the one that
    // best fits
    charType = 0;
}

function setup() {
    let canvas = this.createCanvas(window.windowWidth-8, window.windowHeight-8);
    canvas.position(4, 4);

    //Add the rainbow colors to the vector
    rainbow.push(color(255, 0, 0));     // RED
    rainbow.push(color(255, 165, 0));   // ORANGE
    rainbow.push(color(255, 255, 0));   // YELLOW
    rainbow.push(color(0, 255, 0));     // GREEN
    rainbow.push(color(0, 0, 255));     // BLUE
    rainbow.push(color(75, 0, 130));    //INDIGO
    rainbow.push(color(238, 130, 238)); // VIOLET

    // Check if the text points are load in the session
    if(sessionStorage.getItem("WordPointList") !== null &&
        sessionStorage.getItem("Font") === fontFile &&
        sessionStorage.getItem("Text") === txt) {

        // Load the points from the session variable WordPointList
        let charPoints = JSON.parse(sessionStorage.getItem("WordPointList"));
        for(let i = 0; i < charPoints.length; i++){
            charPointList.push(new CharPoint(charPoints[i].points, charPoints[i].char, charType));
        }
    }else{
        // Generate the point vector for the text
        let points = font.textToPoints(txt, margin, 275, txtSize, {
            sampleFactor: 1,
            simplifyThreshold: 0
        });

        // Calculate text margins
        let maxX = 0;
        let minX = Infinity;
        points.forEach(function (p) {
            if (p.x > maxX) {
                maxX = p.x;
            }
            if (p.x < minX) {
                minX = p.x;
            }
        });

        // Scale the text to fit in the margins
        let textScale = (width-2*margin)/(maxX-minX);
        console.log(textScale*txtSize);
        points = font.textToPoints(txt, margin, 275, txtSize*textScale, {
            sampleFactor: 1,
            simplifyThreshold: 0
        });

        // Calculate the center of the text
        let maxY = 0;
        let minY = Infinity;
        points.forEach(function (p) {
            if (p.y > maxY) {
                maxY = p.y;
            }
            if (p.y < minY) {
                minY = p.y;
            }
        });
        let textCenterY = (maxY+minY)/2;
        console.log(textCenterY);

        // Center the text in de middle of the canvas
        points = font.textToPoints(txt, margin, 275 + (height/2-textCenterY), txtSize*textScale, {
            sampleFactor: 1,
            simplifyThreshold: 0
        });

        // Calculate the number of points for each letter of the text
        let splitText = txt.split('');
        splitText.forEach(function (c) {
            let word = font.textToPoints(c, margin, 275, txtSize*textScale, {
                sampleFactor: 1,
                simplifyThreshold: 0
            });
            lettersPoints.push(word.length);
        });

        // Divide the text points vector in a CharPoints vector
        // A CharPoints object contains the points for each letter of the text
        let startIndex = 0;
        for (let i = 0; i < lettersPoints.length; i++) {
            charPointList.push(new CharPoint(points.slice(startIndex, startIndex + lettersPoints[i] - 1), splitText[i], charType));
            startIndex += lettersPoints[i];
        }
        sessionStorage.setItem("WordPointList", JSON.stringify(charPointList));
        sessionStorage.setItem("Font", fontFile);
        sessionStorage.setItem("Text", txt);
    }
}

function draw() {
    background(51);

    // Draw all the letters of the text
    for(let i = 0; i < charPointList.length; i++){
        strokeWeight(2);
        charPointList[i].draw(i, offset, drawIndex, this);
    }
    drawIndex += drawSpeed;

    offset -= 0.02;
}