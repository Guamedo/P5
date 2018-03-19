class Cell{
    constructor(pos, val, col, row, group, isInitialVal){
        this.isInitialVal = isInitialVal;
        this.pos = pos;
        this.val = val;
        this.col = col;
        this.row = row;
        this.group = group;
        this.isSelected = false;
        this.isCorrect = true;
    }

    draw(){
        if(this.isSelected){
            fill(25, 50)
        }else {
            noFill();
        }
        stroke(0);
        strokeWeight(2);
        rect(this.pos.x, this.pos.y, 600/9, 600/9);

        textSize(30);
        if(this.isCorrect) {
            fill(0);
        }else{
            fill(255, 50, 50);
        }
        strokeWeight(2);
        if(this.val !== '-') {
            if(!this.isInitialVal){
                noStroke();
            }
            text(this.val, this.pos.x + 25, this.pos.y + 43);
        }
    }

    unSelect(){
        this.isSelected = false;
    }
    select(){
        this.isSelected = true;
    }

    setValue(val){
        this.val = val;
    }
}