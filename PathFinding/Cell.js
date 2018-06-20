class Cell{
    constructor(i, j, size){
        this.pos = createVector(i, j);
        this.size = size;
        let r = random(1);
        this.isWall = false;
        if(r < 0.2){
            this.isWall = true;
        }


        this.cameFrome = null;
        this.fScore = Infinity;
        this.gScore = Infinity;

        this.visited = false;
        this.evaluated = false;
    }

    draw(){
        push();
        if(this.isWall){
            fill(0);
        }else if(this.visited){
            fill(50, 200, 50);
        }else if(this.evaluated) {
            fill(50, 200, 50, 100);
        }else{
            noFill();
        }
        stroke(0);
        strokeWeight(4);
        rect(this.pos.x*this.size, this.pos.y*this.size, this.size, this.size);
        pop();
    }

    draw2(){
        noStroke();
        if(this.visited){
            fill(50, 50, 200);
            rect(this.pos.x*this.size, this.pos.y*this.size, this.size, this.size);
        }else if(this.evaluated){
            fill(50, 50, 200, 100);
            rect(this.pos.x*this.size, this.pos.y*this.size, this.size, this.size);
        }

        if(this.isWall){
            fill(0);
            rect(this.pos.x*this.size + this.size/4, this.pos.y*this.size  + this.size/4, this.size/2, this.size/2, this.size/3, this.size/3);
        }
    }
}