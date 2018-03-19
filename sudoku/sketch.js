let sudokuDataText = "9-8-56--4/" +
                     "---8----2/" +
                     "7-39----5/" +
                     "--2--83--/" +
                     "8--7----9/" +
                     "54--61---/" +
                     "15--8--4-/" +
                     "------1-8/" +
                     "------573/";

let sudokuData;
let sudoku;
let selectedCell;

function setup() {
    createCanvas(600, 600);
    sudokuData = split(sudokuDataText, '/');
    sudoku = new Sudoku(sudokuData);
}

function draw() {
    background(255);

    sudoku.draw();
}

function keyPressed(){
    if((parseInt(keyCode) - 48) >= 1 && (parseInt(keyCode) - 48) <= 9){
        if(!sudoku.cells[selectedCell.x][selectedCell.y].isInitialVal) {
            sudoku.cells[selectedCell.x][selectedCell.y].setValue((parseInt(keyCode) - 48).toString());
        }
        sudoku.update();
    }
    if(keyCode === 67){
        if(!sudoku.cells[selectedCell.x][selectedCell.y].isInitialVal) {
            sudoku.cells[selectedCell.x][selectedCell.y].setValue('-');
        }
        sudoku.update();
    }
    console.log(keyCode);
}

function mousePressed() {
    if (mouseButton === LEFT) {
        let x = floor(mouseX/(600/9));
        let y = floor(mouseY/(600/9));
        if(x >= 0 && x <= 8 && y >= 0 && y <= 8){
            sudoku.cells.forEach(r => r.forEach(c => c.unSelect()));
            sudoku.cells[x][y].select();
            selectedCell = createVector(x, y);
            let gX = Math.floor(x/3);
            let gY = Math.floor(y/3);
            console.log(gX, gY);
        }
    }
}