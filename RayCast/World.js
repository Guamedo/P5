class World{
    constructor(width, height){
        this.walls = [];
        this.walls.push(new Boundary(0, 0, 0, height));
        this.walls.push(new Boundary(width, 0, width, height));
        this.walls.push(new Boundary(0, 0, width, 0));
        this.walls.push(new Boundary(0, height, width, height));
    }

    draw(){
        for(let wall of this.walls){
            wall.draw();
        }
    }

    addWall(x1, y1, x2, y2){
        let points = [];
        for(let wall of this.walls){
            let x3 = wall.a.x;
            let y3 = wall.a.y;
            let x4 = wall.b.x;
            let y4 = wall.b.y;
            let det = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);

            if(det === 0){
                continue;
            }

            let t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4))/det;
            let u = -((x1-x2)*(y1-y3) - (y1-y2)*(x1-x3))/det;

            if(t > 0.0 && t < 1.0 && u > 0.0 && u < 1.0){
                let ix = x1 + t*(x2-x1);
                let iy = y1 + t*(y2-y1);
                points.push(createVector(ix, iy));
            }
        }
        points.sort(function(a, b){
            return(dist(a.x, a.y, x1, x2) - dist(b.x, b.y, x1, x2));
        });
        let x0 = x1;
        let y0 = y1;

        for(let point of points){
            this.walls.push(new Boundary(x0, y0, point.x, point.y));
            x0 = point.x;
            y0 = point.y;
        }
        this.walls.push(new Boundary(x0, y0, x2, y2));
    }

    generateRandomPoly(x, y) {
        let rad = random(20, 150);
        let pNum = random(5, 10);

        let delta = 2*Math.PI/pNum;
        let points = [];

        for(let i = 0; i < pNum; i++){
            let px = x + (rad+random(-rad/2, rad/2))*Math.cos(delta*i);
            let py = y + (rad+random(-rad/2, rad/2))*Math.sin(delta*i);
            points.push(createVector(px, py));
        }

        for(let i = 0; i < points.length; i++){
            this.addWall(points[i].x, points[i].y, points[(i+1)%points.length].x, points[(i+1)%points.length].y);
        }
    }
}