function setup() {
    let mat1 = new Matrix(2, 3);
    let mat2 = new Matrix(3, 2);
    mat1.data[0][0] = 2;
    mat2.data[0][0] = 2;
    let mat1mat2 = mat1.multiply(mat2);
    console.log(mat1mat2);
}

function draw() {

}