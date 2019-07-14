class Emisor{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.rays = [];
        this.rayNum = 90;
        let delta = 2.0*Math.PI/this.rayNum;
        for(let i = 0; i < this.rayNum; i++){
            this.rays.push(new Ray(x, y, delta*i+3*delta));
        }
    }

    update(walls){
        for(let ray of this.rays) {
            ray.pos = this.pos;
        }
        for(let ray of this.rays){
            ray.dist = 1e8;
            for(let wall of walls){
                ray.intersect(wall);
            }
        }
    }

    draw(){
        for(let ray of this.rays){
            ray.draw();
        }
    }
}