class Emisor2{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.rays = [];
        this.col = color(255, 255, 255, 100);
    }

    update(walls){
        this.rays = [];
        for(let wall of walls){
            let angle = Math.atan2(wall.a.y-this.pos.y, wall.a.x-this.pos.x);
            //this.rays.push(new Ray(this.pos.x, this.pos.y, angle));
            this.rays.push(new Ray(this.pos.x, this.pos.y, angle+1e-4));
            this.rays.push(new Ray(this.pos.x, this.pos.y, angle-1e-4));
            angle = Math.atan2(wall.b.y-this.pos.y, wall.b.x-this.pos.x);
            //this.rays.push(new Ray(this.pos.x, this.pos.y, angle));
            this.rays.push(new Ray(this.pos.x, this.pos.y, angle+1e-4));
            this.rays.push(new Ray(this.pos.x, this.pos.y, angle-1e-4));
        }
        for(let wall of walls){
            for(let ray of this.rays){
                ray.intersect(wall);
            }
        }
        this.rays.sort(function(a, b){
            let a1 = Math.atan2(a.dir.y, a.dir.x);
            let a2 = Math.atan2(b.dir.y, b.dir.x);
            return a1 - a2;
        })
    }

    draw(){
        fill(this.col);
        noStroke();
        beginShape();
        for(let i = 0; i < this.rays.length; i++){
            let r1 = this.rays[i];
            vertex(r1.pos.x+r1.dir.x*r1.dist, r1.pos.y+r1.dir.y*r1.dist);
        }
        endShape(CLOSE);
    }
}