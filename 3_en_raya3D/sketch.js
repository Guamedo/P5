let box3 = [];
let boxSize = 80;
let sep = 10;
let selected = [0, 0, 0];
let player = 0;

function setup() {
    createCanvas(600, 600, WEBGL);
    for(let x = -boxSize - sep; x <= boxSize + sep; x+=boxSize + sep){
        let cosa = [];
        for(let y = -boxSize - sep; y <= boxSize + sep; y+=boxSize + sep){
            let cosa2 = [];
            for(let z = -boxSize - sep; z <= boxSize + sep; z+=boxSize + sep){
                cosa2.push(new Box(x, y, z, boxSize));
            }
            cosa.push(cosa2)
        }
        box3.push(cosa);
    }

    box3[0][0][0].isSelected = true;
    let x = int(random(0, 3));
    let y = int(random(0, 3));
    let z = int(random(0, 3));
    box3[x][y][z].mina = true;

    x = int(random(0, 3));
    y = int(random(0, 3));
    z = int(random(0, 3));

    while(box3[x][y][z].mina === true){
        x = int(random(0, 3));
        y = int(random(0, 3));
        z = int(random(0, 3));
    }
    box3[x][y][z].mina = true;
}

function draw() {

    background(51);
    orbitControl();

    for(let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if(i === selected[0] && j === selected[1] && k === selected[2]){
                    box3[i][j][k].isSelected = true;
                }else{
                    box3[i][j][k].isSelected = false;
                }
                box3[i][j][k].draw();
            }
        }
    }
}

function resetGame(){
    selected = [0, 0, 0];
    for(let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                box3[i][j][k].mark = -1;
                box3[i][j][k].mina = false;
            }
        }
    }

    box3[0][0][0].isSelected = true;
    let x = int(random(0, 3));
    let y = int(random(0, 3));
    let z = int(random(0, 3));
    box3[x][y][z].mina = true;

    x = int(random(0, 3));
    y = int(random(0, 3));
    z = int(random(0, 3));

    while(box3[x][y][z].mina === true){
        x = int(random(0, 3));
        y = int(random(0, 3));
        z = int(random(0, 3));
    }
    box3[x][y][z].mina = true;
}

function keyPressed(){
    //console.log(keyCode);

    //LEFT
    if(keyCode === 37){
        if(selected[0] > 0){
            selected[0]--;
        }
    }

    //RIGHT
    if(keyCode === 39){
        if(selected[0] < 2){
            selected[0]++;
        }
    }

    //UP
    if(keyCode === 38){
        if(selected[1] > 0){
            selected[1]--;
        }
    }

    //DOWN
    if(keyCode === 40){
        if(selected[1] < 2){
            selected[1]++;
        }
    }

    if(keyCode === 33){
        if(selected[2] > 0){
            selected[2]--;
        }
    }

    if(keyCode === 34){
        if(selected[2] < 2){
            selected[2]++;
        }
    }

    if(keyCode === 13){
        if(box3[selected[0]][selected[1]][selected[2]].mina){
            console.log("PUM");
            resetGame();
        }else {
            if (box3[selected[0]][selected[1]][selected[2]].mark < 0) {
                box3[selected[0]][selected[1]][selected[2]].mark = player;
                player = 1 - player;
            }
        }
    }
}