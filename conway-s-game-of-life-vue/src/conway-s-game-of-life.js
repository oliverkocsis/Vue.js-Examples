export class ConwaysGameOfLife {

    constructor(dimension) {
        this.dimension = dimension;
        this.grid = new Array();
        for (let i = 0; i < this.dimension; i++) {
            let row = new Array(this.dimension);
            row.fill(ConwaysGameOfLife.STATE_DEAD);
            this.grid.push(row);
        }
    }

    setAlive(row, col) {
        this._tryIndexOutOfBoundsException(row, col);
        this.grid[row][col] = ConwaysGameOfLife.STATE_ALIVE;
    };

    isAlive(row, col) {
        this._tryIndexOutOfBoundsException(row, col);
        return this.grid[row][col] == ConwaysGameOfLife.STATE_ALIVE;
    };

    isAliveSafe(row, col) {
        return row >= 0 && row < this.dimension && col >= 0 && col < this.dimension && this.grid[row][col] == ConwaysGameOfLife.STATE_ALIVE;
    }

    countNeighbours(row, col) {
        this._tryIndexOutOfBoundsException(row, col);
        let count = 0;
        if (this.isAliveSafe(row - 1, col - 1)) count++;
        if (this.isAliveSafe(row - 1, col + 0)) count++;
        if (this.isAliveSafe(row - 1, col + 1)) count++;
        if (this.isAliveSafe(row + 0, col - 1)) count++;
        if (this.isAliveSafe(row + 0, col + 1)) count++;
        if (this.isAliveSafe(row + 1, col - 1)) count++;
        if (this.isAliveSafe(row + 1, col + 0)) count++;
        if (this.isAliveSafe(row + 1, col + 1)) count++;
        return count;
    };

    step() {
        let next = new Array();
        for (let row = 0; row < this.dimension; row++) {
            next.push(Array.from(this.grid[row]))
        }
        for (let row = 0; row < this.dimension; row++) {
            for (let col = 0; col < this.dimension; col++) {
                let count = this.countNeighbours(row, col);
                if (count < 2 || count > 3) next[row][col] = ConwaysGameOfLife.STATE_DEAD;
                else if (count == 3) next[row][col] = ConwaysGameOfLife.STATE_ALIVE;
                else if (this.grid[row][col] == ConwaysGameOfLife.STATE_ALIVE) next[row][col] = ConwaysGameOfLife.STATE_ALIVE;
            }
        }
        this.grid = next;
    };

    _tryIndexOutOfBoundsException(row, col) {
        if (row < 0 || col < 0 || row >= this.dimension || col >= this.dimension) {
            throw new Error(`Row and col shall be between 0 and ${this.dimension}`);
        };
    };
}

ConwaysGameOfLife.STATE_ALIVE = true;
ConwaysGameOfLife.STATE_DEAD = false;