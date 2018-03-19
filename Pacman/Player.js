class Player{
    constructor(pos){
        this.initialPos = createVector(pos.x, pos.y);
        this.pos = pos;
        this.dir = createVector(0, 0);
        this.step = 2;
        this.size = 15;
        this.score = 0;
        this.facePos = 0;
        this.open = PI/4;
        this.inmortal = 0;
        this.isDead = false;
        this.life = 3;
    }

    draw(){
        push();
        if(this.inmortal > 0){
            fill(255);
        }else {
            fill(255, 255, 51);
        }
        noStroke();
        arc(this.pos.x, this.pos.y, this.size, this.size, this.open + this.facePos*(PI/2), 2*PI - this.open + this.facePos*(PI/2));
        //ellipse(this.pos.x, this.pos.y, this.size, this.size);
        pop();
    }

    update(map){
        if(this.inmortal > 0){
            this.inmortal -= 0.017;
        }else{
            this.inmortal = 0;
        }
        this.open = Math.abs(Math.sin(frameCount*0.2))*PI/4;
        if(this.pos.x % map.blockSize === map.blockSize/2 && this.pos.y % map.blockSize === map.blockSize/2) {
            //DOWN
            if(this.dir.x === 0 && this.dir.y === 1){
                let p = createVector(Math.floor(this.pos.x/map.blockSize),floor(this.pos.y/map.blockSize)+1);
                if(map.mapData[p.y][p.x] === '#') {
                    this.dir = createVector(0,0);
                }
            }
            //RIGHT
            if(this.dir.x === 1 && this.dir.y === 0){
                let p = createVector(Math.floor(this.pos.x/map.blockSize)+1,floor(this.pos.y/map.blockSize));
                if(map.mapData[p.y][p.x] === '#') {
                    this.dir = createVector(0,0);
                }
            }
            //UP
            if(this.dir.x === 0 && this.dir.y === -1){
                let p = createVector(Math.floor(this.pos.x/map.blockSize),floor(this.pos.y/map.blockSize)-1);
                if(map.mapData[p.y][p.x] === '#') {
                    this.dir = createVector(0,0);
                }
            }
            //LEFT
            if(this.dir.x === -1 && this.dir.y === 0){
                let p = createVector(Math.floor(this.pos.x/map.blockSize)-1,floor(this.pos.y/map.blockSize));
                if(map.mapData[p.y][p.x] === '#') {
                    this.dir = createVector(0,0);
                }
            }
        }
        for(let i = 0; i < map.foodPos.length; i++){
            if(map.foodPos[i].x === this.pos.x && map.foodPos[i].y === this.pos.y){
                this.score++;
                map.removeFoodAt(i);
            }
        }
        for(let i = 0; i < map.bigFoodPos.length; i++){
            if(map.bigFoodPos[i].x === this.pos.x && map.bigFoodPos[i].y === this.pos.y){
                this.inmortal = 10;
                map.removeBigFoodAt(i);
            }
        }
        this.pos.add(createVector(this.step*this.dir.x, this.step*this.dir.y));
        if(this.pos.x < 0){
            this.pos.x = width - (this.step-1);
        }
        if(this.pos.x > width){
            this.pos.x = (this.step-1);
        }
    }

    die(){
        this.life--;
        this.isDead = true;
    }
}