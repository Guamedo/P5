// TODO
class NeuronalNetwork{
    constructor(input, hidden, output){
        this.input = new Matrix(1, input);
        this.W1 = new Matrix(input, hidden, true);
        this.b1 = new Matrix(hidden, 1, true);
        this.W2 = new Matrix(hidden, output, true);
        this.b2 = new Matrix(output, 1, true);
        this.output = new Matrix(output, 1);
    }

    loadInputFromArray(array){
        if(array.length === this.input.cols){
            for(let i = 0; i < this.input.cols; i++){
                this.input.data[0][i] = array[i];
            }
        }else{
            console.error("ERROR : Invalid array");
        }
    }

    getOutputAsArray(){
        let outputArray = [];
        for(let i = 0; i < this.output.cols; i++){
            outputArray.push(this.output.data[0][i]);
        }
        return outputArray;
    }

    calculateOutput(){
        let out = this.input.multiply(this.W1);
        console.log(out);
        out.addBias(this.b1);
        out = out.multiply(this.W2);
        out.addBias(this.b2);
        this.output = out;
    }

    draw(){
        let inputX = 100;
        let hiddenX = 300;
        let outX = 500;

        let offsetI = height/this.input.cols;
        let sizeI = Math.min(offsetI, 50);

        let offsetH = height/this.b1.rows;
        let sizeH = Math.min(offsetH, 50);

        let offsetO = height/this.output.rows;
        let sizeO = Math.min(offsetO, 50);

        stroke(0);
        strokeWeight(1);

        for(let i = 0; i < this.W1.rows; i++){
            for(let j = 0; j < this.W1.cols; j++){
                let patata = 5*((this.W1.data[i][j]+1)/2);
                strokeWeight(Math.ceil(patata));
                line(inputX, i*offsetI + offsetI/2, hiddenX, j*offsetH + offsetH/2);
            }
        }

        for(let i = 0; i < this.W2.rows; i++){
            for(let j = 0; j < this.W2.cols; j++){
                let patata = 5*((this.W2.data[i][j]+1)/2);
                strokeWeight(Math.ceil(patata));
                line(hiddenX, i*offsetH + offsetH/2, outX, j*offsetO + offsetO/2);
            }
        }

        fill(255);
        strokeWeight(1);
        for(let i = 0; i < this.input.cols; i++){
            ellipse(inputX, i*offsetI + offsetI/2, sizeI, sizeI);
        }

        for(let i = 0; i < this.b1.rows; i++){
            ellipse(hiddenX, i*offsetH + offsetH/2, sizeH, sizeH);
        }

        for(let i = 0; i < this.output.rows; i++){
            ellipse(outX, i*offsetO + offsetO/2, sizeO, sizeO);
        }
    }

    static reLu(x){
        return Math.max(0, x);
    }

    static sigmoid(x){
        return 1/(1+Math.exp(-x));
    }

    static tanh(x){
        return (1 - Math.exp(-2*x)) / (1 + Math.exp(-2*x));
    }
}