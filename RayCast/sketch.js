let world;

let lights = [];
let lightsRad = 10;
let lightsNum = 3;
let offset = 0.0;

let x0 = -1;
let y0 = -1;
let lineLim = 100;

function setup() {
    createCanvas(windowWidth-20, windowHeight-20);
    world = new World(width, height);

    world.generateRandomPoly(200, 150);
    world.generateRandomPoly(width-200, 150);
    world.generateRandomPoly(200, height-150);
    world.generateRandomPoly(width-200, height-150);
    world.generateRandomPoly(width/2, height/2);

    let delta = 2.0*Math.PI/lightsNum;
    for(let i = 0; i < lightsNum; i++){
        lights.push(new Emisor2(width/2+lightsRad*Math.cos(i*delta), height/2+lightsRad*Math.sin(i*delta)))
    }
}

function draw() {
    background(0);

    // Update all the lights
    let delta = 2.0*Math.PI/lightsNum;
    for(let i = 0; i < lightsNum; i++){
        lights[i].pos = createVector(
            Math.max(Math.min(mouseX, width-lightsRad), lightsRad)+lightsRad*Math.cos(i*delta+offset),
            Math.max(Math.min(mouseY, height-lightsRad), lightsRad)+lightsRad*Math.sin(i*delta+offset)
        );
    }
    offset += 0.02;

    lights.forEach(l => l.update(world.walls));

    //Draw and update the world
    lights.forEach(l => l.draw());
    for(let light of lights){
        fill(200, 0, 0);
        ellipse(light.pos.x, light.pos.y, 5, 5);
    }
    world.draw();

    // Draw the new lines
    if(x0 !== -1 && y0 !== -1){
        if(mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height && dist(x0, y0, mouseX, mouseY) >= lineLim){
            stroke(0, 0, 255);
        }else{
            stroke(255, 0, 0);
        }
        strokeWeight(2);
        line(x0, y0, mouseX, mouseY);
    }
}

function mousePressed(){
    if(mouseButton === LEFT){
        if(mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height){
            x0 = mouseX;
            y0 = mouseY;
        }
    }
}

function mouseReleased() {
    if(mouseButton === LEFT){
        if(x0 !== -1 && y0 !== -1 && mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height){
            if(dist(x0, y0, mouseX, mouseY) >= lineLim){
                world.addWall(x0, y0, mouseX, mouseY);
            }
        }
        x0 = -1;
        y0 = -1;
    }
}