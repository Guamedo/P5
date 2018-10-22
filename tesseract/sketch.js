let w, h;

let greed = [];
let pg;
let sc;
let colors = [];

function setup() {
    w = 300;
    h = 300;
    createCanvas(w, h);
    pg = createGraphics(w, h);
    sc = 1;

    for(let x = 0; x < width; x++){
      let row = [];
      for(let y = 0; y < height; y++){
          row.push(0);
      }
      greed.push(row);
    }
    greed[width/2-1][height/2-1] = 50000;

    colors.push(color(round(random(0, 255)), round(random(0, 255)), round(random(0, 255))));
    colors.push(color(round(random(0, 255)), round(random(0, 255)), round(random(0, 255))));
    colors.push(color(round(random(0, 255)), round(random(0, 255)), round(random(0, 255))));
}

function draw() {

    // Manage the input
    if(keyIsPressed){
        console.log(keyCode);

        // Zoom in
        if(keyCode === 43)/*+*/{
            sc += 0.1;
        }

        // Zoom out
        if(keyCode === 45)/*-*/{
            sc = max(0.0, sc - 0.1);
        }
    }

    // Update image pixels value
    updateGreed();

    push();
    // Scale the image
    translate(width/2, height/2);
    scale(sc);
    translate(-width/2, -height/2);

    // Draw the image
    drawGreed();
    pop();

    fill(200, 200);
    rect(0, 0, 100, 40, 5);
    textSize(10);
    fill(0);
    text("+ : Zoom in" ,10, 10);
    text("- : Zoom out" ,10, 22);
    text("c : Color scheme" ,10, 34);
}

function updateGreed(){
    for (let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            let num = greed[x][y];
            if(num > 3){
                greed[x][y] -= 4;
                if(x < width-1){
                    greed[x+1][y]++;
                }
                if(x > 0){
                    greed[x-1][y]++;
                }

                if(y < height-1){
                    greed[x][y+1]++;
                }
                if(y > 0){
                    greed[x][y-1]++;
                }
            }
        }
    }
}

function drawGreed(){
    pg.loadPixels();
    for (let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            let num = greed[x][y];
            let col;
            switch (num){
                case 0:
                    col = color(0);
                    break;
                case 1:
                    col = colors[0];
                    break;
                case 2:
                    col = colors[1];
                    break;
                case 3:
                    col = colors[2];
                    break;
                default:
                    col = color(255);
                    break;
            }
            pg.pixels[(x+y*width)*4] = red(col);
            pg.pixels[(x+y*width)*4 + 1] = green(col);
            pg.pixels[(x+y*width)*4 + 2] = blue(col);
            pg.pixels[(x+y*width)*4 + 3] = alpha(col);
        }
    }
    pg.updatePixels();
    image(pg, 0, 0);
}

function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}

function keyPressed(){
    if(keyCode === 99 || keyCode === 67)/*c*/{
        colors[0] = color(round(random(0, 255)), round(random(0, 255)), round(random(0, 255)));
        colors[1] = color(round(random(0, 255)), round(random(0, 255)), round(random(0, 255)));
        colors[2] = color(round(random(0, 255)), round(random(0, 255)), round(random(0, 255)));
    }
}

function mousePressed(){
    if(mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height){
        greed[mouseX][mouseY] += 1000;
    }
}