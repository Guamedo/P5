class Map{
    constructor(mapData){
        this.cols = 28;
        this.rows = 31;
        this.blockSize = 18;
        this.mapData = mapData;
        this.playerInitialPos = createVector(0, 0);
        this.enemisInitialPos = [];
        this.enemyNumber = 0;
        this.foodPos = [];
        this.bigFoodPos = [];
        this.blockPos = [];
        this.doorPos = [];
    }

    load(){
        for(let y = 0; y < this.rows; y++){
            for(let x = 0; x < this.cols; x++){
                let ch = this.mapData[y][x];
                switch (ch){
                    case '#':
                        this.blockPos.push(createVector(x*this.blockSize+this.blockSize/2,
                                                        y*this.blockSize+this.blockSize/2));
                        break;
                    case 'o':
                        this.foodPos.push(createVector(x*this.blockSize+this.blockSize/2,
                                                       y*this.blockSize+this.blockSize/2));
                        //this.mapData[y][x] = ' ';
                        break;
                    case 'O':
                        this.bigFoodPos.push(createVector(x*this.blockSize+this.blockSize/2,
                                                          y*this.blockSize+this.blockSize/2));
                        break;
                    case ' ':
                        break;
                    case 'P':
                        this.playerInitialPos = createVector(x*this.blockSize+this.blockSize/2,
                                                             y*this.blockSize+this.blockSize/2);
                        //this.mapData[y][x] = ' ';
                        break;
                    case 'E':
                        this.enemisInitialPos.push(createVector(x*this.blockSize+this.blockSize/2,
                                                                y*this.blockSize+this.blockSize/2));
                        this.enemyNumber++;
                        break;
                    case '-':
                        this.doorPos.push(createVector(x*this.blockSize+this.blockSize/2,
                                                       y*this.blockSize+this.blockSize/2));
                        break;
                    default:
                        console.log(ch);
                }
            }
        }
    }

    draw(){
        push();
        fill(200);
        noStroke();
        rectMode(CENTER);
        this.blockPos.forEach(b => rect(b.x, b.y, this.blockSize, this.blockSize, 5));
        fill(200, 100);
        this.doorPos.forEach(d => rect(d.x, d.y, this.blockSize, this.blockSize, 5));
        pop();

        push();
        fill(255);
        noStroke();
        this.foodPos.forEach(f => ellipse(f.x, f.y, this.blockSize/4, this.blockSize/4));
        this.bigFoodPos.forEach(bf => ellipse(bf.x, bf.y, this.blockSize/2, this.blockSize/2));
        pop();
    }

    removeFoodAt(i){
        this.foodPos.splice(i, 1);
    }

    removeBigFoodAt(i){
        this.bigFoodPos.splice(i, 1);
    }
}