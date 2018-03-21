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
let state = 0;

function setup() {
    createCanvas(600, 600);
    sudokuData = split(sudokuDataText, '/');
    sudoku = new Sudoku(sudokuData);
    background(255);
    sudoku.draw();
}

function draw() {

}

function keyPressed(){
    if(state === 0) {
        if (selectedCell !== null && selectedCell !== undefined) {
            if ((parseInt(keyCode) - 48) >= 1 && (parseInt(keyCode) - 48) <= 9) {
                if (!sudoku.cells[selectedCell.x][selectedCell.y].isInitialVal) {
                    sudoku.cells[selectedCell.x][selectedCell.y].setValue((parseInt(keyCode) - 48).toString());
                }
                if(sudoku.update()){
                    state = 1;
                }
                background(255);
                sudoku.draw();
            }
            if (keyCode === 67) {
                if (!sudoku.cells[selectedCell.x][selectedCell.y].isInitialVal) {
                    sudoku.cells[selectedCell.x][selectedCell.y].setValue('-');
                }
                if(sudoku.update()){
                    state = 1;
                }
                background(255);
                sudoku.draw();
            }
        }
    }
}

function mousePressed() {
    if(state === 0) {
        if (mouseButton === LEFT) {
            let x = Math.floor(mouseX / (600 / 9));
            let y = Math.floor(mouseY / (600 / 9));
            if (x >= 0 && x <= 8 && y >= 0 && y <= 8) {
                sudoku.cells.forEach(r => r.forEach(c => c.unSelect()));
                sudoku.cells[x][y].select();
                selectedCell = createVector(x, y);
            }
            background(255);
            sudoku.draw();
        }
    }
}