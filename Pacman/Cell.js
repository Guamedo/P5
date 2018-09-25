class Cell{
    constructor(i, j, isWall){
        this.pos = createVector(i, j);
        let r = random(1);
        this.isWall = isWall;

        this.cameFrome = null;
        this.fScore = Infinity;
        this.gScore = Infinity;

        this.visited = false;
        this.evaluated = false;
    }
}