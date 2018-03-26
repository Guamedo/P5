class Map{
    constructor(){
        this.cols = 17;
        this.rows = 15;
        this.blockSize = 30;
        //4 7
        let p1 = round(random(0, 16));
        while(p1 === 4){
            p1 = round(random(0, 16));
        }

        let p2 = round(random(0, 14));
        while(p2 === 7){
            p2 = round(random(0, 14));
        }

        this.foodPos = createVector(p1, p2);
        this.foodTimer = 0;
        this.needFood = false;
    }

    draw(){
        noStroke();
        /*for(let y = 0; y < this.rows; y++){
            for(let x = 0; x < this.cols; x++){
                if((x+this.rows*y)%2 === 0){
                    fill(100);
                }else{
                    fill(50);
                }
                rect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
            }
        }*/
        //if(this.foodTimer === 0){
            fill(200, 50, 50);
            ellipse(this.foodPos.x*this.blockSize + this.blockSize/2,
                    this.foodPos.y*this.blockSize + this.blockSize/2,
                    this.blockSize*2/3, this.blockSize*2/3);
        //}
    }

    update(snake){
        if(this.needFood){
            this.foodTimer = Math.max(0, this.foodTimer - (1/frameRate()));
            //if(this.foodTimer === 0){
                let foundPos = false;
                while(!foundPos) {
                    this.foodPos = createVector(round(random(0, this.cols-1)), round(random(0, this.rows-1)));
                    let snakeCenterX = snake.pos.x + this.blockSize / 2;
                    let snakeCenterY = snake.pos.y + this.blockSize / 2;
                    let foodCenterX = this.foodPos.x * this.blockSize + this.blockSize / 2;
                    let foodCenterY = this.foodPos.y * this.blockSize + this.blockSize / 2;
                    if (dist(snakeCenterX, snakeCenterY, foodCenterX, foodCenterY) > this.blockSize) {
                        let cacho = snake.tail;
                        let coll = false;
                        while(cacho != null && !coll){
                            let cachoCenterX = cacho.pos.x + this.blockSize / 2;
                            let cachoCenterY = cacho.pos.y + this.blockSize / 2;
                            if (dist(cachoCenterX, cachoCenterY, foodCenterX, foodCenterY) > this.blockSize) {
                                cacho = cacho.nextCacho;
                            }else{
                                coll = true;
                            }
                        }
                        if(!coll){
                            foundPos = true;
                        }
                    }
                }
                this.needFood = false;
            //}
        }else{
            let snakeCenterX = snake.pos.x + this.blockSize/2;
            let snakeCenterY = snake.pos.y + this.blockSize/2;
            let foodCenterX = this.foodPos.x*this.blockSize + this.blockSize/2;
            let foodCenterY = this.foodPos.y*this.blockSize + this.blockSize/2;
            if(dist(snakeCenterX, snakeCenterY, foodCenterX, foodCenterY) <= this.blockSize/2){
                if(!mute) {
                    namnam.play();
                }
                snake.setFoodTimerToZero();
                snake.setAddNewCacho();
                this.needFood = true;
                this.foodTimer = 3;
            }
        }
    }

}