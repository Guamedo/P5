let particles = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(51);
    particles.forEach(p => p.update());
    particles.forEach(p => p.draw());

    if(frameCount % 1 === 0){
        for(let i = 0; i < 10; i++){
            particles.push(new Particle(createVector(0, 0), createVector(random(0, 3), 0)));
        }
    }

    particles = particles.filter(p => p.pos.y <= height && p.pos.x <= width &&
                                        p.pos.y >= 0 && p.pos.x >= 0);
}