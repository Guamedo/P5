let pNumber = 500;
let rad = 150;
let points = [];
let desp = 1;

let sound;
let amplitude;

function preload(){
    sound = loadSound('music/krippykush.mp3');
}

function keyPressed(){
    if(keyCode == 13 && !sound.isPlaying()){
        sound.play();        
    }
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	//mic = new p5.AudioIn();
  	//mic.start();   
    
    amplitude = new p5.Amplitude();
    
    sound.play();
    
	for(let i = 0; i < pNumber; i++){
		points.push(0);
	}
}

function draw() {
	colorMode(RGB);
	background(51, 40);
	
    translate(width/2, height/2-25);
	scale(1, -1);
	
	colorMode(HSB, 2*PI, 100, 100, 1);
    //strokeWeight(2);
    let delta = 2*PI/pNumber;
	for(let i = 0; i < pNumber; i++){
		stroke(i*delta, 60, 100/*, 1-(i*delta/(2*PI))*/);
        let col = 0;
        if(delta*i > PI){
            col = delta*i;
        }else{
            col = PI-delta*i;
        }
        stroke(col, 60, 100/*, 1-(i*delta/(2*PI))*/);
		let a = delta*i;
        let r1 = (rad+points[i]+points[0]);
        
		let x0 = (r1/12)*(16*Math.pow(sin(a), 3));//r1*cos(a);
		let y0 = (r1/12)*(13*cos(a)-5*cos(2*a)-2*cos(3*a)-cos(4*a));//r1*sin(a);
		
		a = delta*(i+1);
        let r2 = (rad+points[(i+desp)%pNumber]+points[0]);
		let x1 = (r2/12)*(16*Math.pow(sin(a), 3));//r2*cos(a);
		let y1 = (r2/12)*(13*cos(a)-5*cos(2*a)-2*cos(3*a)-cos(4*a));//r2*sin(a);
		line(x0, y0, x1, y1);
	}
	
	points.pop();
	points.unshift(0);
	points[0] = amplitude.getLevel()*250;
    //points[0] = mic.getLevel()*200;
	
}