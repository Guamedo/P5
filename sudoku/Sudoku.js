class Sudoku{

    constructor(data){
        this.initialData = data;
        this.data = data;
        this.cells = [];
        for(let i = 0; i < 9; i++){
            let row = [];
            for(let j = 0; j < 9; j++){
                if(data[j][i] === '-') {
                    row.push(new Cell(createVector(i * 600 / 9, j * 600 / 9), data[j][i], i, j, floor(i / 3) + 3 * floor(j / 3), false));
                }else{
                    row.push(new Cell(createVector(i * 600 / 9, j * 600 / 9), data[j][i], i, j, floor(i / 3) + 3 * floor(j / 3), true));
                }
            }
            this.cells.push(row);
        }
    }

    draw(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                noFill();
                stroke(0);
                strokeWeight(4);
                rect(i*600/3, j*600/3, 600/3, 600/3);
            }
        }
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                noFill();
                stroke(0);
                strokeWeight(4);
                this.cells[i][j].draw();
            }
        }
    }

     update(){
        let isComplete = true;
        for(let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if(!this.cells[j][i].isInitialVal && this.cells[j][i].val !== '-') {
                    this.cells[j][i].isCorrect = true;
                    for (let k = 0; k < 9; k++) {
                        if (k !== j && this.cells[j][i].val === this.cells[k][i].val) {
                            this.cells[j][i].isCorrect = false;
                        }
                    }
                    for (let k = 0; k < 9; k++) {
                        if (k !== i && this.cells[j][i].val === this.cells[j][k].val) {
                            this.cells[j][i].isCorrect = false;
                        }
                    }
                    let gX = 3*Math.floor(i / 3);
                    let gY = 3*Math.floor(j / 3);
                    for(let k = gX; k < gX + 3; k++){
                        for(let p = gY; p < gY + 3; p++){
                            if(k !== i || p !== j){
                                if(this.cells[p][k].val === this.cells[j][i].val){
                                    this.cells[j][i].isCorrect = false;
                                }
                            }
                        }
                    }
                }
                if(this.cells[j][i].val === '-' || !this.cells[j][i].isCorrect){
                    isComplete = false;
                }
            }
        }
        return isComplete;
    }
}