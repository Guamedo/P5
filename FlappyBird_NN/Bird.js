class Bird {
    constructor(W1, b1, W2, b2) {
        this.y = height / 2;
        this.x = 64;
        this.gravity = 1;
        this.lift = -15;
        this.velocity = 0;
        this.isDead = false;
        this.col = [round(random(0,255)), round(random(0,255)), round(random(0,255))];

        this.input = [0, 0, width, height/2];
        this.output = 0;
        this.fitness = 0;

        if(W1 === undefined || b1 === undefined || W2 === undefined || b2 === undefined) {
            this.randomDim = 100;

            this.W1 = [];
            for (let i = 0; i < 4; i++) {
                this.W1[i] = [random(-this.randomDim, this.randomDim), random(-this.randomDim, this.randomDim), random(-this.randomDim, this.randomDim)];
            }
            this.b1 = [random(-this.randomDim, this.randomDim), random(-this.randomDim, this.randomDim), random(-this.randomDim, this.randomDim)];

            this.W2 = [random(-this.randomDim, this.randomDim), random(-this.randomDim, this.randomDim), random(-this.randomDim, this.randomDim)];
            this.b2 = random(-this.randomDim, this.randomDim);
        }else{
            this.W1 = W1;
            this.b1 = b1;
            this.W2 = W2;
            this.b2 = b2;
        }
    }

    show(){
        if(!this.isDead){
            fill(this.col[0], this.col[1], this.col[2]);
        }else{
            fill(100, 100);
        }

        push();
        rectMode(CENTER);
        rect(this.x, this.y, 32, 32);
        pop();
    }

    up(){
        this.velocity = this.lift;
    }

    update(walls){
        this.fitness++;
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;

        if (this.y > height) {
            this.isDead = true;
        }

        if (this.y < 0) {
            this.isDead = true;
        }

        this.input[0] = Math.abs(0 - this.y);
        this.input[1] = Math.abs(height - this.y);

        if(walls.length > 0) {
            let nextWall = walls[0];
            let nextWallFound = false;
            for (let i = 1; !nextWallFound && i < walls.length; i++) {
                if (nextWall.x < this.x - 16 - nextWall.width / 2) {
                    nextWall = walls[i];
                } else {
                    nextWallFound = true;
                }
            }

            this.input[2] = nextWall.x - this.x;
            this.input[3] = nextWall.holeY - this.y;
            /*push();
            stroke(0,0,255);
            strokeWeight(5);
            line(this.x, this.y, nextWall.x, nextWall.holeY);
            pop();*/
        }else{
            this.input[2] = width - this.x;
            this.input[3] = (height/2) - this.y;
            /*push();
            stroke(0,0,255);
            strokeWeight(5);
            line(this.x, this.y, width, (height/2));
            pop();*/
        }
        this.generateOutput();
        if(this.output){
            this.up();
        }

    }

    generateOutput(){
        let aux0 = this.input[0]*this.W1[0][0] +
                    this.input[1]*this.W1[1][0] +
                    this.input[2]*this.W1[2][0] +
                    this.input[3]*this.W1[3][0];

        let aux1 = this.input[0]*this.W1[0][1] +
                    this.input[1]*this.W1[1][1] +
                    this.input[2]*this.W1[2][1] +
                    this.input[3]*this.W1[3][1];

        let aux2 = this.input[0]*this.W1[0][2] +
                    this.input[1]*this.W1[1][2] +
                    this.input[2]*this.W1[2][2] +
                    this.input[3]*this.W1[3][2];

        aux0 += this.b1[0];
        aux1 += this.b1[1];
        aux2 += this.b1[2];

        aux0 = Bird.reLu(aux0);
        aux1 = Bird.reLu(aux1);
        aux2 = Bird.reLu(aux2);

        let out = aux0*this.W2[0] +
                    aux1*this.W2[1] +
                    aux2*this.W2[2];

        out += this.b2;

        out = Bird.sigmoid(out);

        if(out <= 0.5){
            this.output = 0;
        }else{
            this.output = 1;
        }
    }

    static reLu(x){
        return Math.max(0, x);
    }

    static sigmoid(x){
        return 1/(1+Math.exp(-x));
    }
}
