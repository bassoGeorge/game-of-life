/*
	The data structure:
	grid: [[Boolean]]
	The grid system is transposed so that it is an array of columns
 */

export const isAlive = cell => cell // So that if the cell format changes in the future, we can work with that
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

export const countAlive = cells => cells.reduce((acc, i) => acc + isAlive(i), 0); // we rely on Boolean to integer conversion

export const shouldGridCellLive = grid => (x, y) => {
	const liveNeighborCount = countAlive(findNeighbors(grid)(x,y))

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
