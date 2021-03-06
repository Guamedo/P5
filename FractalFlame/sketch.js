let p;
let sc = 200;
let scDir = 1;
let F = new FunctionSet();
let V = new FunctionSet();

let offset = 0.0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    noiseSeed(31415);

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
    stroke(80, 220, 120);
    //stroke(176,224,230);
    for(let i = 0; i < 2000; i++) {
        point(sc * p.x, sc * p.y);
        let r = random(1);
        /*if(r < 1/3){
            stroke(200, 50, 50)
        }else if (r < 2/3){
            stroke(50, 200, 50)
        }else{
            stroke(50, 50, 200);
        }*/
        //p = F.getFunction(r)(p);
        p = F.getFunction(r)(V.getFunction(random(1))(p));
        p.x += noise(p.x+cos(offset+PI), p.y+sin(offset))*2-1;
        p.y += noise(p.x+cos(offset), p.y+sin(offset+PI/2))*2-1;
    }
    offset += 0.01;
    /*sc += scDir*2;
    if(sc > 600){
        scDir = -1;
    }
    if(sc < 150){
        scDir = 1;
    }*/
}