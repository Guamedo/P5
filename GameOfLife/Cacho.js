class Cacho{
    constructor(pos, width, height){
        this.pos = pos;
        this.w = width;
        this.h = height;
        if(random(1) < 0.25){
            this.state = 1;
        }else{
            this.state = 0;
        }
        this.a = PI*(1-this.state);
        this.nextState = this.state;
        this.rax = floor(random(2));
        this.isUpdated = true;
    }

    update(num){
        if(this.isUpdated) {
            if (this.state === 0) {
                if (num === 3) {
                    this.nextState = 1;
                    this.isUpdated = false;
                }
            } else {
                if (num !== 2 && num !== 3) {
                    this.nextState = 0;
                    this.isUpdated = false;
                }
            }
        }
    }

    change(){
        if(!this.isUpdated){
            if(this.state === 0){
                this.a = max(0, this.a - 0.5);
                if(this.a === 0){
                    this.isUpdated = true;
                    this.state = this.nextState;
                    this.rax = floor(random(2));
                }
            }else{
                this.a = min(PI, this.a + 0.5);
                if(this.a === PI){
                    this.isUpdated = true;
                    this.state = this.nextState;
                    this.rax = floor(random(2));
                }
            }
        }
    }

    setState(s){
        this.state = s;
        this.nextState = this.state;
        this.isUpdated = true;
        this.a = PI*(1-this.state);
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