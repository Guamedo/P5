class NeuronalNetwork{
    constructor(input, hidden, output, aFunction1 = NeuronalNetwork.reLu, aFunction2 = NeuronalNetwork.sigmoid){
        this.input = new Matrix(1, input);
        this.W1 = new Matrix(input, hidden, true);
        this.b1 = new Matrix(hidden, 1, true);
        this.aFunction1 = aFunction1;
        this.W2 = new Matrix(hidden, output, true);
        this.b2 = new Matrix(output, 1, true);
        this.aFunction2 = aFunction2;
        this.output = new Matrix(1, output);
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
            outputArray.push(this.output.data[i][0]);
        }
        return outputArray;
    }

    predict(){
        let out = this.input.multiply(this.W1);
        console.log(out);
        out.addBias(this.b1);
        for(let i = 0; i < out.rows; i++){
            for(let j = 0; j < out.cols; j++){
                out.data[i][j] = this.aFunction1(out.data[i][j]);
            }
        }
        out = out.multiply(this.W2);
        out.addBias(this.b2);
        for(let i = 0; i < out.rows; i++){
            for(let j = 0; j < out.cols; j++){
                out.data[i][j] = this.aFunction2(out.data[i][j]);
            }
        }
        this.output = out;
    }

    draw(x, y, w, h){
        let inputX = w/6;
        let hiddenX = w/3 + w/6;
        let outX = 2*w/3 + w/6;

        let offsetI = h/this.input.cols;
        let sizeI = Math.min(Math.ceil(offsetI), (w+h)/24);

        let offsetH = h/this.b1.rows;
        let sizeH = Math.min(Math.ceil(offsetH), (w+h)/24);

        let offsetO = h/this.output.cols;
        let sizeO = Math.min(Math.ceil(offsetO), (w+h)/24);

        stroke(0);
        strokeWeight(1);

        for(let i = 0; i < this.W1.rows; i++){
            for(let j = 0; j < this.W1.cols; j++){
                let weight = 5*((this.W1.data[i][j]+1)/2);
                strokeWeight(Math.ceil(weight));
                line(inputX + x, i*offsetI + offsetI/2 + y, hiddenX + x, j*offsetH + offsetH/2 + y);
            }
        }

        for(let i = 0; i < this.W2.rows; i++){
            for(let j = 0; j < this.W2.cols; j++){
                let weight = 5*((this.W2.data[i][j]+1)/2);
                strokeWeight(Math.ceil(weight));
                line(hiddenX + x, i*offsetH + offsetH/2 + y, outX + x, j*offsetO + offsetO/2 + y);
            }
        }

        textAlign(CENTER, CENTER);
        strokeWeight(1);
        textSize(Math.ceil(sizeI*0.35));
        for(let i = 0; i < this.input.cols; i++){
            fill(0,250,154);
            ellipse(inputX + x, i*offsetI + offsetI/2 + y, sizeI, sizeI);
            fill(0);
            text(this.input.data[0][i].toFixed(2), inputX + x, i*offsetI + offsetI/2 + y);
        }

        for(let i = 0; i < this.b1.rows; i++){
            fill(255,165,0);
            ellipse(hiddenX + x, i*offsetH + offsetH/2 + y, sizeH, sizeH);
        }

        textSize(Math.ceil(sizeO*0.35));
        for(let i = 0; i < this.output.cols; i++){
            fill(0,191,255);
            ellipse(outX + x, i*offsetO + offsetO/2 + y, sizeO, sizeO);
            fill(0);
            text(this.output.data[0][i].toFixed(2), outX + x, i*offsetO + offsetO/2 + y);
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