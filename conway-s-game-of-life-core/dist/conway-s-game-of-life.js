"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConwaysGameOfLife = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConwaysGameOfLife =
/*#__PURE__*/
function () {
  function ConwaysGameOfLife(dimension) {
    _classCallCheck(this, ConwaysGameOfLife);

    this.dimension = dimension;
    this.grid = new Array();

    for (var i = 0; i < this.dimension; i++) {
      var row = new Array(this.dimension);
      row.fill(ConwaysGameOfLife.STATE_DEAD);
      this.grid.push(row);
    }
  }

  _createClass(ConwaysGameOfLife, [{
    key: "setAlive",
    value: function setAlive(row, col) {
      this._tryIndexOutOfBoundsException(row, col);

      this.grid[row][col] = ConwaysGameOfLife.STATE_ALIVE;
    }
  }, {
    key: "isAlive",
    value: function isAlive(row, col) {
      this._tryIndexOutOfBoundsException(row, col);

      return this.grid[row][col] == ConwaysGameOfLife.STATE_ALIVE;
    }
  }, {
    key: "isAliveSafe",
    value: function isAliveSafe(row, col) {
      return row >= 0 && row < this.dimension && col >= 0 && col < this.dimension && this.grid[row][col] == ConwaysGameOfLife.STATE_ALIVE;
    }
  }, {
    key: "countNeighbours",
    value: function countNeighbours(row, col) {
      this._tryIndexOutOfBoundsException(row, col);

      var count = 0;
      if (this.isAliveSafe(row - 1, col - 1)) count++;
      if (this.isAliveSafe(row - 1, col + 0)) count++;
      if (this.isAliveSafe(row - 1, col + 1)) count++;
      if (this.isAliveSafe(row + 0, col - 1)) count++;
      if (this.isAliveSafe(row + 0, col + 1)) count++;
      if (this.isAliveSafe(row + 1, col - 1)) count++;
      if (this.isAliveSafe(row + 1, col + 0)) count++;
      if (this.isAliveSafe(row + 1, col + 1)) count++;
      return count;
    }
  }, {
    key: "step",
    value: function step() {
      var next = new Array();

      for (var row = 0; row < this.dimension; row++) {
        next.push(Array.from(this.grid[row]));
      }

      for (var _row = 0; _row < this.dimension; _row++) {
        for (var col = 0; col < this.dimension; col++) {
          var count = this.countNeighbours(_row, col);
          if (count < 2 || count > 3) next[_row][col] = ConwaysGameOfLife.STATE_DEAD;else if (count == 3) next[_row][col] = ConwaysGameOfLife.STATE_ALIVE;else if (this.grid[_row][col] == ConwaysGameOfLife.STATE_ALIVE) next[_row][col] = ConwaysGameOfLife.STATE_ALIVE;
        }
      }

      this.grid = next;
    }
  }, {
    key: "_tryIndexOutOfBoundsException",
    value: function _tryIndexOutOfBoundsException(row, col) {
      if (row < 0 || col < 0 || row >= this.dimension || col >= this.dimension) {
        throw new Error("Row and col shall be between 0 and ".concat(this.dimension));
      }

      ;
    }
  }]);

  return ConwaysGameOfLife;
}();

exports.ConwaysGameOfLife = ConwaysGameOfLife;
ConwaysGameOfLife.STATE_ALIVE = true;
ConwaysGameOfLife.STATE_DEAD = false;
//# sourceMappingURL=conway-s-game-of-life.js.map