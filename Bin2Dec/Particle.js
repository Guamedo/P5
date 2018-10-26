class Particle{

	constructor(x0, y0, x, y, speed, rad, col){
		this.pos = createVector(x0, y0);
		this.targetPos = createVector(x, y);
		this.speed = createVector(random(-2, 2), random(-2, 2));
		this.atractionForce = 0.01;
		this.rad = rad;
		this.col = col;
		this.end = false;
	}
	
	update(){
        let dir = this.targetPos.copy().sub(this.pos).normalize();
        this.pos.add(this.speed);
        this.speed.add(dir.mult(this.atractionForce));
        this.speed.mult(0.99);
	}
	
	draw(){
		push();
		noStroke();
		fill(this.col);
		ellipse(this.pos.x, this.pos.y, 2*this.rad, 2*this.rad);
		pop();
	}
}