class Moon{
    constructor(x, y, rad, det = 100){
        this.pos = createVector(x, y);
        this.rad = rad;
        this.detail = det;
        this.phase = 0.0;
    }

    draw(p){

        /****************
        * Draw the Moon *
        *****************/

        // Set the style
        fill(150, 30, 30);
        stroke(0);

        // Draw the ellipse
        beginShape();
        let interval = 2*Math.PI/this.detail;
        for(let i = 0; i < this.detail; i++){
            let x = this.pos.x + this.rad*Math.cos(i*interval + Math.PI/2);
            let y = this.pos.y + this.rad*Math.sin(i*interval + Math.PI/2);
            vertex(x, y);
        }
        endShape(CLOSE);


        /************************
         * Draw the Moon Shadow *
         ************************/

        // Set the style
        fill(0, 250);
        stroke(0);
        strokeWeight(2);

        // Draw the shadow shape
        beginShape();

        // Draw the first point of the shape
        let x = this.pos.x + this.rad*Math.cos(Math.PI/2);
        let y = this.pos.y + this.rad*Math.sin(Math.PI/2);
        vertex(x, y);

        // Draw the first half of the shape (the left side)
        for(let i = 1; i < this.detail/2; i++){
            x = this.pos.x + this.rad*Math.cos(i*interval + Math.PI/2);
            y = this.pos.y + this.rad*Math.sin(i*interval + Math.PI/2);

            let dist = 2*Math.abs(this.pos.x - x);
            if(p < 1){
                vertex(x, y);
            }else{
                vertex(x + dist*(1-(p-1)), y);
            }
        }

        //Draw the point at the bottom of the shape
        x = this.pos.x + this.rad*Math.cos(3*Math.PI/2);
        y = this.pos.y + this.rad*Math.sin(3*Math.PI/2);
        vertex(x, y);

        // Draw the second half of the shape (the right side)
        for(let i = this.detail/2 + 1; i < this.detail; i++){
            x = this.pos.x + this.rad*Math.cos(i*interval + Math.PI/2);
            y = this.pos.y + this.rad*Math.sin(i*interval + Math.PI/2);

            let dist = 2*Math.abs(this.pos.x - x);
            if(p < 1){
                vertex(x - dist*p, y);
            }else{
                vertex(x, y);
            }
        }
        endShape(CLOSE);

    }
}