class CharPoint{
    /**
     * constructor(points, char): constructor of class CharPoints
     * -----------------------------------------------------------
     *
     * @param points: points that compose the letter
     * @param char: stored letter
     * @param charType: says if the letter can be fill
     */
    constructor(points, char, charType){
        this.points = points;
        this.char = char;
        this.charType = charType;
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
        push();
        beginShape();
        if(this.charType === 0 || step <= this.points.length){
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
                if(this.char !== 'i' && this.char !== 'j' && this.charType === 1 && step > this.points.length){
                    fill(51);
                }
                beginShape();
            }
            vertex(this.points[i].x, this.points[i].y);
        }
        endShape();

        /*if(step <= this.points.length) {
            ellipse(this.points[max(0, step - 1)].x, this.points[max(0, step - 1)].y, 8, 8);
        }*/
        pop();
    }
}