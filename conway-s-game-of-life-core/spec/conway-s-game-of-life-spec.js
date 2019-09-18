var ConwaysGameOfLife = require('../conway-s-game-of-life').ConwaysGameOfLife;

var dimension = 3;

describe("The universe of the Game of Life", function () {
  var game;

  beforeEach(function () {
    game = new ConwaysGameOfLife(dimension);
  });

  describe("is finite", function () {
    it("minimum of index is 0", function () {
      expect(function () { game.getState(-1, -1) }).toThrowError();
    });

    it("maximum of index is dimension - 1", function () {
      expect(function () { game.getState(3, 3) }).toThrowError();
    });
  });

  xit("is infinite", function () {
    // The universe of the Game of Life is infinite
  });

  it("is a two-dimensional orthogonal grid of square cells", function () {
    expect(function () { game.getState(0, 0) }).not.toThrowError();
    expect(function () { game.getState(dimension - 1, dimension - 1) }).not.toThrowError();
  });

  describe("each of which (cells) is in one of two possible states", function () {
    it("alive", function () {
      game.setState(0, 0, game.ALIVE);
      expect(game.getState(0, 0)).toBe(game.ALIVE);
    });

    it("dead", function () {
      game.setState(0, 0, game.DEAD);
      expect(game.getState(0, 0)).toBe(game.DEAD);
    });
  });

});

describe("Every cell interacts with its eight neighbours", function () {
  var game;

  beforeEach(function () {
    game = new ConwaysGameOfLife(dimension);
  });

  it("which are the cells that are horizontally adjacent", function () {
    game.setState(1, 0, game.ALIVE);
    game.setState(1, 1, game.ALIVE);
    game.setState(1, 2, game.ALIVE);
    expect(game.countNeighbours(1, 1)).toBe(2);
  });

  it("which are the cells that are vertically adjacent", function () {
    game.setState(0, 1, game.ALIVE);
    game.setState(1, 1, game.ALIVE);
    game.setState(2, 1, game.ALIVE);
    expect(game.countNeighbours(1, 1)).toBe(2);
  });

  it("which are the cells that are diagonally adjacent", function () {
    game.setState(0, 0, game.ALIVE);
    game.setState(0, 2, game.ALIVE);
    game.setState(2, 2, game.ALIVE);
    game.setState(2, 0, game.ALIVE);
    game.setState(1, 1, game.ALIVE);
    expect(game.countNeighbours(1, 1)).toBe(4);
  });
});

describe("Any live cell", function () {
  var game;

  beforeEach(function () {
    game = new ConwaysGameOfLife(dimension);
  });

  describe("with fewer than two live neighbours dies, as if by underpopulation", function () {
    it("zero neighbour", function () {
      game.setAlive(1, 1);
      game.step();
      expect(game.isAlive(1, 1)).toBe(false);
    });

    it("one neighbour", function () {
      game.setAlive(1, 1);
      game.setAlive(1, 2);
      game.step();
      expect(game.isAlive(1, 1)).toBe(false);
      expect(game.isAlive(1, 2)).toBe(false);
    });
  });

  describe("with two or three live neighbours lives on to the next generation", function () {
    it("with two neighbours", function () {
      game.setAlive(1, 0);
      game.setAlive(1, 1);
      game.setAlive(1, 2);
      game.step();
      expect(game.isAlive(1, 1)).toBe(true);
    });

    it("with three neighbours", function () {
      game.setAlive(1, 0);
      game.setAlive(1, 1);
      game.setAlive(1, 2);
      game.setAlive(2, 1);
      game.step();
      expect(game.isAlive(1, 1)).toBe(true);
    });
  });

  describe("with more than three live neighbours dies, as if by overpopulation", function () {
    it("with four neighbours", function () {
      game.setAlive(0, 1);
      game.setAlive(1, 0);
      game.setAlive(1, 1);
      game.setAlive(1, 2);
      game.setAlive(2, 1);
      game.step();
      expect(game.isAlive(1, 1)).toBe(false);
    });
  });
});

describe("Any dead cell", function () {
  var game;

  beforeEach(function () {
    game = new ConwaysGameOfLife(dimension);
  });


  describe("with exactly three live neighbours becomes a live cell, as if by reproduction", function () {
    it("with two neighbours", function () {
      game.setAlive(1, 0);
      game.setAlive(1, 2);
      game.step();
      expect(game.isAlive(1, 1)).toBe(false);
    });

    it("with three neighbours", function () {
      game.setAlive(1, 0);
      game.setAlive(1, 2);
      game.setAlive(2, 1);
      game.step();
      expect(game.isAlive(1, 1)).toBe(true);
    });

    it("with four neighbours", function () {
      game.setAlive(0, 1);
      game.setAlive(1, 0);
      game.setAlive(1, 2);
      game.setAlive(2, 1);
      game.step();
      expect(game.isAlive(1, 1)).toBe(false);
    });
  });
});