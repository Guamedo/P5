let greed = [];
let cellSize = 10;

let cols;
let rows;

let startPos;
let actualPos;
let goalPos;

let openSet = [];
let found = false;

let current;

let state = 0;
let selected = -1;

function setup(){
    createCanvas(600, 600);

    cols = Math.floor(width/cellSize);
    rows = Math.floor(height/cellSize);

    for(let i = 0; i < cols; i++){
        let row = [];
        for(let j = 0; j < rows; j++){
            row.push(new Cell(i, j, cellSize));
        }
        greed.push(row);
    }

    startPos = createVector(0, 0);

    goalPos = createVector(cols-1, rows-1);

    frameRate(120);
}

function draw(){
    background(255);
    // A* //

    switch(state){
        case 0:
            // Draw greed
            for(let i = 0; i < cols; i++){
                for(let j = 0; j < rows; j++){
                    greed[i][j].draw2();
                }
            }

            fill(200, 50, 200);
            if(selected !== 1){
                rect(startPos.x*cellSize, startPos.y*cellSize, cellSize, cellSize);
            }else{
                rect(mouseX-cellSize/2, mouseY-cellSize/2, cellSize, cellSize);
            }

            fill(50, 200, 50);
            if(selected !== 2){
                rect(goalPos.x*cellSize, goalPos.y*cellSize, cellSize, cellSize);
            }else{
                rect(mouseX-cellSize/2, mouseY-cellSize/2, cellSize, cellSize);
            }
            break;
        case 1:
            if (openSet.length > 0 && !found) {

                openSet.sort(function (a, b) {
                    return b.fScore - a.fScore;
                });
                current = openSet.pop();

                if (current.pos.x === goalPos.x && current.pos.y === goalPos.y) {
                    found = true;
                }
                current.visited = true;
                let neighbors = getNeighbors(current);
                //console.log(neighbors);
                for (let i = 0; i < neighbors.length; i++) {
                    neighbors[i].evaluated = true;
                    if (!neighbors[i].visited) {
                        if (openSet.indexOf(neighbors[i]) < 0) {
                            openSet.push(neighbors[i]);
                        }

                        let newG = current.gScore + current.pos.dist(neighbors[i].pos);
                        if (newG < neighbors[i].gScore) {
                            neighbors[i].cameFrome = current;
                            neighbors[i].gScore = newG;
                            neighbors[i].fScore = newG + heuristicCost(neighbors[i].pos, goalPos);
                        }
                    }
                }
            } else if (openSet.length === 0 && !found) {
                console.log("Failed to find a way to the goal");
                noLoop();
            } else {
                console.log("Found the way to the goal");
                noLoop();
            }


            // Draw greed
            for(let i = 0; i < cols; i++){
                for(let j = 0; j < rows; j++){
                    greed[i][j].draw2();
                }
            }

            fill(200, 50, 200);
            rect(startPos.x*cellSize, startPos.y*cellSize, cellSize, cellSize);

            fill(50, 200, 50);
            rect(goalPos.x*cellSize, goalPos.y*cellSize, cellSize, cellSize);

            beginShape();
            noStroke();
            noFill();
            strokeWeight(current.size/2);
            stroke(200, 50, 50);
            vertex(current.pos.x*current.size + current.size/2, current.pos.y*current.size + current.size/2);
            //rect(current.pos.x*current.size, current.pos.y*current.size, current.size, current.size);

            let next = current.cameFrome;
            while(next != null){
                vertex(next.pos.x*next.size + next.size/2, next.pos.y*next.size + next.size/2);
                //rect(next.pos.x*next.size, next.pos.y*next.size, next.size, next.size);
                next = next.cameFrome;
            }
            endShape();
            break;
    }
}

function heuristicCost(pos1, pos2){
    return pos1.dist(pos2);
}

