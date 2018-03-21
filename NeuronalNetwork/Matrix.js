class Matrix{
    constructor(rows, cols, initRandom = false){
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        if(initRandom){
            for (let i = 0; i < this.rows; i++) {
                let newRow = [];
                for (let j = 0; j < this.cols; j++) {
                    newRow.push(random(-1, 1));
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
            console.log("ERROR: Is not possible to multiply this two matrix")
        }
    }
}