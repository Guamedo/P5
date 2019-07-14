class Boundary{
    constructor(x1, y1, x2, y2){
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    draw(){
        stroke(255);
        strokeWeight(2);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        /*noStroke();
        fill(255);
        ellipse(this.a.x, this.a.y, 10, 10);
        ellipse(this.b.x, this.b.y, 10, 10);*/
    }
}