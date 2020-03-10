import {
	calculateNextGeneration,
	countAlive,
	findNeighbors,
	getNeighborsInCol,
	playGameOfLife,
	playGameOfLife_gen,
	shouldGridCellLive
} from '../../src/game'

describe("Game: the game core", () => {

	describe("getNeighborsInCol", () => {

		it("should get the neighbors of the given cell for a column when item at start", () => {
			const col = ['T', 'b', 'c']
			expect(getNeighborsInCol(true)(true)(col, 0)).toEqual(['b'])
		})

		it("should get the neighbors of the given cell in infinite grid for a column when item at start", () => {
			const col = ['T', 'b', 'c']
			expect(getNeighborsInCol(true)(false)(col, 0)).toEqual(['c', 'b'])
		})

		it("should get the neighbors of the given cell for a column when the item is at the end", () => {
			const col = ['a', 'b', 'c', 'T']
			expect(getNeighborsInCol(true)(true)(col, 3)).toEqual(['c']);
		})

		it("should get the neighbors of the given cell in infinite grid for a column when the item is at the end", () => {
			const col = ['a', 'b', 'c', 'T']
			expect(getNeighborsInCol(true)(false)(col, 3)).toEqual(['c', 'a']);
		})

		it("should get the neighbors of the given cell for a column when the item is in the middle", () => {
			const col = ['a', 'b', 'T', 'd']
			expect(getNeighborsInCol(true)(true)(col, 2)).toEqual(['b', 'd']);
			expect(getNeighborsInCol(true)(false)(col, 2)).toEqual(['b', 'd']);
		})

		it("should get the neighbors of the given cell for a column when item is parallel to start", () => {
			const col = ['a', 'b', 'c']
			expect(getNeighborsInCol(false)(true)(col, 0)).toEqual(['a', 'b'])
		})

		it("should get the neighbors of the given cell in infinite grid for a column when item is parallel to start", () => {
			const col = ['a', 'b', 'c']
			expect(getNeighborsInCol(false)(false)(col, 0)).toEqual(['c', 'a', 'b'])
		})

		it("should get the neighbors of the given cell for a column when the item is parallel to the end", () => {
			const col = ['a', 'b', 'c', 'd']
			expect(getNeighborsInCol(false)(true)(col, 3)).toEqual(['c', 'd']);
		})

		it("should get the neighbors of the given cell in infinite grid for a column when the item is parallel to the end", () => {
			const col = ['a', 'b', 'c', 'd']
			expect(getNeighborsInCol(false)(false)(col, 3)).toEqual(['c', 'd', 'a']);
		})

		it("should get the neighbors of the given cell for a column when the item is parallel to the middle", () => {
			const col = ['a', 'b', 'c', 'd']
			expect(getNeighborsInCol(false)(true)(col, 2)).toEqual(['b', 'c', 'd']);
			expect(getNeighborsInCol(false)(false)(col, 2)).toEqual(['b', 'c', 'd']);
		})

	})

	describe("findNeighbors", () => {

		it("should get the neighbors of the given cell for grid when the item is on top left corner", () => {
			const grid = [
				['T', 'b', 'c'],
				['e', 'f', 'g']
			]
			expect(findNeighbors(true)(grid)(0, 0)).toEqual(['b', 'e', 'f']);
		})

		it("should get the neighbors of the given cell for infinite grid when the item is on top left corner", () => {
			const grid = [
				['T', 'b', 'c', 'd'],
				['e', 'f', 'g', 'h'],
				['i', 'j', 'k', 'l']
			]
			expect(findNeighbors(false)(grid)(0, 0)).toEqual(['l', 'i', 'j', 'd', 'b', 'h', 'e', 'f']);
		})

		it("should get the neighbors of the given cell for grid when the item is on top right corner", () => {
			const grid = [
				['a', 'b', 'c', 'T'],
				['e', 'f', 'g', 'h']
			]
			expect(findNeighbors(true)(grid)(0, 3)).toEqual(['c', 'g', 'h']);
		})

		it("should get the neighbors of the given cell for infinite grid when the item is on top right corner", () => {
			const grid = [
				['a', 'b', 'c', 'T'],
				['e', 'f', 'g', 'h'],
				['i', 'j', 'k', 'l']
			]
			expect(findNeighbors(false)(grid)(0, 3)).toEqual(['k', 'l', 'i', 'c', 'a', 'g', 'h', 'e']);
		})

		it("should get the neighbors of the given cell for grid when the item is on top edge", () => {
			const grid = [
				['a', 'T', 'c', 'd'],
				['e', 'f', 'g', 'h']
			]
			expect(findNeighbors(true)(grid)(0, 1)).toEqual(['a', 'c', 'e', 'f', 'g']);
		})

		it("should get the neighbors of the given cell for infinite grid when the item is on top edge", () => {
			const grid = [
				['a', 'T', 'c', 'd'],
				['e', 'f', 'g', 'h'],
				['i', 'j', 'k', 'l']
			]
			expect(findNeighbors(false)(grid)(0, 1)).toEqual(['i', 'j', 'k', 'a', 'c', 'e', 'f', 'g']);
		})

		it("should get the neighbors of the given cell for grid when the item is on bottom left corner", () => {
			const grid = [
				['a', 'b', 'c'],
				['T', 'f', 'g']
			]
			expect(findNeighbors(true)(grid)(1, 0)).toEqual(['a', 'b', 'f']);
		})

		it("should get the neighbors of the given cell for infinite grid when the item is on bottom left corner", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'f', 'g', 'h'],
				['T', 'j', 'k', 'l']
			]
			expect(findNeighbors(false)(grid)(2, 0)).toEqual(['h', 'e', 'f', 'l', 'j', 'd', 'a', 'b']);
		})

		it("should get the neighbors of the given cell for grid when the item is on bottom right corner", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'f', 'g', 'T']
			]
			expect(findNeighbors(true)(grid)(1, 3)).toEqual(['c', 'd', 'g']);
		})

		it("should get the neighbors of the given cell for infinite grid when the item is on bottom right corner", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'f', 'g', 'h'],
				['i', 'j', 'k', 'T']
			]
			expect(findNeighbors(false)(grid)(2, 3)).toEqual(['g', 'h', 'e', 'k', 'i', 'c', 'd', 'a']);
		})

		it("should get the neighbors of the given cell for grid when the item is on bottom edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'T', 'g', 'h']
			]
			expect(findNeighbors(true)(grid)(1, 1)).toEqual(['a', 'b', 'c', 'e', 'g']);
		})

		it("should get the neighbors of the given cell for infinite grid when the item is on bottom edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'f', 'g', 'h'],
				['i', 'T', 'k', 'l']
			]
			expect(findNeighbors(false)(grid)(2, 1)).toEqual(['e', 'f', 'g', 'i', 'k', 'a', 'b', 'c']);
		})

		it("should get the neighbors of the given cell for grid when the item is on left edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['T', 'f', 'g', 'h'],
				['i', 'j', 'k', 'l']
			]
			expect(findNeighbors(true)(grid)(1, 0)).toEqual(['a', 'b', 'f', 'i', 'j']);
		})

		it("should get the neighbors of the given cell for infinite grid when the item is on left edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['T', 'f', 'g', 'h'],
				['i', 'j', 'k', 'l']
			]
			expect(findNeighbors(false)(grid)(1, 0)).toEqual(['d', 'a', 'b', 'h', 'f', 'l', 'i', 'j']);
		})

		it("should get the neighbors of the given cell for grid when the item is on right edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'f', 'g', 'T'],
				['i', 'j', 'k', 'l'],
				['m', 'n', 'o', 'p']
			]
			expect(findNeighbors(true)(grid)(1, 3)).toEqual(['c', 'd', 'g', 'k', 'l']);
		})

		it("should get the neighbors of the given cell for infinite grid when the item is on right edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'f', 'g', 'T'],
				['i', 'j', 'k', 'l'],
				['m', 'n', 'o', 'p']
			]
			expect(findNeighbors(false)(grid)(1, 3)).toEqual(['c', 'd', 'a', 'g', 'e', 'k', 'l', 'i']);
		})

		it("should get the neighbors of the given cell for grid when the item is in the middle", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'T', 'g', 'h'],
				['i', 'j', 'k', 'l'],
				['m', 'n', 'o', 'p']
			]
			expect(findNeighbors(true)(grid)(1, 1)).toEqual(['a', 'b', 'c', 'e', 'g', 'i', 'j', 'k']);
			expect(findNeighbors(false)(grid)(1, 1)).toEqual(['a', 'b', 'c', 'e', 'g', 'i', 'j', 'k']);
		})

	})

	describe("countAlive", () => {
		it("should give the number of cells alive for the given cell list", () => {
			const cells = [true, false, true, true, false, false, false, true];
			expect(countAlive(cells)).toEqual(4)
		})
	})

	describe("shouldGridCellLive", () => {
		it("should decide that a live cell with fewer than two live neighbors dies (underpopulation)", () => {
			const grid       = [
				[false, false, false],
				[false, true, false],
				[false, false, false]
			]
			const shouldLive = shouldGridCellLive(true)(grid);

			expect(shouldLive(1, 1)).toBeFalsy();
			grid[0][1] = true;
			expect(shouldLive(1, 1)).toBeFalsy();
		})

		it("should decide that a live cell with more than three live neighbors dies (overpopulation)", () => {
			const grid       = [
				[true, true, false],
				[true, true, false],
				[true, false, false]
			]
			const shouldLive = shouldGridCellLive(true)(grid);

			expect(shouldLive(1, 1)).toBeFalsy();
			grid[1][2] = true;
			expect(shouldLive(1, 1)).toBeFalsy();
			grid[2][1] = true;
			expect(shouldLive(1, 1)).toBeFalsy();
			grid[2][2] = true;
			expect(shouldLive(1, 1)).toBeFalsy();
		})

		it("should decide that a live cell with two or three live neighbors lives on", () => {
			const grid       = [
				[true, false, false],
				[false, true, false],
				[false, false, true]
			]
			const shouldLive = shouldGridCellLive(true)(grid);

			expect(shouldLive(1, 1)).toBeTruthy();
			grid[2][0] = true;
			expect(shouldLive(1, 1)).toBeTruthy();
		})

		it("should decide that a dead cell with exactly three live neighbors becomes a live cell", () => {
			const grid       = [
				[true, false, false],
				[true, false, false],
				[false, false, true]
			]
			const shouldLive = shouldGridCellLive(true)(grid);

			expect(shouldLive(1, 1)).toBeTruthy();

		})

		it("should decide that a dead cell with less than three live neighbors remains dead", () => {
			const grid       = [
				[false, false, false],
				[true, false, false],
				[false, false, true]
			]
			const shouldLive = shouldGridCellLive(true)(grid);
			expect(shouldLive(1, 1)).toBeFalsy();

			grid[1][1] = false;
			expect(shouldLive(1, 1)).toBeFalsy();

			grid[2][2] = false;
			expect(shouldLive(1, 1)).toBeFalsy();

		})

		it("should decide that a dead cell with more than three live neighbors remains dead", () => {
			const grid       = [
				[true, true, true],
				[true, false, false],
				[false, false, false]
			]
			const shouldLive = shouldGridCellLive(true)(grid);
			expect(shouldLive(1, 1)).toBeFalsy();

			grid[1][2] = true;
			expect(shouldLive(1, 1)).toBeFalsy();
			grid[2][0] = true;
			expect(shouldLive(1, 1)).toBeFalsy();
			grid[2][1] = true;
			expect(shouldLive(1, 1)).toBeFalsy();
			grid[2][2] = true;
			expect(shouldLive(1, 1)).toBeFalsy();

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

			expect(calculateNextGeneration(true)(grid)).toEqual(expected)
		})
	})

	describe("playGameOfLife_gen", () => {
		it("should return the startingGrid as the first stage", () => {
			const startingGrid = [
				[true, false],
				[false, true]
			]

			const iterator   = playGameOfLife_gen(startingGrid)
			expect(iterator.next().value).toEqual(startingGrid);
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
				expect(iterator.next().value).toEqual(expectedStage);
			})
		})

	})

	describe("playGameOfLife", () => {
		it("should return the startingGrid as the first stage", () => {
			const startingGrid = [
				[true, false],
				[false, true]
			]

			const gridStageGenerator = playGameOfLife(true)(startingGrid)
			expect(gridStageGenerator()).toEqual(startingGrid);
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

			const gridStageGenerator = playGameOfLife(true)(startingGrid);
			expectedStages.forEach(expectedStage => {
				expect(gridStageGenerator()).toEqual(expectedStage);
			})
		})

	})
})
