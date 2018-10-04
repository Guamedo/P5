class AStar{
    constructor(map){
        this.greed = [];
        this.cols = map.cols;
        this.rows = map.rows;

        for(let i = 0; i < this.cols; i++){
            let row = [];
            for(let j = 0; j < this.rows; j++){
                let ch = map.mapData[j][i];
                if(ch === '#'){
                    row.push(new Cell(i, j, true));
                }else{
                    row.push(new Cell(i, j, false));
                }
            }
            this.greed.push(row);
        }
    }

    findPath(startPos, goalPos){
        let openSet = [];
        let found = false;
        let current;

        this.greed = [];
        for(let i = 0; i < this.cols; i++){
            let row = [];
            for(let j = 0; j < this.rows; j++){
                let ch = map.mapData[j][i];
                if(ch === '#'){
                    row.push(new Cell(i, j, true));
                }else{
                    row.push(new Cell(i, j, false));
                }
            }
            this.greed.push(row);
        }

        openSet.push(this.greed[startPos.x][startPos.y]);

        this.greed[startPos.x][startPos.y].gScore = 0;
        this.greed[startPos.x][startPos.y].fScore = this.greed[startPos.x][startPos.y].gScore + this.heuristicCost(startPos, goalPos);

        while(openSet.length > 0 && !found) {

            openSet.sort(function (a, b) {
                return b.fScore - a.fScore;
            });
            current = openSet.pop();

            if (current.pos.x === goalPos.x && current.pos.y === goalPos.y) {
                found = true;
            }
            current.visited = true;
            let neighbors = this.getNeighbors(current);
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
                        neighbors[i].fScore = newG + this.heuristicCost(neighbors[i].pos, goalPos);
                    }
                }
            }
        }

        if(!found){
            return null;
        }else{
            return current;
        }
    }

    heuristicCost(pos1, pos2){
        return (Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y));
    }

    getNeighbors(cell){
        let neighbors = [];

        if(cell.pos.x > 0){
            if(!this.greed[cell.pos.x-1][cell.pos.y].isWall) {
                neighbors.push(this.greed[cell.pos.x - 1][cell.pos.y]);
            }
        }

        if(cell.pos.x < this.cols-1){
            if(!this.greed[cell.pos.x + 1][cell.pos.y].isWall) {
                neighbors.push(this.greed[cell.pos.x + 1][cell.pos.y]);
            }
        }

        if(cell.pos.y > 0){
            if(!this.greed[cell.pos.x][cell.pos.y-1].isWall) {
                neighbors.push(this.greed[cell.pos.x][cell.pos.y - 1]);
            }
        }

        if(cell.pos.y < this.rows-1){
            if(!this.greed[cell.pos.x][cell.pos.y+1].isWall) {
                neighbors.push(this.greed[cell.pos.x][cell.pos.y + 1]);
            }
        }
        return neighbors;
    }
}



