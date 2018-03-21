class Particle{
    constructor(){
        this.pos = createVector(random(0, 600), random(0, 600));
        this.dir = createVector(random(-1, 1), random(-1,1));
        while(this.dir.x === 0 && this.dir.y === 0){
            this.dir = createVector(random(-1, 1), random(-1,1));
        }
        this.dir.normalize();
        this.speed = 2;
        this.solX = 1000;
        this.solY = 1000;
        this.bestSolX = 1000;
        this.bestSolY = 1000;
    }

    draw(){
        stroke(255);
        strokeWeight(5);
        point(this.pos.x, this.pos.y);
    }

    updateSol(){
        this.solX = 300 - this.solX;
        if(this.solX < this.bestSolX){
            this.bestSolX = this.solX;
        }
        this.solY = 300 - this.solY;
        if(this.solY < this.bestSolY){
            this.bestSolY = this.solY;
        }
    }

    update(C1, p1, C2, p2, bestGlobalSolX, bestGlobalSolY){
        this.pos.add(createVector(this.dir.x*this.speed, this.dir.y*this.speed));
        this.dir.x += C1*p1*(this.bestSolX - this.solX) + C2*p2*(bestGlobalSolX - this.solX);
        this.dir.y += C1*p1*(this.bestSolY - this.solX) + C2*p2*(bestGlobalSolY - this.solY);
        this.dir.normalize();
    }
}