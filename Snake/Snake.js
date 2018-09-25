class Snake{
    constructor(brain = new NeuronalNetwork(13, 8, 4, -20, 20)){

        this.pos = createVector(8*30, 7*30); // Snake position
        this.step = 3; // Snake speed

        this.faceDir = 1; // Snake direction (UP=0, RIGHT=1, DOWN=2, LEFT=3);
        this.dir = createVector(1, 0); // Snake direction (vector)

        //Linked list with the tail "cachos"
        this.tail = new Cacho(createVector(this.pos.x - 30, this.pos.y), createVector(this.dir.x, this.dir.y), this.step);
        this.addNewCacho = false; // Snakes needs new cacho
        this.isDead = false;
        this.score = 0;
        this.scoreD = 0;

        this.foodTimer = 0; // Time since last food
        this.time = 0; // Time alive

        this.brain = brain; // NN

    }

    //Function to draw the snake with rectangles
    draw(){
        fill(50, 200, 50);
        if(this.dir.x !== 0){
            rect(this.pos.x, this.pos.y+2, 30, 30-4);
        }else{
            rect(this.pos.x+2, this.pos.y, 30-4, 30);
        }
        push();
        stroke(0);
        strokeWeight(4);
        switch (this.faceDir){
            case 0/*UP*/:
                point(this.pos.x+15+4, this.pos.y+15-8);
                point(this.pos.x+15-4, this.pos.y+15-8);
                break;
            case 1/*RIGHT*/:
                point(this.pos.x+15+8, this.pos.y+15+4);
                point(this.pos.x+15+8, this.pos.y+15-4);
                break;
            case 2/*DOWN*/:
                point(this.pos.x+15+4, this.pos.y+15+8);
                point(this.pos.x+15-4, this.pos.y+15+8);
                break;
            case 3/*LEFT*/:
                point(this.pos.x+15-8, this.pos.y+15+4);
                point(this.pos.x+15-8, this.pos.y+15-4);
                break;
        }
        pop();

        if(this.tail != null){
            this.tail.draw();
        }
    }

    // Function to draw the snake with curves
    draw2(){
        push();
        beginShape();
        noFill();
        stroke(50, 200, 50);
        strokeWeight(25);
        curveVertex(this.pos.x + 15, this.pos.y +15);
        curveVertex(this.pos.x + 15, this.pos.y +15);
        if(this.tail != null){
            this.tail.draw2();
        }
        endShape();
        pop();

        push();
        stroke(0);
        strokeWeight(4);
        switch (this.faceDir){
            case 0/*UP*/:
                point(this.pos.x+15+4, this.pos.y+15-6);
                point(this.pos.x+15-4, this.pos.y+15-6);
                break;
            case 1/*RIGHT*/:
                point(this.pos.x+15+6, this.pos.y+15+4);
                point(this.pos.x+15+6, this.pos.y+15-4);
                break;
            case 2/*DOWN*/:
                point(this.pos.x+15+4, this.pos.y+15+6);
                point(this.pos.x+15-4, this.pos.y+15+6);
                break;
            case 3/*LEFT*/:
                point(this.pos.x+15-6, this.pos.y+15+4);
                point(this.pos.x+15-6, this.pos.y+15-4);
                break;
        }
        pop();
    }



    //Update the snake position
    update(map){
        this.time += 1/60;
        this.foodTimer += 1/60;
        if(this.foodTimer >= 30){
            this.isDead = true;
        }else {
            if (this.pos.x % map.blockSize === 0 && this.pos.y % map.blockSize === 0) {
                if (this.addNewCacho) {
                    this.tail.addCacho();
                    this.addNewCacho = false;
                }
                if (this.tail != null) {
                    let dirX = (this.pos.x - this.tail.pos.x) / 30;
                    let dirY = (this.pos.y - this.tail.pos.y) / 30;
                    this.tail.updateDir(createVector(dirX, dirY));
                }
            }
            this.pos.add(createVector(this.dir.x * this.step, this.dir.y * this.step));
            if (this.tail != null) {
                this.tail.checkCollision(this);
            }
            if (this.pos.x < 0 || this.pos.x > width - 30 || this.pos.y < 0 || this.pos.y > height - 70) {
                this.isDead = true;
            }
            if (this.tail != null) {
                this.tail.update();
            }

            if (this.pos.x % map.blockSize === 0 && this.pos.y % map.blockSize === 0) {
                /*
                let distToWalls = [this.pos.y, (width - this.pos.x), (height - this.pos.y), this.pos.x];
                let distToTail = [0, 0, 0, 0];
                let distToFood = [0, 0, 0, 0];

                // UP ARROW
                for(let i = this.pos.y-30; i >= 0; i-=30){
                    if(dist(this.pos.x, i, map.foodPos.x*30, map.foodPos.y*30) < 30){
                        distToFood[0] = dist(this.pos.x, this.pos.y, map.foodPos.x*30, map.foodPos.y*30)
                    }

                    let cacho = this.tail.nextCacho;
                    let found = false;
                    while(cacho != null && !found){
                        if(dist(this.pos.x, i, cacho.pos.x, cacho.pos.y) < 30){
                            distToTail[0] = dist(this.pos.x, this.pos.y, cacho.pos.x, cacho.pos.y);
                            found = true;
                        }
                        cacho = cacho.nextCacho;
                    }
                }

                // LEFT ARROW
                for(let i = this.pos.x+30; i <= width-30; i+=30){
                    if(dist(i, this.pos.y, map.foodPos.x*30, map.foodPos.y*30) < 30){
                        distToFood[1] = dist(this.pos.x, this.pos.y, map.foodPos.x*30, map.foodPos.y*30)
                    }

                    let cacho = this.tail.nextCacho;
                    let found = false;
                    while(cacho != null && !found){
                        if(dist(i, this.pos.y, cacho.pos.x, cacho.pos.y) < 30){
                            distToTail[1] = dist(this.pos.x, this.pos.y, cacho.pos.x, cacho.pos.y);
                            found = true;
                        }
                        cacho = cacho.nextCacho;
                    }
                }

                // DOWN ARROW
                for(let i = this.pos.y+30; i <= height-70; i+=30){
                    if(dist(this.pos.x, i, map.foodPos.x*30, map.foodPos.y*30) < 30){
                        distToFood[2] = dist(this.pos.x, this.pos.y, map.foodPos.x*30, map.foodPos.y*30)
                    }

                    let cacho = this.tail.nextCacho;
                    let found = false;
                    while(cacho != null && !found){
                        if(dist(this.pos.x, i, cacho.pos.x, cacho.pos.y) < 30){
                            distToTail[2] = dist(this.pos.x, this.pos.y, cacho.pos.x, cacho.pos.y);
                            found = true;
                        }
                        cacho = cacho.nextCacho;
                    }
                }

                // RIGHT ARROW
                for(let i = this.pos.x-30; i >= 0; i-=30){
                    if(dist(i, this.pos.y, map.foodPos.x*30, map.foodPos.y*30) < 30){
                        distToFood[3] = dist(this.pos.x, this.pos.y, map.foodPos.x*30, map.foodPos.y*30)
                    }

                    let cacho = this.tail.nextCacho;
                    let found = false;
                    while(cacho != null && !found){
                        if(dist(i, this.pos.y, cacho.pos.x, cacho.pos.y) < 30){
                            distToTail[3] = dist(this.pos.x, this.pos.y, cacho.pos.x, cacho.pos.y);
                            found = true;
                        }
                        cacho = cacho.nextCacho;
                    }
                }
                let input = distToWalls.concat(distToFood).concat(distToTail);
                for(let i = 0; i < input.length; i++){
                    input[i] = input[i]/600;
                }
                input.concat(this.foodTimer/30);
                this.brain.loadInputFromArray(input);
                //console.log(i1);
                this.brain.predict();
                //console.log(this.brain.getOutputAsArray());

                let maxPos;
                let maxPos2;
                let max;
                let max2;
                if(this.brain.output.data[0][0] > this.brain.output.data[0][1]){
                    maxPos = 0;
                    maxPos2 = 1;
                    max = this.brain.output.data[0][0];
                    max2 = this.brain.output.data[0][1];
                }else{
                    maxPos = 1;
                    maxPos2 = 0;
                    max = this.brain.output.data[0][1];
                    max2 = this.brain.output.data[0][0];
                }

                for(let i = 2; i < this.brain.output.cols; i++){
                    if(this.brain.output.data[0][i] > max){
                        let temp1 = maxPos;
                        let temp2 = max;
                        maxPos = i;
                        max = this.brain.output.data[0][i];
                        maxPos2 = temp1;
                        max = temp2;
                    }else if(this.brain.output.data[0][i] > max2){
                        maxPos2 = i;
                        max2 = this.brain.output.data[0][i];
                    }
                }

                switch (maxPos){
                    case 0:
                        if(this.faceDir !== 2){
                            this.faceDir = 0;
                        }else{
                            this.faceDir = maxPos2;
                        }
                        break;
                    case 1:
                        if(this.faceDir !== 3){
                            this.faceDir = 1;
                        }else{
                            this.faceDir = maxPos2;
                        }
                        break;
                    case 2:
                        if(this.faceDir !== 0){
                            this.faceDir = 2;
                        }else{
                            this.faceDir = maxPos2;
                        }
                        break;
                    case 3:
                        if(this.faceDir !== 1){
                            this.faceDir = 3;
                        }else{
                            this.faceDir = maxPos2;
                        }
                        break;

                }

                switch (this.faceDir) {
                    case 0:
                        this.dir = createVector(0, -1);
                        if(distToFood[0] > 0){
                            this.scoreD ++;
                        }
                        break;
                    case 1:
                        this.dir = createVector(1, 0);
                        if(distToFood[1] > 0){
                            this.scoreD ++;
                        }
                        break;
                    case 2:
                        this.dir = createVector(0, 1);
                        if(distToFood[2] > 0){
                            this.scoreD ++;
                        }
                        break;
                    case 3:
                        this.dir = createVector(-1, 0);
                        if(distToFood[3] > 0){
                            this.scoreD ++;
                        }
                        break;
                }*/
                //this.score -= Math.pow(dist(this.pos.x, this.pos.y, map.foodPos.x, map.foodPos.y)/300, 2);
            }

        }
    }

    setAddNewCacho(){
        this.score += this.scoreD;
        this.scoreD = 0;
        this.addNewCacho = true;
    }

    setFoodTimerToZero(){
        this.foodTimer = 0;
    }

    kill(){
        this.isDead = true;
    }
}