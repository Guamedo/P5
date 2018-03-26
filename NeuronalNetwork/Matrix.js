class Matrix{
    /***********************************************************************************
    * Generates a new Matrix Object:
    *  - rows: Number of rows of the matrix.
    *  - cols: Number of columns of the matrix.
    *  - innitRandom: If true the matrix will be initialised with random values, else
    *                 will be initialised with zeros. Is set to false by default.
    *  - randomMin: Minimum value for random initialization.
    *  - randomMax: Maximum value for random initialization.
    ***********************************************************************************/
    constructor(rows, cols, initRandom = false, randomMin = -1, randomMax = 1){
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        if(initRandom){
            for (let i = 0; i < this.rows; i++) {
                let newRow = [];
                for (let j = 0; j < this.cols; j++) {
                    newRow.push(random(randomMin, randomMax));
                }
                this.data.push(newRow);
            }
        }else {
            for (let i = 0; i < this.rows; i++) {
                let newRow = [];
                for (let j = 0; j < this.cols; j++) {
                    newRow.push(0);
                }
                this.data.push(newRow);
            }
        }
    }

    // Multiplies this matrix with <mat> and return a new matrix with the result
    multiply(mat){
        if(this.cols === mat.rows){
            // Create the matrix with the result
            let newMat = new Matrix(this.rows, mat.cols);

            for(let i = 0; i < newMat.rows; i++){
                for(let j = 0; j < newMat.cols; j++){
                    let val = 0;
                    for(let k = 0; k < this.cols; k++){
                        val += this.data[i][k] * mat.data[k][j];
                    }
                    newMat.data[i][j] = val;
                }
            }
            return newMat;
        }else{
            console.log("ERROR: Is not possible to multiply this two matrix");
        }
    }

    // Adds the <bias> vector to this matrix
    addBias(bias){
        if(this.cols === bias.rows){
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    this.data[i][j] += bias.data[j][0];
                }
            }
        }else{
            console.log("ERROR: Is not possible to add this bias")
        }
    }

    // Bend this matrix with <matrix> and return the result in a new matrix
    blend(matrix){
        if(this.rows === matrix.rows && this.cols === matrix.cols) {

            let newMat = new Matrix(this.rows, this.cols);

            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    if(random(0, 1) < 0.5){
                        newMat.data[i][j] = this.data[i][j];
                    }else{
                        newMat.data[i][j] = matrix.data[i][j];
                    }
                }
            }
            return newMat;
        }else{
            console.error("ERROR: Is not possible to blend two matrices of different size");
        }
    }

    // Bend this matrix with <matrix> and adds mutation o the result
    blendWithMutation(matrix, p, mRange){
        if(this.rows === matrix.rows && this.cols === matrix.cols) {

            let newMat = new Matrix(this.rows, this.cols);

            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    if(random(0, 1) < 0.5){
                        newMat.data[i][j] = this.data[i][j];
                        if(random(0, 1) < p){
                            newMat.data[i][j] += random(-mRange, mRange);
                        }
                    }else{
                        newMat.data[i][j] = matrix.data[i][j];
                        if(random(0, 1) < p){
                            newMat.data[i][j] += random(-mRange, mRange);
                        }
                    }
                }
            }
            return newMat;
        }else{
            console.error("ERROR: Is not possible to blend two matrices of different size");
        }
    }
}