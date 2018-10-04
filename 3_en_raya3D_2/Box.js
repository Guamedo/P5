class Box{
    constructor(pos, s){
        this.pos = pos;
        this.size = s;
        this.isSelected = false;
        this.mark = -1;
        this.mina = false;
    }

    update(dir){
        this.pos.add(dir);
    }

    draw(c1){
        c1.push();
        c1.translate(this.pos);
        if(this.isSelected){
            c1.stroke(255, 0, 0);
            c1.ambientMaterial(200, 50, 50, 50);
        }else{
            c1.stroke(255);
            c1.noFill();
        }

        c1.strokeWeight(2);
        c1.box(this.size);
        c1.pop();

        c1.push();
        c1.translate(this.pos);
        c1.noStroke();
        if(this.mark == 0){
            c1.ambientMaterial(0, 255, 0);
            c1.sphere(this.size/2);
        }else if(this.mark == 1){
            c1.ambientMaterial(0, 0, 255);
            c1.sphere(this.size/2);
        }
        c1.pop();
    }
}