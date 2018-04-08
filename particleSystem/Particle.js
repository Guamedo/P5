class Particle{
    constructor(pos, dir){
        this.pos = pos;
        this.dir = dir;
        this.acc = createVector(0.02, 0.05);
    }

    draw(){
        fill(173, 216, 230, 150);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }

    update(){
        if(this.pos.y < height-100 || this.dir.x <= 0) {
            this.pos.add(this.dir);
            this.dir.add(this.acc);
            this.acc.x *= 0.99;
        }else{
            this.dir.y = -random(0.6, 0.9)*this.dir.y;
            this.dir.x += random(-2, 2);
            this.pos.add(this.dir);
            this.dir.add(this.acc);
            this.acc.x *= 0.99;
        }
    }
}