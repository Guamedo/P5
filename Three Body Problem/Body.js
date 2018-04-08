class Body{
    constructor(x, y, m, c){
        this.pos = c.createVector(x, y);
        this.m = m;
        this.v = c.createVector(0, 0);
        this.a = c.createVector(0, 0);
    }

    drawL(lc){
        lc.noStroke();
        //lc.fill(255);
        lc.ellipse(this.pos.x, this.pos.y, lc.round(10 + Math.sqrt(this.m)), lc.round(10 + Math.sqrt(this.m)));
        lc.stroke(255);
        lc.strokeWeight(1);
        let dir = lc.createVector(this.v.x, this.v.y).normalize().mult((10 + Math.sqrt(this.m))/3);
        lc.line(this.pos.x, this.pos.y, this.pos.x + dir.x, this.pos.y + dir.y);
    }

    drawR(rc){
        rc.noStroke();
        //rc.fill(255);
        rc.ellipse(this.pos.x, this.pos.y, 10, 10);
    }

    drawG(pg){
        pg.noStroke();
        //rc.fill(255);
        pg.ellipse(this.pos.x, this.pos.y, 1, 1);
    }

    updateAcceleration(b1, b2, G, c){
        this.a = c.createVector(0, 0);
        //Calculate acceleration to b1
        let r = c.dist(this.pos.x, this.pos.y, b1.pos.x, b1.pos.y);
        let F = G*b1.m/Math.pow(r, 2);
        let dir;
        if(r > 10+Math.sqrt(this.m)){
            dir = c.createVector((b1.pos.x-this.pos.x), (b1.pos.y-this.pos.y)).normalize();
        }else{
            dir = c.createVector(0, 0);
        }
        this.a = c.createVector(dir.x*F, dir.y*F);

        //Calculate acceleration to b2
        r = c.dist(this.pos.x, this.pos.y, b2.pos.x, b2.pos.y);
        F = G*b2.m/Math.pow(r, 2);
        if(r > 10+Math.sqrt(this.m)){
            dir = c.createVector((b2.pos.x-this.pos.x), (b2.pos.y-this.pos.y)).normalize();
        }else{
            dir = c.createVector(0, 0);
        }
        this.a.add(c.createVector(dir.x*F, dir.y*F));
    }

    update(){
        this.v.add(this.a);
        this.pos.add(this.v);
        /*if(this.pos.x < 0 || this.pos.x > 600){
            this.v.x = -this.v.x;
        }

        if(this.pos.y < 0 || this.pos.y > 600){
            this.v.y = -this.v.y;
        }*/
    }
}