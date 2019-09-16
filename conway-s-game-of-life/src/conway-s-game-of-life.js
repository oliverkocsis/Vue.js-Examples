function ConwaysGameOfLife(_dimension) {
    this.DEAD = 0;
    this.ALIVE = 1;

    this.dimension = _dimension;

    this.grid = new Array();
    for (var i = 0; i < this.dimension; i++) {
        var row = new Array(dimension);
        row.fill(this.DEAD);
        this.grid.push(row);
    }

    this.setState = function (row, col, state) {
        this._tryIndexOutOfBoundsException(row, col);
        this.grid[row][col] = state;
    };

    this.getState = function (row, col) {
        this._tryIndexOutOfBoundsException(row, col);
        return this.grid[row][col];
    };

    this.setAlive = function (row, col) {
        this._tryIndexOutOfBoundsException(row, col);
        this.grid[row][col] = this.ALIVE;
    };

    this.isAlive = function (row, col) {
        this._tryIndexOutOfBoundsException(row, col);
        return this.grid[row][col] == this.ALIVE;
    };

    this.countNeighbours = function (row, col) {
        this._tryIndexOutOfBoundsException(row, col);
        var count = 0;
        if (row > 0 && col > 0) count += this.grid[row - 1][col - 1];
        if (row > 0) count += this.grid[row - 1][col + 0];
        if (row > 0 && col < this.dimension - 1) count += this.grid[row - 1][col + 1];
        if (col > 0) count += this.grid[row + 0][col - 1];
        if (col < this.dimension - 1) count += this.grid[row + 0][col + 1];
        if (row < this.dimension - 1 && col > 0) count += this.grid[row + 1][col - 1];
        if (row < this.dimension - 1) count += this.grid[row + 1][col + 0];
        if (row < this.dimension - 1 && col < this.dimension - 1) count += this.grid[row + 1][col + 1];
        return count;
    };

    this.step = function () {
        next = new Array();
        for (row = 0; row < this.dimension; row++) {
            next.push(Array.from(this.grid[row]))
        }
        for (row = 0; row < this.dimension; row++) {
            for (col = 0; col < this.dimension; col++) {
                var count = this.countNeighbours(row, col);
                if (count < 2 || count > 3) next[row][col] = this.DEAD;
                else if (count == 3) next[row][col] = this.ALIVE;
                else if (this.grid[row][col] == this.ALIVE) next[row][col] = this.ALIVE;
            }
        }
        this.grid = next;
    };

    this._tryIndexOutOfBoundsException = function (row, col) {
        if (row < 0 || col < 0 || row >= this.dimension || col >= this.dimension) {
            throw new Error(`Row and col shall be between 0 and ${this.dimension}`);
        };
    };

    return this;
}