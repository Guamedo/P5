class Box{
    constructor(x, y, z, s){
        this.pos = createVector(x, y, z);
        this.size = s;
        this.isSelected = false;
        this.mark = -1;
        this.mina = false;
    }

    draw(){
        push();
        translate(this.pos);
        if(this.isSelected){
            stroke(255, 0, 0);
            ambientMaterial(200, 50, 50, 50);
        }else{
            stroke(255);
            noFill();
        }

        strokeWeight(2);
        box(this.size);
        pop();

        push();
        translate(this.pos);
        noStroke();
        if(this.mark == 0){
            ambientMaterial(0, 255, 0);
            sphere(this.size/2);
        }else if(this.mark == 1){
            ambientMaterial(0, 0, 255);
            sphere(this.size/2);
        }
        pop();
    }
}