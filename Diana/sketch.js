let canvas;
let diana1;
let diana2;

function setup() {
    canvas = this.createCanvas(window.windowWidth - 10, window.windowHeight - 10);
    canvas.position(5, 5);
    canvas.parent("canvas");

    diana1 = new Diana(2*width/8, height/2, width/5, width/40);
    diana2 = new Diana(6*width/8, height/2, width/5, width/40);

    /*
    for(let i = 0; i <= 40; i++){
        let t = i%41;
        let p = 40;
        let close = Math.round(40*Math.abs((t/p) - Math.floor((t/p) + 0.5)));
        console.log(close);
    }*/
}

function draw() {
    background(51);
    diana1.draw();
    diana2.draw();
}

function windowResized(){
    this.resizeCanvas(window.windowWidth - 10, window.windowHeight - 10);

    diana1.pos.x = 2*width/7;
    diana1.pos.y = height/2;
    diana1.rad = width/5;

    diana2.pos.x = 5*width/7;
    diana2.pos.y = height/2;
    diana2.rad = width/5;
}

function customEllipse(x0, y0, rad, distortion = 0, offset = 0, close = 0,det = 200){
    beginShape();
    let interval = 2*Math.PI/det;
    let distortionInterval = Math.PI/4;
    for(let i = 0; i <= det; i++){
        let n = distortion*Math.sin(i*distortionInterval + offset);
        let x = x0 + (rad+n)*Math.cos(i * interval);
        let y = y0 + (rad+n-close)*Math.sin(i * interval);
        vertex(x, y);
    }
    endShape();
}

