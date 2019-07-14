class Ray{
    constructor(x, y, a){
        this.pos = createVector(x, y);
        this.dir = p5.Vector.fromAngle(a).normalize();
        this.dist = 1e8;
        this.col = color(50, 200, 50, 200)
    }

    draw(){
        stroke(this.col);
        strokeWeight(2);
        line(this.pos.x, this.pos.y, this.pos.x+this.dir.x*this.dist, this.pos.y+this.dir.y*this.dist);

        noStroke();
        fill(this.col);
        ellipse(this.pos.x+this.dir.x*this.dist, this.pos.y+this.dir.y*this.dist, 8, 8);
    }

    intersect(wall){
        let x1 = wall.a.x;
        let y1 = wall.a.y;
        let x2 = wall.b.x;
        let y2 = wall.b.y;

        let x3 = this.pos.x;
        let y3 = this.pos.y;

        let x4 = this.pos.x + this.dir.x;
        let y4 = this.pos.y + this.dir.y;

        let det = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);

        if(det === 0){
            return;
        }

        let t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4))/det;
        let u = -((x1-x2)*(y1-y3) - (y1-y2)*(x1-x3))/det;

        if(t >= 0.0 && t <= 1.0 && u >= 0.0){
            let ix = x1 + t*(x2-x1);
            let iy = y1 + t*(y2-y1);
            this.dist = Math.min(this.dist, dist(this.pos.x, this.pos.y, ix, iy));
        }
    }
}