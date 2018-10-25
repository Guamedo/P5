class MetaBall{
    constructor(pos, rad){
        this.pos = pos;
        this.rad = rad;
        this.dir = createVector(random(0, 1), random(0, 1)).normalize();
        this.speed = 2.0;
    }

    update(){
        this.pos.add(this.dir.copy().mult(this.speed));
        if(this.pos.x <= 0 || this.pos.x >= width){
            this.dir.x *= -1;
        }
        if(this.pos.y <= 0 || this.pos.y >= height){
            this.dir.y *= -1;
        }
    }
}

let metaBall = [];

function setup() {
    createCanvas(300, 200);
    pixelDensity(1);
    background(200);
    for(let i = 0; i < 3; i++){
        metaBall.push(new MetaBall(createVector(random(0, width), random(0, height)), 5000));
    }
}

function draw() {
    background(0);
    loadPixels();
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            let index = x + y * width;
            metaBall.forEach(function(mb){
                let dist = createVector(x, y).dist(mb.pos);
                pixels[index*4] += mb.rad/dist;
                pixels[index*4 + 1] += 0;
                pixels[index*4 + 2] += mb.rad/dist;
                pixels[index*4 + 3] = 255;
            });
            /*let dist = createVector(x, y).dist(metaBall.pos);
            pixels[index*4] = 0 + metaBall.rad/dist;
            pixels[index*4 + 1] = 0;
            pixels[index*4 + 2] = 0 + metaBall.rad/dist;
            pixels[index*4 + 3] = 255;*/
        }
    }
    updatePixels();
    metaBall.forEach(mb => mb.update());
}