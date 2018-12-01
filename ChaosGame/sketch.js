let shapePoints = [];
let shapePointNumber = 5;
let pVertex = 0;
let ppVertex = 1;
let p;
let speed = 1;

function setup() {
    let cvn = createCanvas(windowWidth - 20, windowHeight - 20);
    cvn.position(10, 10);
    background(51);

    for(let i = 0; i < shapePointNumber; i++){
        shapePoints.push(createVector(width/2 + min(width/2, height/2)*cos(i*((2*PI)/shapePointNumber) - PI/2),
            height/2 + min(width/2, height/2)*sin(i*((2*PI)/shapePointNumber) - PI/2)));
    }

    strokeWeight(1);

    p = createVector(random(10, width - 10), random(10, height - 10));
}

function draw() {
    for(let i = 0; i < floor(speed); i++){
        colorMode(HSB, 2*PI, min(width/2, height/2), 1, 1);

        let angle = Math.atan2(height/2 - p.y, width/2 - p.x);
        if(angle < 0){
            angle = 2*PI + angle;
        }

        stroke(angle, createVector(width/2, height/2).dist(p), 1, 0.5);
        point(p.x, p.y);

        let r = floor(random(shapePointNumber));

        // Apply restriction
        r1 = mod(r + 1, 5);
        r4 = mod(r + 4, 5);
        while(r1 === pVertex && r1 === ppVertex || r4 === pVertex && r4 === ppVertex){
            r = floor(random(shapePointNumber));
            r1 = mod(r + 1, 5);
            r4 = mod(r + 4, 5);
        }
        p = (shapePoints[r].copy().add(p)).div(2);

        ppVertex = pVertex;
        pVertex = r;
    }
    speed = min(speed*1.05, 500);
}

function mod(n, m) {
    return ((n % m) + m) % m;
}