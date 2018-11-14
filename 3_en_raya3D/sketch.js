let box3 = [];
let boxSize = 80;
let sep = 10;
let selected = [0, 0, 0];
let player = 0;
let explosion = false;
let explosionCounter = 0;
let explosionPoint = [0, 0, 0];

let canvas1 = function(c1){
    c1.setup = function(){
        c1.createCanvas(600, 600, c1.WEBGL);
        for(let x = -boxSize - sep; x <= boxSize + sep; x+=boxSize + sep){
            let cosa = [];
            for(let y = -boxSize - sep; y <= boxSize + sep; y+=boxSize + sep){
                let cosa2 = [];
                for(let z = -boxSize - sep; z <= boxSize + sep; z+=boxSize + sep){
                    cosa2.push(new Box(c1.createVector(x, y, z), boxSize));
                }
                cosa.push(cosa2)
            }
            box3.push(cosa);
        }

        box3[0][0][0].isSelected = true;
        let x = c1.int(c1.random(0, 3));
        let y = c1.int(c1.random(0, 3));
        let z = c1.int(c1.random(0, 3));
        box3[x][y][z].mina = true;

        x = c1.int(c1.random(0, 3));
        y = c1.int(c1.random(0, 3));
        z = c1.int(c1.random(0, 3));

        while(box3[x][y][z].mina === true){
            x = c1.int(c1.random(0, 3));
            y = c1.int(c1.random(0, 3));
            z = c1.int(c1.random(0, 3));
        }
        box3[x][y][z].mina = true;
    };

    c1.draw = function(){
        c1.background(51);
        c1.orbitControl();

        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    if(i === selected[0] && j === selected[1] && k === selected[2]){
                        box3[i][j][k].isSelected = true;
                    }else{
                        box3[i][j][k].isSelected = false;
                    }
                    if(explosion){
                        let dir = box3[i][j][k].pos.copy().sub(c1.createVector(explosionPoint[0],
                                                                                explosionPoint[1],
                                                                                explosionPoint[2]));
                        dir.normalize();
                        dir.mult(10);
                        box3[i][j][k].update(dir);
                        explosionCounter++;
                        if(explosionCounter >= 2000){
                            resetGame(c1);
                        }
                    }
                    box3[i][j][k].draw(c1);
                }
            }
        }
    };

    c1.keyPressed = function(){
        //console.log(keyCode);

        //LEFT
        if(c1.keyCode === 37){
            if(selected[0] > 0){
                selected[0]--;
            }
        }

        //RIGHT
        if(c1.keyCode === 39){
            if(selected[0] < 2){
                selected[0]++;
            }
        }

        //UP
        if(c1.keyCode === 38){
            if(selected[1] > 0){
                selected[1]--;
            }
        }

        //DOWN
        if(c1.keyCode === 40){
            if(selected[1] < 2){
                selected[1]++;
            }
        }

        if(c1.keyCode === 33){
            if(selected[2] > 0){
                selected[2]--;
            }
        }

        if(c1.keyCode === 34){
            if(selected[2] < 2){
                selected[2]++;
            }
        }

        if(c1.keyCode === 13){
            if(box3[selected[0]][selected[1]][selected[2]].mina){
                console.log("PUM");
                explosion = true;
                explosionPoint[0] = boxSize*selected[0]-boxSize;
                explosionPoint[1] = boxSize*selected[1]-boxSize;
                explosionPoint[2] = boxSize*selected[2]-boxSize;
            }else {
                if (box3[selected[0]][selected[1]][selected[2]].mark < 0) {
                    box3[selected[0]][selected[1]][selected[2]].mark = player;
                    player = 1 - player;
                }
            }
        }
    }
};

let myp5 = new p5(canvas1, 'c1');

let canvas2 = function(c2){
    c2.setup = function(){
        c2.createCanvas(600, 50);
        c2.background(255);
    };

    c2.draw = function () {
        c2.background(255);
        c2.textSize(24);
        c2.text("Player: " + (player+1), 24, 35);
    };
};

let mup5 = new p5(canvas2, 'c2');

function resetGame(c1){

    box3 = [];
    for(let x = -boxSize - sep; x <= boxSize + sep; x+=boxSize + sep){
        let cosa = [];
        for(let y = -boxSize - sep; y <= boxSize + sep; y+=boxSize + sep){
            let cosa2 = [];
            for(let z = -boxSize - sep; z <= boxSize + sep; z+=boxSize + sep){
                cosa2.push(new Box(c1.createVector(x, y, z), boxSize));
            }
            cosa.push(cosa2)
        }
        box3.push(cosa);
    }

    box3[0][0][0].isSelected = true;
    selected = [0, 0, 0];

    let x = c1.int(c1.random(0, 3));
    let y = c1.int(c1.random(0, 3));
    let z = c1.int(c1.random(0, 3));
    box3[x][y][z].mina = true;

    x = c1.int(c1.random(0, 3));
    y = c1.int(c1.random(0, 3));
    z = c1.int(c1.random(0, 3));

    while(box3[x][y][z].mina === true){
        x = c1.int(c1.random(0, 3));
        y = c1.int(c1.random(0, 3));
        z = c1.int(c1.random(0, 3));
    }
    box3[x][y][z].mina = true;
    player = 0;
    explosion = false;
    explosionCounter = 0;
}