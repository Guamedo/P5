class BinaryDisplay{
	
	constructor(num, x, y, rad, bitNum){
		this.number = num;
		this.x = x;
		this.y = y;
		this.rad = rad;
		this.bitNum = bitNum;
		this.sep = this.rad/4;
	}
	
	draw(){
		push();
		for(let i = 0; i < this.bitNum; i++){
			let isOne = (this.number & pow(2, this.bitNum-1-i)) >> (this.bitNum-1-i);
			fill(isOne*255);
			ellipse(this.x + i*(2*this.rad+this.sep)+this.rad+this.sep,
					this.y + this.rad + this.sep,
					2*this.rad,
					2*this.rad);
		}
		pop();
	}
}