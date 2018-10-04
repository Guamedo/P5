let mapText = "############################/" +
              "#oooooooooooo##oooooooooooo#/" +
              "#o####o#####o##o#####o####o#/" +
              "#O#  #o#   #o##o#   #o#  #O#/" +
              "#o####o#####o##o#####o####o#/" +
              "#oooooooooooooooooooooooooo#/" +
              "#o####o##o########o##o####o#/" +
              "#o####o##o########o##o####o#/" +
              "#oooooo##oooo##oooo##oooooo#/" +
              "######o##### ## #####o######/" +
              "     #o##### ## #####o#     /" +
              "     #o##          ##o#     /" +
              "     #o## ###--### ##o#     /" +
              "######o## #      # ##o######/" +
              "      o   # E    #   o      /" +
              "######o## #      # ##o######/" +
              "     #o## ######## ##o#     /" +
              "     #o##          ##o#     /" +
              "     #o## ######## ##o#     /" +
              "######o## ######## ##o######/" +
              "#oooooooooooo##oooooooooooo#/" +
              "#o####o#####o##o#####o####o#/" +
              "#o####o#####o##o#####o####o#/" +
              "#Ooo##ooooooooPooooooo##ooO#/" +
              "###o##o##o########o##o##o###/" +
              "###o##o##o########o##o##o###/" +
              "#oooooo##oooo##oooo##oooooo#/" +
              "#o##########o##o##########o#/" +
              "#o##########o##o##########o#/" +
              "#oooooooooooooooooooooooooo#/" +
              "############################";

let map;
let player;
let enemies = [];
let state = 0;
let mapData;
let wakaWaka;
let looper1;
let bimba;
let waaaa;

function preload(){
    //mapData = loadStrings("pacman_map.txt");
    wakaWaka = loadSound('wakawaka.mp3');
    bimba = loadSound('bimba.mp3');
    waaaa = loadSound('waaaa.mp3');
    mapData = split(mapText, '/');
    map = new Map(mapData);
}

function setup(){
    createCanvas(504, 620);
    background(51);
    looper1 = new p5.SoundLoop(function(){
        wakaWaka.play();
    }, 0.3);
    looper1.start();
    map.load();
    player = new Player(map.playerInitialPos);
    initEnemies();
}

function draw(){
    background(51);

    switch (state){
        case 0:
            manageInput();

            map.draw();

            player.update(map);
            enemies.forEach(e => e.update2(map, player));


            player.draw();
            enemies.forEach(e => e.draw());

            if(player.isDead){
                player.open = 0;
                looper1.stop();
                waaaa.play();
                state = 1;
            }

            if(map.foodPos.length <= 0){
                state = 2;
            }
            break;
        case 1:
            if(player.life === 0) {
                if(player.open >= PI){
                    map.draw();
                    fill(255);
                    stroke(0);
                    strokeWeight(5);
                    textSize(50);
                    text("GAME OVER", 120, height/2);
                    textSize(20);
                    text("PRESS ENTER TO RESTART", 130, height/2+50);
                    if (keyIsPressed) {
                        if (keyCode === 13) {
                            map = new Map(mapData);
                            map.load();
                            player = new Player(map.playerInitialPos);
                            initEnemies();
                            looper1.start();
                            state = 0;
                        }
                    }
                }else{
                    map.draw();
                    player.draw();
                    player.open += 0.08;
                }

            }else{
                if(player.open >= PI){
                    player.facePos = 0;
                    player.pos = createVector(player.initialPos.x, player.initialPos.y);
                    player.dir = createVector(0, 0);
                    enemies.forEach(e => e.pos = createVector(e.initialPos.x, e.initialPos.y));
                    enemies.forEach(function(e){
                        switch (e.index){
                            case 0:
                                e.init = 4;
                                break;
                            case 1:
                                e.init = 3;
                                break;
                            case 2:
                                e.init = 3;
                                break;
                            case 3:
                                e.init = 4;
                                break;
                        }
                    });
                    player.isDead = false;
                    looper1.start();
                    state = 0;
                }else{
                    map.draw();
                    player.draw();
                    player.open += 0.08;
                }
            }
            break;
        case 2:
            map.draw();
            fill(255);
            stroke(0);
            strokeWeight(5);
            textSize(50);
            text("YOU WIN", 140, height/2);
            textSize(20);
            text("PRESS ENTER TO RESTART", 120, height/2+50);
            if (keyIsPressed) {
                if (keyCode === 13) {
                    map = new Map(mapData);
                    map.load();
                    player = new Player(map.playerInitialPos);
                    initEnemies();
                    looper1.start();
                    state = 0;
                }
            }
            break;
        default:
            break;
    }

    // Draw score
    fill(0);
    rect(0, 558, width, height-558);
    fill(255);
    textSize(30);
    text("Score: " + player.score, 10, 600);

    // Draw player life
    fill(255, 255, 51);
    noStroke();
    let offset = 0;
    for(let i = 0; i < player.life; i++){
        arc(420+offset, 590, 20, 20, PI/6 , 2*PI - PI/6);
        offset += 25;
    }

}

