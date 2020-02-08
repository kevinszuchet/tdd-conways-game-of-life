import assert from "assert";
import GameOfLife from "./index";

describe("GameOfLife", () => {
    it("is created correctly", () => {
        const gameOfLife = new GameOfLife();
        assert.ok(gameOfLife.aliveCellsIsEmpty())
    });

    it("alive cell with less that 2 alive cells dies", () => {
        const gameOfLife = new GameOfLife([{ x: 1, y: 1 }]).ofSize({ x: 3, y: 3 });
        gameOfLife.calculateNextGeneration();
        assert.ok(gameOfLife.isDead({ x: 1, y: 1 }));
    });

    it("alive cell with two alive neighbors survives", () => {
        const gameOfLife = new GameOfLife([{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }]).ofSize({ x: 3, y: 3 });
        gameOfLife.calculateNextGeneration();
        assert.ok(gameOfLife.isAlive({ x: 1, y: 1 }));
    });

    it("alive cell with three alive neighbors survives", () => {
        const gameOfLife = new GameOfLife([{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }]).ofSize({ x: 3, y: 3 });
        gameOfLife.calculateNextGeneration();
        assert.ok(gameOfLife.isAlive({ x: 1, y: 1 }));
    });

    it.skip("alive cell with more than three alive neighbors dies", () => {
        const gameOfLife = new GameOfLife([{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 3 }]).ofSize({ x: 3, y: 3 });
        gameOfLife.calculateNextGeneration();
        assert.ok(gameOfLife.isDead({ x: 2, y: 2 }));
    });

    it("dead cell with three alive neighbors becomes alive", () => {
        const gameOfLife = new GameOfLife([{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }]).ofSize({ x: 3, y: 3 });
        gameOfLife.calculateNextGeneration();
        assert.ok(gameOfLife.isAlive({ x: 2, y: 2 }));
    });
});

