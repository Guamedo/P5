class Cacho{
    constructor(pos, width, height){
        this.pos = pos;
        this.w = width;
        this.h = height;
        if(random(1) < 0.1){
            this.state = 1;
        }else{
            this.state = 0;
        }
        this.a = PI*(1-this.state);
        this.rax = floor(random(2));
    }

    update(){
        this.a -= 0.05;
    }

    draw(){

        push();
        ambientLight(255);
        ambientMaterial(255);
        //noStroke();
        translate(this.pos.x, this.pos.y);
        if(this.rax){
            rotateX(this.a);
        }else{
            rotateY(this.a);
        }
        translate(0,0,0.01);
        plane(this.w, this.h);
        pop();

        push();
        ambientLight(255);
        ambientMaterial(0);
        //noStroke();
        translate(this.pos.x, this.pos.y);
        if(this.rax){
            rotateX(this.a);
        }else{
            rotateY(this.a);
        }
        translate(0, 0, -0.01);
        plane(this.w, this.h);
        pop();
    }


}