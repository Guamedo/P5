let rowsNum = 10;
let colsNum = 16;

let cachos = [];

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
            row[j].rax = index%2;
        }
        cachos.push(row);
    }
}

function draw() {
    background(255);
    translate(-width/2, -height/2);

    for(let i = 0; i < colsNum; i++){
        for(let j = 0; j < rowsNum; j++){
            cachos[i][j].draw();
        }
    }

    if(frameCount%10 === 0) {
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
            }
        }
        for (let i = 0; i < colsNum; i++) {
            for (let j = 0; j < rowsNum; j++) {
                cachos[i][j].change();
            }
        }
    }

}