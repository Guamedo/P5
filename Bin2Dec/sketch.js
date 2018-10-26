let binDisp;

let font;
let points = [];
let textSize = 250;
let textY = 300;

let particles = [];

let mode = 0;

function preload(){
	font = loadFont("Fonts/UnicornSparkles.otf");
}

function setup() {
	createCanvas(400, 400);
	
	let num = 42;//Math.floor(random(256));
	binDisp = new BinaryDisplay(num, width / 2 - (40 * 4 + 4.5 * (20 / 4)), 50, 20, 8);

	points = font.textToPoints(num.toString(), 100, textY, textSize, {
		sampleFactor: 0.1,
		simplifyThreshold: 0
	});
	
	let minX = Infinity;
	let maxX = 0;
	
	for(let i = 0; i < points.length; i++){
		if(points[i].x < minX){
			minX = points[i].x;
		}
		if(points[i].x > maxX){
			maxX = points[i].x;
		}
	}
	
	points = font.textToPoints(num.toString(), width/2 - (maxX-minX)/2, textY, textSize, {
		sampleFactor: 0.1,
		simplifyThreshold: 0
	});
	
	let pointsPerBit = Math.floor(points.length/binDisp.bitNum);
	let remainingPoints = points.length - pointsPerBit*binDisp.bitNum;
	
	let startIndex = 0;
	for(let i = 0; i < binDisp.bitNum; i++){
		let i0 = startIndex;
		let i1 = startIndex + pointsPerBit - 1 + (i < remainingPoints ? 1 : 0);
		startIndex = i1+1;
		for(let j = i0; j <= i1; j++){
			let randomAngle = random(2*PI);
			let randomRad = random(binDisp.rad);
			let noiseX = randomRad*cos(randomAngle);
			let noiseY = randomRad*sin(randomAngle);
			particles.push(new Particle(binDisp.x + i*(2*binDisp.rad+binDisp.sep)+binDisp.rad+binDisp.sep + noiseX,
										binDisp.y + binDisp.rad + binDisp.sep + noiseY,
								    	points[j].x,
								    	points[j].y,
								   		0,
										4,
									   	255*((binDisp.number & pow(2, binDisp.bitNum-1-i)) >> (binDisp.bitNum-1-i))));
		}
	}
}

function draw() {
	noStroke();
	background(80);
	binDisp.draw();
	
	particles.forEach(p => p.draw());
	particles.forEach(p => p.update());
}