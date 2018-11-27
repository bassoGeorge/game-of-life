import {preferablyNegativeRandomBoolean} from './utils'

export const random1 = [
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, true, true, true, false, false, false, false, false, false],
	[false, false, false, true, false, false, false, false, false, false],
	[true, false, true, false, false, false, true, true, false, false],
	[true, false, false, false, false, false, true, true, false, false],
	[false, true, true, true, false, false, false, false, true, true],
	[false, false, true, false, false, false, false, false, true, true],
	[false, false, true, true, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
]

export const spaceShip = [
	[false, false, true, false, false, false, false, false, false, false],
	[true, false, true, false, false, false, false, false, false, false],
	[false, true, true, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
]

export const generateRandomGrid = (rows, cols) => {
	const grid = [];
	for (let x = 0; x < rows; x++) {
		const row = [];
		for (let y = 0; y < cols; y++) {
			row.push(preferablyNegativeRandomBoolean());
		}
		grid.push(row);
	}
	return grid;
}
