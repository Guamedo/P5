class FunctionSet{
    constructor(){
        this.functions = [];
        this.weights = [];
        this.probability = [];
    }

    addFunction(fun, weight){
        this.functions.push(fun);
        this.weights.push(weight);
        this.probability.push(0.0);
        this.updateProbs();
    }

    updateProbs(){
        let sum = 0;
        for(let i = 0; i < this.weights.length; i++){
            sum += this.weights[i];
        }
        for(let i = 0; i < this.probability.length; i++){
            this.probability[i] = this.weights[i]/sum;
        }
    }

    setSameProb(){
        let sum = 0;
        for(let i = 0; i < this.weights.length; i++){
            sum += this.weights[i];
        }
        sum /= this.weights.length;
        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] = sum;
        }
        this.updateProbs();
    }

    getFunction(n){
        let l = 0.0;
        for(let i = 0; i < this.functions.length; i++){
            if(n <= this.probability[i] + l){
                return this.functions[i];
            }else{
                l += this.probability[i];
            }
        }
        return this.functions[this.functions.length - 1];
    }
}