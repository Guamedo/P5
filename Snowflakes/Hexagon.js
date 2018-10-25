class Hexagon{
    constructor(x, y, rad){
        this.x = x;
        this.y = y;
        this.rad = rad;
    }

    draw(){
        beginShape();
        for(let i = 0; i <= 6; i++){
            let x = this.x + this.rad*Math.cos(i * Math.PI/3);
            let y = this.y + this.rad*Math.sin(i * Math.PI/3);
            vertex(x, y);
        }
        endShape();
    }
}