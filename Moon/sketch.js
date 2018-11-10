let phase = 0.0;
let starNumber = 50;
let stars = [];
let speed = 0.0005;

let moon;

function setup() {
    let canvas = createCanvas(window.windowWidth - 10, window.windowHeight - 10);
    canvas.position(5, 5);

    stars = generateStarsBlueNoise(starNumber, width, height);
    moon = new Moon(width/2, height/2, 150);
}

function draw() {
    background(0);

    fill(255);
    noStroke();
    stars.forEach(s => ellipse(s.x, s.y, random(2, 6)));

    //moon.draw(2.0*phase);
    moon.draw(2.0*(((1.0-phase)+0.5)%1.0));

    phase += speed;
    if(phase > 1){
        phase = 0.0;
    }
}

function generateStarsWhiteNoise(n, w, h){
    let s = [];
    for(let i = 0; i < n; i++){
        let point = createVector(random(5, w-5), random(5, h-5));
        while(center.dist(point) <= rad + 5){
            point = createVector(random(5, w-5), random(5, h-5));
        }
        s.push(point);
    }
    return s;
}

function generateStarsBlueNoise(n, w, h){
    let cols = Math.ceil(Math.sqrt(n));
    let rows = Math.ceil(Math.sqrt(n));
    let s = [];
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            s.push(createVector(random(i*(w/cols) + 5, i*(w/cols) + w/cols - 5),
                                random(j*(h/rows) + 5, j*(h/rows) + h/rows - 5)));
        }
    }
    return s;
}