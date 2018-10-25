class LSystem {
    constructor(){
        this.str = "0";
        this.segmentLenght = 2;
        this.angle = PI/4;
    }

    grow(){
        let outStr = "";
        let chars = this.str.split('');
        chars.forEach(function (c) {
            switch (c) {
                case "0":
                    outStr += "1[0]0";
                    break;
                case "1":
                    outStr += "11";
                    break;
                case "[":
                    outStr += "[";
                    break;
                case "]":
                    outStr += "]";
                    break;
                default:
                    break;
            }
        });
        this.str = outStr;
    }

    draw(){
        let chars = this.str.split('');
        push();
        translate(width/2, height);
        let system = this;
        chars.forEach(function (c) {
            switch (c) {
                case "0":
                    line(0, 0, 0, -system.segmentLenght);
                    translate(0, -system.segmentLenght);
                    break;
                case "1":
                    line(0, 0, 0, -system.segmentLenght);
                    translate(0, -system.segmentLenght);
                    break;
                case "[":
                    push();
                    rotate(system.angle);
                    break;
                case "]":
                    pop();
                    rotate(-system.angle);
                    break;
                default:
                    break;
            }
        });
        pop();
    }
}