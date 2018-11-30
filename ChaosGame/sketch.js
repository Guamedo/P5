let shapePoints = [];
let pVertex = 0;
let p;

function setup() {
    let cvn = createCanvas(windowWidth - 20, windowHeight - 20);
    cvn.position(10, 10);
    background(51);

    for(let i = 0; i < 5; i++){
        shapePoints.push(createVector(width/2 + min(width/2, height/2)*cos(i*((2*PI)/5) - PI/2),
            height/2 + min(width/2, height/2)*sin(i*((2*PI)/5) - PI/2)));
    }

    stroke(255);
    strokeWeight(1);

    p = createVector(random(10, width - 10), random(10, height - 10));
}

function draw() {
    for(let i = 0; i < 100; i++){
        colorMode(HSB, 2*PI, min(width/2, height/2), 1, 1);

        let angle = Math.atan2(height/2 - p.y, width/2 - p.x);
        if(angle < 0){
            angle = 2*PI + angle;
        }

        stroke(angle, createVector(width/2, height/2).dist(p), 1, 0.8);
        point(p.x, p.y);

        let r = floor(random(5));
        while(r === pVertex){
            r = floor(random(5));
        }
        p = (shapePoints[r].copy().add(p)).div(2);

        pVertex = r;
    }
}