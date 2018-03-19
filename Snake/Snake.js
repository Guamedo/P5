class Snake{
    constructor(){
        this.pos = createVector(120, 210);
        this.dir = createVector(1, 0);
        this.step = 3;
        this.faceDir = 0;
        this.tail = new Cacho(createVector(this.pos.x - 30, this.pos.y), createVector(this.dir.x, this.dir.y), this.step);
        this.addNewCacho = false;
        this.isDead = false;
        this.score = 0;
    }

    draw(){
        fill(50, 200, 50);
        if(this.dir.x !== 0){
            rect(this.pos.x, this.pos.y+2, 30, 30-4);
        }else{
            rect(this.pos.x+2, this.pos.y, 30-4, 30);
        }
        push();
        stroke(0);
        strokeWeight(4);
        switch (this.faceDir){
            case 0/*RIGHT*/:
                point(this.pos.x+15+8, this.pos.y+15+4);
                point(this.pos.x+15+8, this.pos.y+15-4);
                break;
            case 1/*LEFT*/:
                point(this.pos.x+15-8, this.pos.y+15+4);
                point(this.pos.x+15-8, this.pos.y+15-4);
                break;
            case 2/*DOWN*/:
                point(this.pos.x+15+4, this.pos.y+15+8);
                point(this.pos.x+15-4, this.pos.y+15+8);
                break;
            case 3/*LEFT*/:
                point(this.pos.x+15+4, this.pos.y+15-8);
                point(this.pos.x+15-4, this.pos.y+15-8);
                break;
            default:
                break;
        }
        pop();

        if(this.tail != null){
            this.tail.draw();
        }
    }

    draw2(){
        push();
        beginShape();
        noFill();
        stroke(50, 200, 50);
        strokeWeight(25);
        curveVertex(this.pos.x + 15, this.pos.y +15);
        curveVertex(this.pos.x + 15, this.pos.y +15);
        if(this.tail != null){
            this.tail.draw2();
        }
        endShape();
        pop();

        push();
        stroke(0);
        strokeWeight(4);
        switch (this.faceDir){
            case 0/*RIGHT*/:
                point(this.pos.x+15+6, this.pos.y+15+4);
                point(this.pos.x+15+6, this.pos.y+15-4);
                break;
            case 1/*LEFT*/:
                point(this.pos.x+15-6, this.pos.y+15+4);
                point(this.pos.x+15-6, this.pos.y+15-4);
                break;
            case 2/*DOWN*/:
                point(this.pos.x+15+4, this.pos.y+15+6);
                point(this.pos.x+15-4, this.pos.y+15+6);
                break;
            case 3/*LEFT*/:
                point(this.pos.x+15+4, this.pos.y+15-6);
                point(this.pos.x+15-4, this.pos.y+15-6);
                break;
            default:
                break;
        }
        pop();
    }

    update(map){

        if (this.pos.x % map.blockSize === 0 && this.pos.y % map.blockSize === 0) {
            if(this.addNewCacho){
                this.tail.addCacho();
                this.addNewCacho = false;
            }
            if(this.tail != null){
                let dirX = (this.pos.x - this.tail.pos.x)/30;
                let dirY = (this.pos.y - this.tail.pos.y)/30;
                this.tail.updateDir(createVector(dirX, dirY));
            }
        }
        this.pos.add(createVector(this.dir.x * this.step, this.dir.y * this.step));
        if(this.tail != null){
            this.tail.checkCollision(this);
        }
        if(this.pos.x < 0 || this.pos.x > width-30 || this.pos.y < 0 || this.pos.y > height-70){
            this.isDead = true;
        }
        if(this.tail != null){
            this.tail.update();
        }
    }

    setAddNewCacho(){
        this.score++;
        this.addNewCacho = true;
    }

    kill(){
        this.isDead = true;
    }
}