class Point{
    constructor(pos, isHead = false){
        this.pos = pos;
        this.vel = createVector(0, 1);
        this.rotation = 0;
        this.isHead = isHead;
        this.pTargetPos = null;
    }

    update(pos){
        if(this.pTargetPos == null || pos.dist(this.pos.copy()) <= 50 || pos.dist(this.pTargetPos.copy()) <= 5) {
            this.vel = pos.copy().sub(this.pos.copy()).normalize();
            if (pos.dist(this.pos.copy()) >= 10) {
                this.pos.add(this.vel.copy().mult(3.0));
            }
        }else{
            let targetDirection = pos.copy().sub(this.pTargetPos).normalize();
            let distToTarget = pos.dist(this.pos.copy());
            this.vel = pos.copy().add(targetDirection.mult(distToTarget*10)).sub(this.pos.copy()).normalize();
            this.pos.add(this.vel.copy().mult(3.0));
        }
        if(frameCount % 10 === 0){
            this.pTargetPos = pos;
        }

    }

    draw(distToTarget){
        //console.log(distToTarget/10);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(Math.atan2(this.vel.y,this.vel.x));
        noStroke();
        fill(200, 50, 50);
        ellipse(0, 0, 20-distToTarget/5, 20-distToTarget/5);
        if(this.isHead){
            fill(0);
            ellipse(5, 3, 5);
            ellipse(5, -3, 5);
        }else{
            stroke(0);
            strokeWeight(2);
            line(-8+distToTarget/10, 0, 8-distToTarget/10, 0);
            line(0, -8+distToTarget/10, 0, 8-distToTarget/10);
        }
        pop();
    }
}

class Bicho{
    constructor(pos){
        this.head = new Point(pos, true);
        this.head.vel = createVector(0, 1);
        this.body = [];
        this.body.push(new Point((this.head.pos.copy().sub(this.head.vel.copy().normalize().mult(10)))));
        for(let i = 0; i < 6; i++){
            this.body.push(new Point((this.body[i].pos.copy().sub(this.head.vel.normalize().mult(10)))));
        }
    }

    draw(){
        this.head.draw(0);
        this.body[0].draw(this.body[0].pos.dist(this.head.pos)-10);
        for(let i = 1; i < this.body.length; i++){
            this.body[i].draw(this.body[i].pos.dist(this.body[i-1].pos)-10);
        }
        //this.body.forEach(p => p.draw());
    }

    update(pos){
        this.head.update(pos);
        this.body[0].update((this.head.pos.copy().sub(this.head.vel.normalize().mult(10))));
        for(let i = 1; i < this.body.length; i++){
            let newPos = this.body[i-1].pos.copy().sub(this.head.vel.normalize().mult(10));
            this.body[i].update(newPos);
        }
    }
}

class Player{
    constructor(pos){
        this.pos = pos;
        this.dir = createVector(0, 0);
        this.speed = 5.0
    }

    draw(){
        push();
        noStroke();
        rectMode(CENTER);
        fill(50, 50, 200);
        rect(this.pos.x, this.pos.y, 20, 20, 5);
        pop();
    }

    update(){
        this.pos.add(this.dir.copy().mult(this.speed));
        this.dir = createVector(0, 0);
    }
}

let bicho;
let player;
let keys = [0, 0, 0, 0];

function setup() {
  createCanvas(600, 600);
  background(51);
  bicho = new Bicho(createVector(width/2, height/2+200));
  player = new Player(createVector(width/2, height/2));
}

function draw() {
    background(51);
    bicho.draw();
    player.draw();

    let targetX;
    let targetY;
    /*if(mouseIsPressed && mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height){
        targetX = mouseX;
        targetY = mouseY;
        fill(200, 200, 0, 100);
        noStroke();
        ellipse(mouseX, mouseY, 30, 30);
    }else{
        targetX = width/2 + 200*Math.sin(frameCount*0.01);
        targetY = height/2 + 200*Math.cos(frameCount*0.01);
        fill(200, 200, 0, 100);
        noStroke();
        ellipse(targetX, targetY, 10, 10);
    }
    let circleX = width/2 + 200*Math.sin(frameCount*0.01);
    let circleY = height/2 + 200*Math.cos(frameCount*0.01);*/

    targetX = player.pos.x;
    targetY = player.pos.y;

    bicho.update(createVector(targetX, targetY));

    if(keyIsPressed){
        console.log(keyCode);
        player.dir = createVector(0, 0);
        if(keys[0]/*UP*/){
            player.dir.add(createVector(0, -1));
        }

        if(keys[1])/*DOWN*/{
            player.dir.add(createVector(0, 1));
        }

        if(keys[2])/*LEFT*/{
            player.dir.add(createVector(-1, 0));
        }

        if(keys[3])/*RIGHT*/{
            player.dir.add(createVector(1, 0));
        }
        player.dir.normalize();
    }
    player.update();
}

function keyPressed(){
    if(keyCode === 38 /*UP*/){
        keys[0] = 1;
    }

    if(keyCode === 40)/*DOWN*/{
        keys[1] = 1;
    }

    if(keyCode === 37)/*LEFT*/{
        keys[2] = 1;
    }

    if(keyCode === 39)/*RIGHT*/{
        keys[3] = 1;
    }
}

function keyReleased() {
    if(keyCode === 38 /*UP*/){
        keys[0] = 0;
    }

    if(keyCode === 40)/*DOWN*/{
        keys[1] = 0;
    }

    if(keyCode === 37)/*LEFT*/{
        keys[2] = 0;
    }

    if(keyCode === 39)/*RIGHT*/{
        keys[3] = 0;
    }
}