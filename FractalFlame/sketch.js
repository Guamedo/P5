let p;
let sc = 100;
let F = new FunctionSet();
let V = new FunctionSet();

let offset = 0.0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);

    /* BARNSLEY FERN *//*
    F.addFunction(function(p){return createVector(0, 0.16*p.y)}, 10);
    F.addFunction(function(p){return createVector(0.85*p.x + 0.04*p.y, -0.04*p.x + 0.85*p.y + 1.6)}, 10);
    F.addFunction(function(p){return createVector(0.2*p.x - 0.26*p.y, 0.23*p.x + 0.22*p.y + 1.6)}, 10);
    F.addFunction(function(p){return createVector(-0.15*p.x + 0.28*p.y, 0.26*p.x + 0.24*p.y, + 0.44)}, 10);
    F.setSameProb();
    */

    /* SIERPINSKI TRIANGLE */
    F.addFunction(function(p){return createVector(p.x/2, (p.y-1)/2)}, 10);
    F.addFunction(function(p){return createVector((p.x-1)/2, (p.y+1)/2)}, 10);
    F.addFunction(function(p){return createVector((p.x+1)/2, (p.y+1)/2)}, 10);
    F.setSameProb();


    V.addFunction(function(p){return createVector(p.x, p.y)}, 10);

    V.addFunction(function(p){return createVector(sin(p.x), sin(p.y))}, 10);

    V.addFunction(function(p){return createVector(p.x*(1/p.mag()**2), p.y*(1/p.mag()**2))}, 10);

    V.addFunction(function(p){return createVector(p.x*sin(p.mag()**2) - p.y*cos(p.mag()**2),
                                                        p.x*sin(p.mag()**2) + p.y*cos(p.mag()**2))}, 10);

    V.addFunction(function(p){return createVector((p.x-p.y)*(p.x+p.y)*(1/p.mag()),
                                                        2*p.x*p.y*(1/p.mag()))}, 10);

    V.setSameProb();

    p = createVector(1, -1);
}

function draw() {
    translate(width/2, height/2/*+150*/);
    scale(1, -1);
    background(0, 10);
    stroke(80, 200, 120);
    for(let i = 0; i < 1000/*2500*/; i++) {
        point(sc * p.x, sc * p.y);
        //p = F.getFunction(random(1))(p);
        p = F.getFunction(random(1))(V.getFunction(random(1))(p));
        p.x += noise(p.x+cos(offset+PI), p.y+sin(offset))*2-1;
        p.y += noise(p.x+cos(offset), p.y+sin(offset+PI/2))*2-1;
    }
    offset += 0.008;
}