class CharPoint{
    constructor(points, char){
        this.points = points;
        this.char = char;
    }

    draw(index, offset, step, cosa){
        push();
        beginShape();
        //this.points.forEach(p => vertex(p.x, p.y));
        if(step <= this.points.length){
            noFill();
            let col = cosa.lerpColor(rainbow[(abs(index+Math.floor(offset)))%rainbow.length], rainbow[(abs(index+Math.ceil(offset)))%rainbow.length], offset - Math.floor(offset));
            stroke(col);
        }else{
            noStroke();
            let col = cosa.lerpColor(rainbow[(abs(index+Math.floor(offset)))%rainbow.length], rainbow[(abs(index+Math.ceil(offset)))%rainbow.length], offset - Math.floor(offset));
            fill(col);
        }
        for (let i = 0; i < min(step, this.points.length); i++) {
            if (i > 0 && dist(this.points[i].x, this.points[i].y, this.points[i - 1].x, this.points[i - 1].y) >= 10) {
                endShape();
                if(this.char !== 'i'){
                    fill(51);
                }
                beginShape();
            }
            vertex(this.points[i].x, this.points[i].y);
        }
        endShape();
        pop();
    }
}