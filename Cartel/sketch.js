let rowsNum = 9;
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
    for(let i = 0; i < colsNum; i++){
        for(let j = 0; j < rowsNum; j++){
            cachos[i][j].update();
        }
    }

}