function manageInput(){
    if(player.pos.x % map.blockSize === map.blockSize/2 && player.pos.y % map.blockSize === map.blockSize/2) {
        //player.dir = createVector(0, 0);
        //DOWN
        if (keyCode === 40){
            let p = createVector(Math.floor(player.pos.x/map.blockSize),floor(player.pos.y/map.blockSize)+1);
            //console.log("P1:" + p.x + "," + p.y);
            if(map.mapData[p.y][p.x] !== '#' && map.mapData[p.y][p.x] !== '-') {
                player.facePos = 1;
                player.dir = createVector(0, 1);
            }
        }

        //RIGHT
        if (keyCode === 39) {
            let p = createVector(Math.floor(player.pos.x/map.blockSize)+1,floor(player.pos.y/map.blockSize));
            //console.log("P1:" + p.x + "," + p.y);
            if(map.mapData[p.y][p.x] !== '#' && map.mapData[p.y][p.x] !== '-') {
                player.facePos = 0;
                player.dir = createVector(1, 0);
            }
        }

        //UP
        if (keyCode === 38) {
            let p = createVector(Math.floor(player.pos.x/map.blockSize),floor(player.pos.y/map.blockSize)-1);
            //console.log("P1:" + p.x + "," + p.y);
            if(map.mapData[p.y][p.x] !== '#' && map.mapData[p.y][p.x] !== '-') {
                player.facePos = 3;
                player.dir = createVector(0, -1);
            }
        }

        //LEFT
        if (keyCode === 37) {
            let p = createVector(Math.floor(player.pos.x/map.blockSize)-1,floor(player.pos.y/map.blockSize));
            //console.log("P1:" + p.x + "," + p.y);
            if(map.mapData[p.y][p.x] !== '#' && map.mapData[p.y][p.x] !== '-') {
                player.facePos = 2;
                player.dir = createVector(-1, 0);
            }
        }
    }
    //keyCode = 0;
}

function initEnemies(){
    enemies = [];
    for(let i = 0; i < map.enemyNumber; i++){
        let col = [0, 0, 0];
        let dirP = [0, 0, 0, 0];
        switch (i){
            case 0:
                col = [200, 50, 50];
                dirP = [10, 2, 2, 2];
                break;
            case 1:
                col = [50, 200, 50];
                dirP = [3, 8, 2, 3];
                break;
            case 2:
                col = [50, 50, 200];
                dirP = [2, 2, 2, 10];
                break;
            case 3:
                col = [200, 50, 200];
                dirP = [3, 2, 8, 3];
                break;
        }
        enemies.push(new Enemy(map.enemisInitialPos[i], col, i, dirP, map));
    }
}