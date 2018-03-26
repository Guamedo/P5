class NeuronalNetwork{
    constructor(input, hidden, output, weightMin = -1, weightMax = 1,
                aFunction1 = NeuronalNetwork.reLu, aFunction2 = NeuronalNetwork.sigmoid){
        this.input = new Matrix(1, input);
        this.W1 = new Matrix(input, hidden, true, weightMin, weightMax);
        this.b1 = new Matrix(hidden, 1, true, weightMin, weightMax);
        this.aFunction1 = aFunction1;
        this.W2 = new Matrix(hidden, output, true, weightMin, weightMax);
        this.b2 = new Matrix(output, 1, true, weightMin, weightMax);
        this.aFunction2 = aFunction2;
        this.output = new Matrix(1, output);

        this.weightMin = weightMin;
        this.weightMax = weightMax;
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

    predict(){
        let out = this.input.multiply(this.W1);
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

    blend(nn){
        let newNN = new NeuronalNetwork(this.input.cols, this.W1.cols, this.output.cols, this.weightMin, this.weightMax);
        newNN.W1 = this.W1.blend(nn.W1);
        newNN.b1 = this.b1.blend(nn.b1);
        newNN.W2 = this.W2.blend(nn.W2);
        newNN.b2 = this.b2.blend(nn.b2);
        return newNN;
    }

    blendWithMutation(nn, p, mRange){
        let newNN = new NeuronalNetwork(this.input.cols, this.W1.cols, this.output.cols, this.weightMin, this.weightMax);
        newNN.W1 = this.W1.blendWithMutation(nn.W1, p, mRange);
        newNN.b1 = this.b1.blendWithMutation(nn.b1, p, mRange);
        newNN.W2 = this.W2.blendWithMutation(nn.W2, p, mRange);
        newNN.b2 = this.b2.blendWithMutation(nn.b2, p, mRange);
        return newNN;
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