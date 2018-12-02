let shapePoints = [];
let shapePointNumber = 5;

let pVertex = 0;
let ppVertex = 1;
let p;

let pg;

let restrictMode = 1;

let img;
let imgMask;

function preload() {
    // Load HSB circle image
    img = loadImage('images/hsb.png');

    // Load mask
    imgMask = loadImage('images/hsb_mask.png');
}

function setup() {
    // Create canvas and set position
    let cvn = createCanvas(windowWidth - 20, windowHeight - 20);
    cvn.position(10, 10);
    background(51);

    // Create graphic to draw the fractal
    pg = createGraphics(windowWidth - 20, windowHeight - 20);
    pg.background(51);

    // Define the shape
    for(let i = 0; i < shapePointNumber; i++){
        shapePoints.push(createVector(width/2 + min(width/2, height/2)*cos(i*((2*PI)/shapePointNumber) - PI/2),
            height/1.85 + min(width/2, height/2)*sin(i*((2*PI)/shapePointNumber) - PI/2)));
    }

    // Draw the shape
    pg.fill(255);
    pg.strokeWeight(2);
    pg.stroke(255);
    for(let i = 0; i < shapePointNumber; i++){
        pg.ellipse(shapePoints[i].x, shapePoints[i].y, 5, 5);
        pg.line(shapePoints[i].x, shapePoints[i].y,
                shapePoints[(i+1)%shapePointNumber].x, shapePoints[(i+1)%shapePointNumber].y)
    }

    //Set points size
    pg.strokeWeight(1);
    imgMask.filter(INVERT);

    // Init first random point
    p = createVector(random(10, width - 10), random(10, height - 10));

    // Apply the mask to the image
    img.loadPixels();
    imgMask.loadPixels();
    var imagePixels = 4 * (img.width) * (img.height);
    for (var i = 0; i < imagePixels; i += 4) {
        if(imgMask.pixels[i] < 127 && imgMask.pixels[i+1] < 127 && imgMask.pixels[i+2] < 127){
            img.pixels[i + 3] = 0;
        }
    }
    img.updatePixels();
    imgMask.updatePixels();
}

function draw() {
    // Draw the points
    image(pg, 0, 0);

    // Draw the HSB circle image
    push();
    image(img, width - min(width/5, height/5) - 10, 10, min(width/5, height/5), min(width/5, height/5));
    pop();

    // Add 500 new points to the image and draw the lines connecting them
    for(let i = 0; i < 500 && frameCount < 2000; i++){
        // Set the color mode to HSB
        pg.colorMode(HSB, 2*PI, min(width/2, height/2), 1, 1);

        // Calculate the color for the new point
        let angle = Math.atan2(height/2 - p.y, width/2 - p.x);
        if(angle < 0){
            angle = 2*PI + angle;
        }

        // Set the draw color
        pg.stroke(angle, createVector(width/2, height/2).dist(p), 1, 0.5);

        // Draw the point
        pg.point(p.x, p.y);

        // Calculate the next random point
        let r = floor(random(shapePointNumber));
        if(shapePointNumber === 5){
            switch (restrictMode) {
                case 0:
                    //Apply restriction (pentagon cosa)
                    while(r === pVertex){
                        r = floor(random(shapePointNumber));
                    }
                    break;
                case 1:
                    // Apply restriction (pentagon star)
                    r1 = mod(r + 1, 5);
                    r4 = mod(r + 4, 5);
                    while(r1 === pVertex && r1 === ppVertex || r4 === pVertex && r4 === ppVertex){
                        r = floor(random(shapePointNumber));
                        r1 = mod(r + 1, 5);
                        r4 = mod(r + 4, 5);
                    }
                    break;
                default:
                    console.log("Esto no deberia ocurrir");
                    restrictMode = 0;
                    break;
            }
        }

        // Save the previous point
        pp = p;
        p = (shapePoints[r].copy().add(p)).div(2);

        // Draw the line connecting the last two points
        colorMode(HSB, 2*PI, min(width/2, height/2), 1, 1);
        stroke(angle, createVector(width/2, height/2).dist(p), 1, 1);
        line(pp.x, pp.y, p.x, p.y);

        // Save the previous two reference points index
        ppVertex = pVertex;
        pVertex = r;
    }
}

// Mod with negative values
function mod(n, m) {
    return ((n % m) + m) % m;
}