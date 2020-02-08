import _ from "lodash";

export default class GameOfLife {
    constructor(aliveCells = [], boardSize) {
        this.aliveCells = aliveCells;
    }

    ofSize(boardSize) {
        this.boardSize = boardSize;
        return this;
    }

    aliveCellsIsEmpty = () => true;

    calculateNextGeneration = () => {
        this.aliveCells = _(this.boardSize.x).range()
            .map(x => _.range(this.boardSize.x).map(y => ({ x, y })))
            .flatten()
            .filter(::this._shouldSurvive)
            .value();
    };

    _shouldSurvive = cell => _.inRange(this._numberOfAliveNeighborsOf(cell), 2, 4);

    _numberOfAliveNeighborsOf = cell => this._nearestNeighbors(cell).filter(cell => this.isAlive(cell) || this._shouldBecomeAlive(cell)).length;

    _shouldBecomeAlive = cell => this.isDead(cell) && this._nearestNeighbors(cell).filter(cell => this.isAlive(cell)).length == 3;

    _nearestNeighbors = ({ x, y }) => {
        let neighbors = [];
        for (let i = x - 1; i <= Math.min(x + 1, this.boardSize.x); i++) {
            for (let j = y - 1; j <= Math.min(y + 1, this.boardSize.y); j++) {
                const neighbor = { x: i, y: j };
                if (i >= 0 && j >= 0 && !_.isEqual({ x, y }, neighbor))
                    neighbors.push(neighbor);
            }
        }
        return neighbors;
    };
    
    isAlive = cell => this.aliveCells.some(activeCell => _.isEqual(activeCell, cell));

    isDead = cell => !this.isAlive(cell);
}