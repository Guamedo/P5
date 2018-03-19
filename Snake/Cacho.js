class Cacho{
    constructor(pos, dir, step){
        this.pos = pos;
        this.dir = dir;
        this.step = step;
        this.nextCacho = null;
    }

    addCacho(){
        if(this.nextCacho == null){
            let posX = this.pos.x - this.dir.x*30;
            let posY = this.pos.y - this.dir.y*30;
            this.nextCacho = new Cacho(createVector(posX, posY), this.dir, this.step);
        }else{
            this.nextCacho.addCacho();
        }
    }

    draw(){
        fill(50, 200, 50);
        if(this.dir.x !== 0){
            rect(this.pos.x, this.pos.y+2, 30, 30-4);
        }else{
            rect(this.pos.x+2, this.pos.y, 30-4, 30);
        }
        if(this.nextCacho != null){
            this.nextCacho.draw();
        }
    }

    draw2(){
        curveVertex(this.pos.x + 15, this.pos.y +15);
        if(this.nextCacho != null){
            this.nextCacho.draw2();
        }else{
            curveVertex(this.pos.x + 15, this.pos.y +15);
        }
    }

    update(){
        this.pos.add(createVector(this.dir.x * this.step, this.dir.y * this.step));
        if(this.nextCacho != null){
            this.nextCacho.update();
        }
    }

    updateDir(dir){
        this.dir = dir;
        if(this.nextCacho != null){
            let dirX = (this.pos.x - this.nextCacho.pos.x)/30;
            let dirY = (this.pos.y - this.nextCacho.pos.y)/30;
            this.nextCacho.updateDir(createVector(dirX, dirY));
        }
    }

    checkCollision(snake){
        let snakeCenterX = snake.pos.x + 15;
        let snakeCenterY = snake.pos.y + 15;
        let cachoCenterX = this.pos.x + 15;
        let cachoCenterY = this.pos.y + 15;
        if(dist(snakeCenterX, snakeCenterY, cachoCenterX, cachoCenterY) < 15){
            snake.kill();
        }else if(this.nextCacho != null){
            this.nextCacho.checkCollision(snake);
        }
    }

}