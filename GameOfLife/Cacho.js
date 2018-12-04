class Cacho{
    constructor(pos, width, height){
        this.pos = pos;
        this.w = width;
        this.h = height;
        if(random(1) < 0.5){
            this.state = 1;
        }else{
            this.state = 0;
        }
        this.nextState = this.state;
        this.rax = floor(random(2));
    }

    update(num){
        if(this.state === 0){
            if(num === 3){
                this.nextState = 1;
            }
        }else{
            if(num !== 2 && num !== 3){
                this.nextState = 0;
            }
        }
        this.a = PI*(1-this.state);
    }

    change(){
        this.state = this.nextState;
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