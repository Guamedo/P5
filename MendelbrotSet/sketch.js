let MAX_ITER_NUM = 100;

let mPX = -1;
let mPY = -1;

let mRX = -1;
let mRY = -1;

let pressed = false;

let mSet;
let cvn;

function setup() {
    cvn = createCanvas(windowWidth-20, windowHeight-20);
    cvn.position(windowWidth-(windowWidth+width)/2, windowHeight-(windowHeight+height)/2);

    mSet = createGraphics(windowWidth-20, windowHeight-20);

    noiseSeed(1996);

    // Render the Mendelbrot Set
    mSet.loadPixels();
    for(let Px = 0; Px < mSet.width; Px ++){
        for(let Py = 0; Py < mSet.height; Py++){
            let x0 = map(Px, 0, width, -2, 1);
            let y0 = map(Py, 0, height, -1.2, 1.2);

            let x = 0.0;
            let y = 0.0;

            let iter = 0;
            let max_iter = MAX_ITER_NUM;

            while(x*x + y*y < (1 << 16) && iter < max_iter){
                let xtemp = x*x - y*y + x0;
                y = 2*x*y + y0;
                x = xtemp;
                iter++;
            }

            if(iter < max_iter){
                let log_zn = Math.log(x*x + y*y)/2.0;
                let nu = Math.log(log_zn/Math.log(2))/Math.log(2);
                iter = iter + 1 - nu;
            }

            let col = colorMapPerlin(iter, 0.5);

            let i = (Px + Py*mSet.width)*4;
            mSet.pixels[i] = red(col);
            mSet.pixels[i+1] = green(col);
            mSet.pixels[i+2] = blue(col);
            mSet.pixels[i+3] = 255;
        }
    }
    mSet.updatePixels();
}

function draw() {
    image(mSet, 0, 0, width, height);

    fill(0, 50);
    stroke(0);
    if(pressed){
        rect(mPX, mPY, mouseX-mPX, mouseY-mPY);
        noFill();
        ellipse((mPX + mouseX)/2, (mPY + mouseY)/2, 10, 10);
    }else if(mPX >= 0 && mPY >= 0){
        rect(mPX, mPY, mRX-mPX, mRY-mPY);
        noFill();
        ellipse((mPX + mRX)/2, (mPY + mRY)/2, 10, 10);
    }
}

function colorMapPerlin(iter, scale=0.05){
    let col1R = noise(Math.floor(iter)*scale, 1)*255;
    let col1G = noise(Math.floor(iter)*scale, 20)*255;
    let col1B = noise(Math.floor(iter)*scale, 30)*255;

    let col2R = noise(Math.floor(iter+1)*scale, 1)*255;
    let col2G = noise(Math.floor(iter+1)*scale, 20)*255;
    let col2B = noise(Math.floor(iter+1)*scale, 30)*255;

    let col = lerpColor(color(col1R, col1G, col1B), color(col2R, col2G, col2B), iter-Math.floor(iter));
    if(iter >= MAX_ITER_NUM-1){
        return(color(0));
    }else{
        return(col);
    }
}

function mousePressed() {
    mPX = mouseX;
    mPY = mouseY;

    mRX = -1;
    mRY = -1;

    pressed = true;
}

function mouseReleased() {
    mRX = mouseX;
    mRY = mouseY;
    pressed = false;
}

function windowResized(){
    resizeCanvas(windowWidth-20, windowHeight-20);
    cvn.position(windowWidth-(windowWidth+width)/2, windowHeight-(windowHeight+height)/2);
}