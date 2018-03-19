class Wall {
    constructor(w, hS) {
        this.x = width + w;
        this.width = w;

        this.holeY = round(random(hS / 2, height - hS / 2));
        this.holeSize = hS;

        this.coll = false;
    }

    draw() {
        push();
        fill(255);
        if (this.coll) {
            stroke(200, 0, 0);
            strokeWeight(5);
        }
        rect(this.x - this.width / 2, 0, this.width, this.holeY - (this.holeSize / 2));
        rect(this.x - this.width / 2, this.holeY + (this.holeSize / 2), this.width, height);
        pop();
    }

    update(birds) {
        this.x -= 3;
        this.coll = false;
        let deadBirds = [];
        for(let i = 0; i < birds.length; i++){
            if (birds[i].x >= this.x - (16 + this.width / 2) && birds[i].x <= this.x + (16 + this.width / 2)) {
                if (birds[i].y <= this.holeY - this.holeSize / 2 + 16 || birds[i].y >= this.holeY + this.holeSize / 2 - 16) {
                    if(!birds[i].isDead) {
                        deadBirds.push(i);
                        this.coll = true;
                    }
                }
            }
        }
        return deadBirds;
    }
}