let txt = "The Coding Train";
let font;
let points;
let drawIndex;
let patata = [];
let startIndex;
let rainbow = [];

let charPointList = [];
let offset = 0.0;

function preload(){
    font = loadFont('ParryHotter.ttf');
}

function setup() {

    rainbow.push(color(255, 0, 0));
    rainbow.push(color(255, 165, 0));
    rainbow.push(color(255, 255, 0));
    rainbow.push(color(0, 255, 0));
    rainbow.push(color(0, 0, 255));
    rainbow.push(color(75, 0, 130));
    rainbow.push(color(238, 130, 238));

    createCanvas(800, 400);
    background(250, 244, 227);

    points = font.textToPoints(txt, 50, 200, 100, {
        sampleFactor: 1,
        simplifyThreshold: 0
    });

    splitText = txt.split('');
    splitText.forEach(function (c) {
        let cosa = font.textToPoints(c, 75, 200, 100, {
            sampleFactor: 1,
            simplifyThreshold: 0
        });
        patata.push(cosa.length);
    });
    drawIndex = 0;
    startIndex = 0;

    for(let i = 0; i < patata.length; i++){
        charPointList.push(new CharPoint(points.slice(startIndex, startIndex + patata[i] - 1), splitText[i]));
        startIndex += patata[i];
    }

    let col = this.lerpColor(rainbow[0], rainbow[1], offset);

}

function draw() {
    background(51);
    for(let i = 0; i < charPointList.length; i++){
        charPointList[i].draw(i, offset, frameCount, this);
    }
    offset -= 0.1;

    /*if(drawIndex < points.length){
        for(let i = 0; i < drawSpeed && drawIndex+i < points.length; i++) {
            let p = (drawIndex+i)/points.length;
            stroke(0, (1-p)*255, p*255);
            if(drawIndex+i === 0) {
                point(points[drawIndex + i].x, points[drawIndex + i].y);
            }else{
                line(points[drawIndex + i - 1].x, points[drawIndex + i -1].y, points[drawIndex + i].x, points[drawIndex + i].y)
            }
        }
        drawIndex += drawSpeed;
    }*/


    /*fill(218, 165, 32);
    noStroke();
    textFont(font);
    textSize(85);
    text(txt, 70, 100);*/
}