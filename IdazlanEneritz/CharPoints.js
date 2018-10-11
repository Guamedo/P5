class CharPoint{
    /**
     * constructor(points, char): constructor of class CharPoints
     * -----------------------------------------------------------
     *
     * @param points: points that compose the letter
     * @param char: stored letter
     */
    constructor(points, char){
        this.points = points;
        this.char = char;
    }

    /**
     * Function: draw(index, offset, step, canvas)
     * --------------------------------------------
     *
     * @param index: index of the letter in the text
     * @param offset: offset to apply to the color of the
     * @param step: number of points of the letter to be drawn
     * @param canvas: canvas in which the letter has to be drawn
     */
    draw(index, offset, step, canvas){
        canvas.push();
        beginShape();
        if(true/*step <= this.points.length*/){
            noFill();
            let col = canvas.lerpColor(rainbow[(Math.abs(index+Math.floor(offset)))%rainbow.length], rainbow[(Math.abs(index+Math.ceil(offset)))%rainbow.length], offset - Math.floor(offset));
            stroke(col);
        }else{
            canvas.noStroke();
            let col = canvas.lerpColor(rainbow[(Math.abs(index+Math.floor(offset)))%rainbow.length], rainbow[(Math.abs(index+Math.ceil(offset)))%rainbow.length], offset - Math.floor(offset));
            fill(col);
        }
        for (let i = 0; i < min(step, this.points.length); i++) {
            if (i > 0 && dist(this.points[i].x, this.points[i].y, this.points[i - 1].x, this.points[i - 1].y) >= 2) {
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