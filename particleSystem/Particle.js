class Particle{
    constructor(pos, dir, acc){
        this.pos = pos;
        this.dir = dir;
        this.acc = acc;
        this.color = color(round(random(0, 255)), round(random(0, 255)), round(random(0, 255)), 255)
    }

    draw(){
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }

    update(mX, mY){
        this.pos.add(this.dir);
        this.dir.add(this.acc);
        this.acc.y -= 0.01;
        if(this.pos.dist(createVector(mX, mY)) < 100){
            let dir = this.pos.copy().sub(createVector(mX, mY));
            let dist = this.pos.dist(createVector(mX, mY));
            this.acc.add((dir.normalize().div(dist)).mult(20));
        }
        this.acc.mult(0.5);
    }
}