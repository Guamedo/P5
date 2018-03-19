class Enemy{
    constructor(pos, col, index, dirP){
        this.initialPos = createVector(pos.x, pos.y);
        this.pos = pos;
        this.dir = createVector(0, 0);
        this.step = 2;
        this.size = 15;
        this.col = col;
        this.index = index;
        this.directionPriority = dirP;
        switch(index){
            case 0:
                this.init = 4;
                break;
            case 1:
                this.init = 3;
                break;
            case 2:
                this.init = 3;
                break;
            case 3:
                this.init = 4;
                break;
        }
    }

    draw(){
        push();
        fill(this.col[0], this.col[1], this.col[2]);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        pop();
    }

    update(map, player){
        if(this.pos.x % map.blockSize === map.blockSize/2 && this.pos.y % map.blockSize === map.blockSize/2) {
            let rand = random(0, 1);
            let cosa = false;
            while(!cosa) {
                rand = random(0, 1);
                if (rand < 0.25) {
                    //DOWN
                    let p = createVector(Math.floor(this.pos.x / map.blockSize), Math.floor(this.pos.y / map.blockSize) + 1);
                    if (map.mapData[p.y][p.x] !== '#') {
                        this.dir = createVector(0, 1);
                        cosa = true;
                    }

                } else if (rand < 0.5) {
                    //RIGHT
                    let p = createVector(Math.floor(this.pos.x / map.blockSize) + 1, Math.floor(this.pos.y / map.blockSize));
                    if (map.mapData[p.y][p.x] !== '#') {
                        this.dir = createVector(1, 0);
                        cosa = true;
                    }

                } else if (rand < 0.75) {
                    //UP
                    let p = createVector(Math.floor(this.pos.x / map.blockSize), Math.floor(this.pos.y / map.blockSize) - 1);
                    if (map.mapData[p.y][p.x] !== '#') {
                        this.dir = createVector(0, -1);
                        cosa = true;
                    }
                } else {
                    //LEFT
                    let p = createVector(Math.floor(this.pos.x / map.blockSize) - 1, Math.floor(this.pos.y / map.blockSize));
                    if (map.mapData[p.y][p.x] !== '#') {
                        this.dir = createVector(-1, 0);
                        cosa = true;
                    }
                }
            }
        }
        this.pos.add(createVector(this.step*this.dir.x, this.step*this.dir.y));
        if(this.pos.x < 0){
            this.pos.x = width;
        }
        if(this.pos.x > width){
            this.pos.x = 0;
        }
        if(dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) <= player.size/2 + this.size/2){
            if(player.inmortal){
                this.pos = this.initialPos;
                this.isDead = true;
            }else{
                player.die();
            }
        }
    }

    update2(map, player){
        if(this.pos.x % map.blockSize === map.blockSize/2 && this.pos.y % map.blockSize === map.blockSize/2) {
            if(this.init <= 0) {
                let directions = [];

                //DOWN
                let p = createVector(Math.floor(this.pos.x / map.blockSize), Math.floor(this.pos.y / map.blockSize) + 1);
                if (map.mapData[p.y][p.x] !== '#' && map.mapData[p.y][p.x] !== '-') {
                    directions.push(0);
                }

                //RIGHT
                p = createVector(Math.floor(this.pos.x / map.blockSize) + 1, Math.floor(this.pos.y / map.blockSize));
                if (map.mapData[p.y][p.x] !== '#') {
                    directions.push(1);
                }

                //UP
                p = createVector(Math.floor(this.pos.x / map.blockSize), Math.floor(this.pos.y / map.blockSize) - 1);
                if (map.mapData[p.y][p.x] !== '#') {
                    directions.push(2);
                }

                //LEFT
                p = createVector(Math.floor(this.pos.x / map.blockSize) - 1, Math.floor(this.pos.y / map.blockSize));
                if (map.mapData[p.y][p.x] !== '#') {
                    directions.push(3);
                }
                let rand = round(random(directions.length - 1));
                switch (directions[rand]) {
                    case 0:
                        this.dir = createVector(0, 1);
                        break;
                    case 1:
                        this.dir = createVector(1, 0);
                        break;
                    case 2:
                        this.dir = createVector(0, -1);
                        break;
                    case 3:
                        this.dir = createVector(-1, 0);
                        break;
                    default:
                        break;
                }
            }else{
                switch(this.index){
                    case 0:
                        if(this.init === 3){
                            this.dir = createVector(1, 0);
                        }else{
                            this.dir = createVector(0, -1);
                        }
                        break;
                    case 1:
                        this.dir = createVector(0, -1);
                        break;
                    case 2:
                        this.dir = createVector(0, -1);
                        break;
                    case 3:
                        if(this.init === 3){
                            this.dir = createVector(-1, 0);
                        }else{
                            this.dir = createVector(0, -1);
                        }
                        break;
                }
                this.init--;
            }
        }
        if(dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) <= player.size/2 + this.size/2){
            if(player.inmortal){
                switch(this.index){
                    case 0:
                        this.init = 4;
                        break;
                    case 1:
                        this.init = 3;
                        break;
                    case 2:
                        this.init = 3;
                        break;
                    case 3:
                        this.init = 4;
                        break;
                }
                bimba.play();
                this.pos = createVector(this.initialPos.x, this.initialPos.y);
            }else{
                if(!player.isDead){
                    player.die();
                }
            }
        }
        this.pos.add(createVector(this.step * this.dir.x, this.step * this.dir.y));
        if(this.pos.x < 0){
            this.pos.x = width - (this.step-1);
        }
        if(this.pos.x > width){
            this.pos.x = (this.step-1);
        }
    }
}