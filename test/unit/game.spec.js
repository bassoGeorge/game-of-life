import {expect} from './helpers/chai-plugged-in'
import {
	calculateNextGeneration,
	countAlive,
	findNeighbors,
	getNeighborsInCol, playGameOfLife,
	playGameOfLife_gen,
	shouldGridCellLive
} from '../../src/game'

describe("Game: the game core", () => {

	describe("getNeighborsInCol", () => {

		it("should get the neighbors of the given cell for a column when item at start", () => {
			const col = ['T', 'b', 'c']
			expect(getNeighborsInCol(true)(col, 0)).to.eql(['b'])
		})

		it("should get the neighbors of the given cell for a column when the item is at the end", () => {
			const col = ['a', 'b', 'c', 'T']
			expect(getNeighborsInCol(true)(col, 3)).to.eql(['c']);
		})

		it("should get the neighbors of the given cell for a column when the item is in the middle", () => {
			const col = ['a', 'b', 'T', 'd']
			expect(getNeighborsInCol(true)(col, 2)).to.eql(['b', 'd']);
		})

		it("should get the neighbors of the given cell for a column when item is parallel to start", () => {
			const col = ['a', 'b', 'c']
			expect(getNeighborsInCol(false)(col, 0)).to.eql(['a', 'b'])
		})

		it("should get the neighbors of the given cell for a column when the item is parallel to the end", () => {
			const col = ['a', 'b', 'c', 'd']
			expect(getNeighborsInCol(false)(col, 3)).to.eql(['c', 'd']);
		})

		it("should get the neighbors of the given cell for a column when the item is parallel to the middle", () => {
			const col = ['a', 'b', 'c', 'd']
			expect(getNeighborsInCol(false)(col, 2)).to.eql(['b', 'c', 'd']);
		})


	})

	describe("findNeighbors", () => {

		it("should get the neighbors of the given cell for grid when the item is on top left corner", () => {
			const grid = [
				['T', 'b', 'c'],
				['e', 'f', 'g']
			]
			expect(findNeighbors(grid)(0, 0)).to.eql(['b', 'e', 'f']);
		})

		it("should get the neighbors of the given cell for grid when the item is on top right corner", () => {
			const grid = [
				['a', 'b', 'c', 'T'],
				['e', 'f', 'g', 'h']
			]
			expect(findNeighbors(grid)(0, 3)).to.eql(['c', 'g', 'h']);
		})

		it("should get the neighbors of the given cell for grid when the item is on top edge", () => {
			const grid = [
				['a', 'T', 'c', 'd'],
				['e', 'f', 'g', 'h']
			]
			expect(findNeighbors(grid)(0, 1)).to.eql(['a', 'c', 'e', 'f', 'g']);
		})

		it("should get the neighbors of the given cell for grid when the item is on bottom left corner", () => {
			const grid = [
				['a', 'b', 'c'],
				['T', 'f', 'g']
			]
			expect(findNeighbors(grid)(1, 0)).to.eql(['a', 'b', 'f']);
		})

		it("should get the neighbors of the given cell for grid when the item is on bottom right corner", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'f', 'g', 'T']
			]
			expect(findNeighbors(grid)(1, 3)).to.eql(['c', 'd', 'g']);
		})

		it("should get the neighbors of the given cell for grid when the item is on bottom edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'T', 'g', 'h']
			]
			expect(findNeighbors(grid)(1, 1)).to.eql(['a', 'b', 'c', 'e', 'g']);
		})

		it("should get the neighbors of the given cell for grid when the item is on left edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['T', 'f', 'g', 'h'],
				['i', 'j', 'k', 'l']
			]
			expect(findNeighbors(grid)(1, 0)).to.eql(['a', 'b', 'f', 'i', 'j']);
		})

		it("should get the neighbors of the given cell for grid when the item is on right edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'f', 'g', 'T'],
				['i', 'j', 'k', 'l'],
				['m', 'n', 'o', 'p']
			]
			expect(findNeighbors(grid)(1, 3)).to.eql(['c', 'd', 'g', 'k', 'l']);
		})

		it("should get the neighbors of the given cell for grid when the item is in the middle", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'T', 'g', 'h'],
				['i', 'j', 'k', 'l'],
				['m', 'n', 'o', 'p']
			]
			expect(findNeighbors(grid)(1, 1)).to.eql(['a', 'b', 'c', 'e', 'g', 'i', 'j', 'k']);
		})

	})

	describe("countAlive", () => {
		it("should give the number of cells alive for the given cell list", () => {
			const cells = [true, false, true, true, false, false, false, true];
			expect(countAlive(cells)).to.equal(4)
		})
	})

	describe("shouldGridCellLive", () => {
		it("should decide that a live cell with fewer than two live neighbors dies (underpopulation)", () => {
			const grid       = [
				[false, false, false],
				[false, true, false],
				[false, false, false]
			]
			const shouldLive = shouldGridCellLive(grid);

			expect(shouldLive(1, 1)).to.be.false;
			grid[0][1] = true;
			expect(shouldLive(1, 1)).to.be.false;
		})

		it("should decide that a live cell with more than three live neighbors dies (overpopulation)", () => {
			const grid       = [
				[true, true, false],
				[true, true, false],
				[true, false, false]
			]
			const shouldLive = shouldGridCellLive(grid);

			expect(shouldLive(1, 1)).to.be.false;
			grid[1][2] = true;
			expect(shouldLive(1, 1)).to.be.false;
			grid[2][1] = true;
			expect(shouldLive(1, 1)).to.be.false;
			grid[2][2] = true;
			expect(shouldLive(1, 1)).to.be.false;
		})

		it("should decide that a live cell with two or three live neighbors lives on", () => {
			const grid       = [
				[true, false, false],
				[false, true, false],
				[false, false, true]
			]
			const shouldLive = shouldGridCellLive(grid);

			expect(shouldLive(1, 1)).to.be.true;
			grid[2][0] = true;
			expect(shouldLive(1, 1)).to.be.true;
		})

		it("should decide that a dead cell with exactly three live neighbors becomes a live cell", () => {
			const grid       = [
				[true, false, false],
				[true, false, false],
				[false, false, true]
			]
			const shouldLive = shouldGridCellLive(grid);

			expect(shouldLive(1, 1)).to.be.true;

		})

		it("should decide that a dead cell with less than three live neighbors remains dead", () => {
			const grid       = [
				[false, false, false],
				[true, false, false],
				[false, false, true]
			]
			const shouldLive = shouldGridCellLive(grid);
			expect(shouldLive(1, 1)).to.be.false;

			grid[1][1] = false;
			expect(shouldLive(1, 1)).to.be.false;

			grid[2][2] = false;
			expect(shouldLive(1, 1)).to.be.false;

		})

		it("should decide that a dead cell with more than three live neighbors remains dead", () => {
			const grid       = [
				[true, true, true],
				[true, false, false],
				[false, false, false]
			]
			const shouldLive = shouldGridCellLive(grid);
			expect(shouldLive(1, 1)).to.be.false;

			grid[1][2] = true;
			expect(shouldLive(1, 1)).to.be.false;
			grid[2][0] = true;
			expect(shouldLive(1, 1)).to.be.false;
			grid[2][1] = true;
			expect(shouldLive(1, 1)).to.be.false;
			grid[2][2] = true;
			expect(shouldLive(1, 1)).to.be.false;

		})

	})

	describe("calculateNextGeneration", () => {
		it("should correctly calculate the next generation for a 3x3 grid", () => {
			const grid     = [
				[true, false, false],
				[false, true, false],
				[false, true, false]
			]
			const expected = [
				[false, false, false],
				[true, true, false],
				[false, false, false]
			]

			expect(calculateNextGeneration(grid)).to.eql(expected)
		})
	})

	describe("playGameOfLife_gen", () => {
		it("should return the startingGrid as the first stage", () => {
			const startingGrid = [
				[true, false],
				[false, true]
			]

			const iterator   = playGameOfLife_gen(startingGrid)
			expect(iterator.next().value).to.eql(startingGrid);
		})

		it("should return successive stages of the grid", () => {

			const startingGrid   = [
				[true, false, true],
				[false, false, true],
				[true, true, false]
			]

			const expectedStages = [
				startingGrid,
				[
					[false, true, false],
					[true, false, true],
					[false, true, false]
				],
				[
					[false, true, false],
					[true, false, true],
					[false, true, false]
				]
			]

			const iterator = playGameOfLife_gen(startingGrid);
			expectedStages.forEach(expectedStage => {
				expect(iterator.next().value).to.eql(expectedStage);
			})
		})

	})

	describe("playGameOfLife", () => {
		it("should return the startingGrid as the first stage", () => {
			const startingGrid = [
				[true, false],
				[false, true]
			]

			const gridStageGenerator   = playGameOfLife(startingGrid)
			expect(gridStageGenerator()).to.eql(startingGrid);
		})

		it("should return successive stages of the grid", () => {

			const startingGrid   = [
				[true, false, true],
				[false, false, true],
				[true, true, false]
			]

			const expectedStages = [
				startingGrid,
				[
					[false, true, false],
					[true, false, true],
					[false, true, false]
				],
				[
					[false, true, false],
					[true, false, true],
					[false, true, false]
				]
			]

			const gridStageGenerator = playGameOfLife(startingGrid);
			expectedStages.forEach(expectedStage => {
				expect(gridStageGenerator()).to.eql(expectedStage);
			})
		})

	})
})
