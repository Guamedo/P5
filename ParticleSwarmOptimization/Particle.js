class Particle{
    constructor(){
        this.pos = createVector(random(0, 600), random(0, 600));
        this.dir = createVector(random(-1, 1), random(-1,1));
        while(this.dir.x === 0 && this.dir.y === 0){
            this.dir = createVector(random(-1, 1), random(-1,1));
        }
        this.dir.normalize();
        this.speed = 2;
        this.sol = 1000;
        this.bestSol = 1000;
    }

    draw(){
        stroke(255);
        strokeWeight(5);
        point(this.pos.x, this.pos.y);
    }

    updateSol(){
        this.sol = dist(this.pos.x, this.pos.y, 300, 300);
        if(this.sol < this.bestSol){
            this.bestSol = this.sol;
        }
    }

    update(C1, p1, C2, p2, bestGlobalSol){
        this.pos.add(createVector(this.dir.x*this.speed, this.dir.y*this.speed));
        this.dir.x += C1*p1*(this.bestSol - this.sol) + C2*p2*(bestGlobalSol - this.sol);
        this.dir.y += C1*p1*(this.bestSol - this.sol) + C2*p2*(bestGlobalSol - this.sol);
        this.dir.normalize();
    }
}