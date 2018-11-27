/*
	The data structure:
	grid: [[Boolean]]
	The grid system is transposed so that it is an array of columns
 */

import {cloneGrid} from './utils/utils'

export const isAlive  = cell => cell // So that if the cell format changes in the future, we can work with that
export const deadCell = () => false;
export const liveCell = () => true;

export const getNeighborsInCol = isItemInCol => (col, y) => {
	const neighbors = [];
	if (y - 1 >= 0) neighbors.push(col[y - 1]);
	if (!isItemInCol) neighbors.push(col[y]);
	if (y + 1 < col.length) neighbors.push(col[y + 1]);
	return neighbors;
}

export const neighborsInColWithItem    = getNeighborsInCol(true)
export const neighborsInColWithoutItem = getNeighborsInCol(false)

export const findNeighbors = grid => (x, y) => {
	return [
		...(x - 1 >= 0 ? neighborsInColWithoutItem(grid[x - 1], y) : []),
		...neighborsInColWithItem(grid[x], y),
		...(x + 1 < grid.length ? neighborsInColWithoutItem(grid[x + 1], y) : []),
	];
}

export const countAlive = cells => cells.reduce((acc, i) => acc + isAlive(i), 0); // we rely on Boolean to integer
                                                                                  // conversion

export const shouldGridCellLive = grid => (x, y) => {
	const liveNeighborCount = countAlive(findNeighbors(grid)(x, y))

	// Short logic for the rules for cell lives
	return liveNeighborCount === 3 || (isAlive(grid[x][y]) && liveNeighborCount === 2)
}

export const calculateNextGeneration = grid => {
	const shouldCellLive = shouldGridCellLive(grid);

	return grid.map((col, x) =>
		col.map((cell, y) =>
			shouldCellLive(x, y) ? liveCell() : deadCell()
		)
	);
}

/* And now, ladies and gentlemen, put your hands together for the main act of the night!
* Just for the fun of it, have used a es6 generator variant and the regular closure variant
* */

export function* playGameOfLife_gen(startingGrid) {
	// Complicated function switch so that the first call gives the original grid,
	// then we permanently switch to calculating the next grid without any conditions henceforth

	let fn = grid => {
		fn = calculateNextGeneration
		return cloneGrid(grid) // Just a clone for the first time
	}

	let currentGrid = startingGrid;
	while (true) {
		currentGrid = fn(currentGrid);
		yield currentGrid;
	}
}

export const playGameOfLife = startingGrid => {
	// Complicated function switch so that the first call gives the original grid,
	// then we permanently switch to calculating the next grid without any conditions henceforth

	let fn          = grid => {
		fn = calculateNextGeneration
		return grid.map(col => [...col]) // Just a clone for the first time
	}
	let currentGrid = startingGrid;
	return () => {
		currentGrid = fn(currentGrid);
		return currentGrid;
	}
}

export default playGameOfLife
