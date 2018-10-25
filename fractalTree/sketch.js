let ls;
let depth = 8;

function setup() {
    this.createCanvas(600, 600);

    ls = new LSystem();

    for(let i = 0; i < depth; i++){
        ls.grow();
    }
    background(51);
    stroke(255);
    ls.draw();
}

function draw() {

}