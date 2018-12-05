let rowsNum = 10;
let colsNum = 16;

let cachos = [];
let allUpdated = true;

let state = 0;

function setup() {
    let cvn = createCanvas(1200, 700, WEBGL);
    cvn.position((windowWidth-width)/2, (windowHeight-height)/2);
    background(51);

    let cachoWidth = width/(colsNum);
    let cachoHeight = height/(rowsNum);
    for(let i = 0; i < colsNum; i++){
        let row = [];
        for(let j = 0; j < rowsNum; j++){
            let index = j + rowsNum*i;
            row.push(new Cacho(createVector(i*cachoWidth + cachoWidth/2,
                                j*cachoHeight + cachoHeight/2,
                                0),
                                cachoWidth,
                                cachoHeight));
        }
        cachos.push(row);
    }
}

function draw() {
    background(0);
    translate(-width/2, -height/2);

    for(let i = 0; i < colsNum; i++){
        for(let j = 0; j < rowsNum; j++){
            cachos[i][j].draw();
        }
    }

    if(state === 0) {
        if (allUpdated) {
            for (let i = 0; i < colsNum; i++) {
                for (let j = 0; j < rowsNum; j++) {
                    let sum = 0;

                    for (let k = i - 1; k <= i + 1; k++) {
                        for (let p = j - 1; p <= j + 1; p++) {
                            if (k !== i || p !== j) {
                                let col = k;
                                let row = p;
                                if (col < 0) {
                                    col = colsNum - 1;
                                }
                                if (row < 0) {
                                    row = rowsNum - 1;
                                }
                                col = col % colsNum;
                                row = row % rowsNum;
                                sum += cachos[col][row].state;
                            }
                        }
                    }
                    cachos[i][j].update(sum);
                    allUpdated = allUpdated && cachos[i][j].isUpdated;
                }
            }
        }

        for (let i = 0; i < colsNum; i++) {
            for (let j = 0; j < rowsNum; j++) {
                cachos[i][j].change();
            }
        }

        allUpdated = true;
        for (let i = 0; i < colsNum; i++) {
            for (let j = 0; j < rowsNum; j++) {
                allUpdated = allUpdated && cachos[i][j].isUpdated;
            }
        }
    }
}

function keyPressed(){
    console.log(keyCode);
    if(keyCode === 80)/*P*/{
        state = 1;
    }

    if(keyCode === 83)/*S*/{
        state = 0;
    }

    if(keyCode === 67 && state === 1)/*C*/{
        for (let i = 0; i < colsNum; i++) {
            for (let j = 0; j < rowsNum; j++) {
                cachos[i][j].setState(0);
            }
        }
    }
}

function mousePressed(){
    //console.log("mouse");
    if (mouseButton === LEFT) {
        //console.log("L")
        if(state === 1){
            let cachoWidth = width/(colsNum);
            let cachoHeight = height/(rowsNum);
            let i = floor(mouseX/cachoWidth);
            let j = floor(mouseY/cachoHeight);
            if(i >= 0 && i < colsNum && j >= 0 && j < rowsNum){
                cachos[i][j].setState(1 - cachos[i][j].state);
            }
        }
    }
}