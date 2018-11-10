function generateStarsWhiteNoise(n, w, h){
    let s = [];
    for(let i = 0; i < n; i++){
        let point = createVector(random(5, w-5), random(5, h-5));
        while(center.dist(point) <= rad + 5){
            point = createVector(random(5, w-5), random(5, h-5));
        }
        s.push(point);
    }
    return s;
}

function generateStarsBlueNoise(n, w, h){
    let cols = Math.ceil(Math.sqrt(n));
    let rows = Math.ceil(Math.sqrt(n));
    let s = [];
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            s.push(createVector(random(i*(w/cols) + 5, i*(w/cols) + w/cols - 5),
                random(j*(h/rows) + 5, j*(h/rows) + h/rows - 5)));
        }
    }
    return s;
}