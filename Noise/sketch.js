let frec = 60/4;
let sep = 5;
let noise = 0;

function setup() {
    let canvas = createCanvas(600, 600);

    canvas.position(100, 100);

    background(255);
    rect(0, 0, width-1, height-1);

    strokeWeight(1);
    blueNoise();
}

function draw() {

}

function keyPressed(){
    if(keyCode === 66){
        background(255);
        rect(0, 0, width-1, height-1);
        strokeWeight(1);
        blueNoise();
        noise = 0;
    }

    if(keyCode === 87){
        background(255);
        rect(0, 0, width-1, height-1);
        strokeWeight(1);
        whiteNoise();
        noise = 1;
    }

    if(keyCode === 85){
        background(255);
        rect(0, 0, width-1, height-1);
        strokeWeight(1);
        uniform();
        noise = 2;
    }
}

function blueNoise() {
    for(let i = 0; i < frec; i++){
        for(let j = 0; j < frec; j++){
            let x = random(i*(width-1)/frec + sep, i*(width-1)/frec + sep + (width-1)/frec - sep*2);
            let y = random(j*(height-1)/frec + sep, j*(height-1)/frec + sep + (height-1)/frec - sep*2);
            //rect(i*(width-1)/frec + sep, j*(height-1)/frec + sep, (width-1)/frec - sep*2, (height-1)/frec - sep*2);
            fill(0);
            stroke(0);
            ellipse(x, y, 5);
            stroke(0);
            noFill();
        }
    }
}

function whiteNoise() {
    for(let i = 0; i < frec*frec; i++){
        let x = random(0, width-1);
        let y = random(0, height-1);
        fill(50, 200, 50);
        stroke(50, 200, 50);
        ellipse(x, y, 5);
        stroke(0);
        noFill();
    }
}

function uniform() {
    for(let i = 0; i < frec; i++){
        for(let j = 0; j < frec; j++){
            let x = (i*(width-1)/frec + sep) + ((width-1)/frec - sep*2)/2;
            let y = (j*(height-1)/frec + sep) + ((height-1)/frec - sep*2)/2;
            //rect(i*(width-1)/frec + sep, j*(height-1)/frec + sep, (width-1)/frec - sep*2, (height-1)/frec - sep*2);
            fill(50, 200, 50);
            stroke(50, 200, 50);
            ellipse(x, y, 5);
            stroke(0);
            noFill();
        }
    }
}