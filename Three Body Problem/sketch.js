// B1 initial pos: 237.31478000654, 359.59374109091965
// B2 initial pos: 427.8508020516371, 537.082907729656
// B3 initial pos: 549.0878254826059, 65.778422137957


// B1 initial pos: 342.13150568928523, 297.9757836881082
// B2 initial pos: 240.1819431073636, 176.51564923181792
// B3 initial pos: 329.80448679053774, 194.51312954110708


// B1 initial pos: 514.4984000820122, 400.5385432165372
// B2 initial pos: 536.4080714963634, 339.0302952474285
// B3 initial pos: 261.1278738324296, 381.6986059824384


let body1, body2, body3;
let G = 0.6674;
let sc = 1;
let centroid;

let leftCanvas = function(lc){

    lc.setup = function(){
        lc.createCanvas(600, 600);
        lc.background(51);

        body1 = new Body(lc.random(50, lc.width-50),
            lc.random(50, lc.height-50),
            100, lc);
        console.log("B1 initial pos: ", body1.pos.x, ", ", body1.pos.y);

        body2 = new Body(lc.random(50, lc.width-50),
            lc.random(50, lc.height-50),
            100, lc);
        console.log("B2 initial pos: ", body2.pos.x, ", ", body2.pos.y);

        body3 = new Body(lc.random(50, lc.width-50),
            lc.random(50, lc.height-50),
            100, lc);
        centroid = lc.createVector((body1.pos.x + body2.pos.x + body3.pos.x)/3, (body1.pos.y + body2.pos.y + body3.pos.y)/3);
        console.log("B3 initial pos: ", body3.pos.x, ", ", body3.pos.y);
    };

    lc.draw = function(){
        lc.background(51);
        let x = (body1.pos.x + body2.pos.x + body3.pos.x)/3;
        let y = (body1.pos.y + body2.pos.y + body3.pos.y)/3;
        centroid = lc.createVector(x, y);

        let d = lc.dist(body1.pos.x, body1.pos.y, x, y);
        d = Math.max(lc.dist(body2.pos.x, body2.pos.y, x, y), d);
        d = Math.max(lc.dist(body3.pos.x, body3.pos.y, x, y), d);

        //lc.scale(300/d);
        sc = (lc.width/2 - 20)/d;
        lc.translate(lc.width/2, lc.height/2);
        lc.scale(sc);
        lc.translate(-lc.width/2, -lc.height/2);
        lc.translate(-x + lc.width/2, -y + lc.height/2);

        lc.noStroke();
        lc.fill(0);
        lc.ellipse(x, y, 5, 5);

        body1.updateAcceleration(body2, body3, G, lc);
        body2.updateAcceleration(body1, body3, G, lc);
        body3.updateAcceleration(body1, body2, G, lc);

        body1.update();
        body2.update();
        body3.update();

        lc.fill(200, 50, 50);
        body1.drawL(lc);
        lc.fill(50, 200, 50);
        body2.drawL(lc);
        lc.fill(50, 50, 200);
        body3.drawL(lc);

        if(sc < 0.2){
            body1 = new Body(lc.random(50, lc.width-50),
                lc.random(50, lc.height-50),
                100, lc);
            console.log("B1 initial pos: ", body1.pos.x, ", ", body1.pos.y);

            body2 = new Body(lc.random(50, lc.width-50),
                lc.random(50, lc.height-50),
                100, lc);
            console.log("B2 initial pos: ", body2.pos.x, ", ", body2.pos.y);

            body3 = new Body(lc.random(50, lc.width-50),
                lc.random(50, lc.height-50),
                100, lc);
            centroid = lc.createVector((body1.pos.x + body2.pos.x + body3.pos.x)/3, (body1.pos.y + body2.pos.y + body3.pos.y)/3);
            console.log("B3 initial pos: ", body3.pos.x, ", ", body3.pos.y);
            pg = lc.createGraphics(600, 600);
            pg.stroke(221);
            pg.strokeWeight(2);
            pg.line(-1000000, pg.height/2, 1000000, pg.height/2);
            pg.line(pg.width/2, -1000000, pg.width/2, 1000000);
        }

    };
};

let myp5 = new p5(leftCanvas, 'c1');

let pg;

let rightCanvas = function(rc){
    rc.setup = function(){
        rc.createCanvas(600, 600);
        pg = rc.createGraphics(600, 600);
        pg.stroke(221);
        pg.strokeWeight(2);
        pg.line(-1000000, pg.height/2, 1000000, pg.height/2);
        pg.line(pg.width/2, -1000000, pg.width/2, 1000000);
        rc.background(51);
    };

    rc.draw = function(){
        rc.background(51);

        pg.fill(200, 50, 50);
        body1.drawG(pg);
        pg.fill(50, 200, 50);
        body2.drawG(pg);
        pg.fill(50, 50, 200);
        body3.drawG(pg);
        pg.fill(0);
        pg.ellipse(centroid.x, centroid.y, 5, 5);
        rc.image(pg, 0, 0);

        rc.fill(200, 50, 50);
        body1.drawR(rc);
        rc.fill(50, 200, 50);
        body2.drawR(rc);
        rc.fill(50, 50, 200);
        body3.drawR(rc);
    };
};

let mup5 = new p5(rightCanvas, 'c2');