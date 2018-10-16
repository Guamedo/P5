class Diana{
    constructor(x, y, rad, arcDist){
        this.pos = createVector(x, y);
        this.rad = rad;
        this.arcDist = arcDist;
        this.colors = [];
        this.colors.push(color(255));
        this.colors.push(color(255, 0, 0));
    }

    draw(){
        let colIndex = 0;
        let r = this.rad;
        let t = frameCount%81;
        let p = 80;
        let close = (this.arcDist + this.rad - this.arcDist*Math.floor(this.rad/this.arcDist))*2*Math.abs((t/p) - Math.floor((t/p) + 0.5));
        while(r >= this.arcDist){
            push();
            translate(this.pos.x + Math.sin(frameCount*0.02)*60*((this.rad-r)/this.rad), this.pos.y);
            let offset = 0;
            if(colIndex){
                offset = 0.1*frameCount;
            }else{
                offset = -0.1*frameCount;
            }
            fill(this.colors[colIndex]);
            customEllipse(0, 0, r, (this.arcDist/5)*(r/this.rad), offset, close);
            r -= this.arcDist;
            colIndex = 1 - colIndex;
            pop();
        }
        fill(0);
        ellipse(this.pos.x + sin(frameCount*0.02)*60, this.pos.y, this.arcDist/2, (this.arcDist/2) - this.arcDist*Math.abs((t/p) - Math.floor((t/p) + 0.5)));
    }
}