function getNeighbors(cell){
    let neighbors = [];

    if(cell.pos.x > 0){
        if(!greed[cell.pos.x-1][cell.pos.y].isWall) {
            neighbors.push(greed[cell.pos.x - 1][cell.pos.y]);
        }else{
            greed[cell.pos.x-1][cell.pos.y].evaluated = true;
        }
    }

    if(cell.pos.x > 0 && cell.pos.y < rows-1){
        if(!greed[cell.pos.x-1][cell.pos.y+1].isWall) {
            neighbors.push(greed[cell.pos.x-1][cell.pos.y+1]);
        }else{
            greed[cell.pos.x-1][cell.pos.y+1].evaluated = true;
        }
    }

    if(cell.pos.x < cols-1){
        if(!greed[cell.pos.x + 1][cell.pos.y].isWall) {
            neighbors.push(greed[cell.pos.x + 1][cell.pos.y]);
        }else{
            greed[cell.pos.x+1][cell.pos.y].evaluated = true;
        }
    }

    if(cell.pos.x < cols-1 && cell.pos.y < rows-1){
        if(!greed[cell.pos.x+1][cell.pos.y+1].isWall) {
            neighbors.push(greed[cell.pos.x+1][cell.pos.y+1]);
        }else{
            greed[cell.pos.x+1][cell.pos.y+1].evaluated = true;
        }
    }

    if(cell.pos.y > 0){
        if(!greed[cell.pos.x][cell.pos.y-1].isWall) {
            neighbors.push(greed[cell.pos.x][cell.pos.y - 1]);
        }else{
            greed[cell.pos.x][cell.pos.y-1].evaluated = true;
        }
    }

    if(cell.pos.x < cols-1 && cell.pos.y > 0){
        if(!greed[cell.pos.x+1][cell.pos.y-1].isWall) {
            neighbors.push(greed[cell.pos.x+1][cell.pos.y-1]);
        }else{
            greed[cell.pos.x+1][cell.pos.y-1].evaluated = true;
        }
    }

    if(cell.pos.y < rows-1){
        if(!greed[cell.pos.x][cell.pos.y+1].isWall) {
            neighbors.push(greed[cell.pos.x][cell.pos.y + 1]);
        }else{
            greed[cell.pos.x][cell.pos.y+1].evaluated = true;
        }
    }

    if(cell.pos.x > 0 && cell.pos.y > 0){
        if(!greed[cell.pos.x-1][cell.pos.y-1].isWall) {
            neighbors.push(greed[cell.pos.x-1][cell.pos.y-1]);
        }else{
            greed[cell.pos.x-1][cell.pos.y-1].evaluated = true;
        }
    }

    return neighbors;
}

function keyPressed(){
    if(keyCode === 13){
        actualPos = startPos.copy();
        greed[startPos.x][startPos.y].isWall = false;
        greed[goalPos.x][goalPos.y].isWall = false;

        openSet.push(greed[startPos.x][startPos.y]);

        greed[startPos.x][startPos.y].gScore = 0;
        greed[startPos.x][startPos.y].fScore = greed[startPos.x][startPos.y].gScore + heuristicCost(startPos, goalPos);

        state = 1;
    }
}

function mousePressed(){
    if(Math.floor(mouseX/cellSize) >= 0 && Math.floor(mouseX/cellSize) < cols &&
        Math.floor(mouseY/cellSize) >= 0 && Math.floor(mouseY/cellSize) < rows){
        if(Math.floor(mouseX/cellSize) === startPos.x && Math.floor(mouseY/cellSize) === startPos.y){
            selected = 1;
        }else if(Math.floor(mouseX/cellSize) === goalPos.x && Math.floor(mouseY/cellSize) === goalPos.y){
            selected = 2;
        }
    }
}

function mouseReleased(){
    if(Math.floor(mouseX/cellSize) >= 0 && Math.floor(mouseX/cellSize) < cols &&
        Math.floor(mouseY/cellSize) >= 0 && Math.floor(mouseY/cellSize) < rows){
        if(selected > 0){
            switch (selected){
                case 1:
                    startPos.x = Math.floor(mouseX/cellSize);
                    startPos.y = Math.floor(mouseY/cellSize);
                    break;
                case 2:
                    goalPos.x = Math.floor(mouseX/cellSize);
                    goalPos.y = Math.floor(mouseY/cellSize);
                    break;
            }
        }
        selected = -1;
    }
}
