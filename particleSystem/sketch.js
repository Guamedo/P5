let particles = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(180);

    // Update particles positions
    particles.forEach(p => p.update(mouseX, mouseY));

    // Draw all the particles
    particles.forEach(p => p.draw());

    // Create a new particle
    for(let i = 0; i < 5; i++){
        particles.push(new Particle(createVector(width/2+random(-width/2, width/2), height),
            createVector(random(-2, 2), 0),
            createVector(0, -0.03)));
    }


    // Remove all the particles out of the screen
    particles = particles.filter(p => p.pos.y <= height && p.pos.x <= width &&
                                        p.pos.y >= 0 && p.pos.x >= 0);
}