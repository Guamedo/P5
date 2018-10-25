let hexSize = 20;

let randomX;
let randomY;

function setup() {
    this.createCanvas(600, 600);

    let cols = width/(2*hexSize+hexSize);
    let rows = height/(hexSize*Math.sin(Math.PI/3));

    randomX = this.round(this.random(cols-1));
    randomY = this.round(this.random(rows-1));
}

function draw() {
    background(51);
    stroke(255);
    this.noFill();

    let cols = width/(2*hexSize+hexSize);
    let rows = height/(hexSize*Math.sin(Math.PI/3));

    for(let i = 0; i <= cols; i++){
        for(let j = 0; j < rows; j++){
            if(i === randomX && j === randomY){
                this.fill(200, 50 ,50)
            }else{
                this.noFill();
            }
            hexagon(i*(2*hexSize+hexSize) + (j%2)*1.5*hexSize,
                j*hexSize*Math.sin(Math.PI/3),
                hexSize);
        }
    }
}

function hexagon(x0, y0, rad){
    this.beginShape();
    for(let i = 0; i <= 6; i++){
        let x = x0 + rad*Math.cos(i * PI/3);
        let y = y0 + rad*Math.sin(i * PI/3);
        vertex(x, y);
    }
    this.endShape();
}