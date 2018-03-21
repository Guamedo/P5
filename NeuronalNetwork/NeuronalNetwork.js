//TODO
class NeuronalNetwork{
    constructor(input, hidden, output){
        this.input = new Matrix(1, input);
        this.W1 = new Matrix(input, hidden, true);
        this.b1 = new Matrix(hidden, 1, true);
        this.W2 = new Matrix(hidden, output, true);
        this.b2 = new Matrix(output, 1, true);
        this.output = new Matrix(output, 1);
    }
}