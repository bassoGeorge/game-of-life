import {cloneGrid} from '../utils/utils'

export const SET_INITIAL_GRID = "SET_INITIAL_GRID";
export const SET_CURRENT_GRID = "SET_CURRENT_GRID";

export const setInitialGrid = grid => ({
	type   : SET_INITIAL_GRID,
	payload: {
		grid: cloneGrid(grid)
	}
})

export const setCurrentGrid = grid => ({
	type   : SET_CURRENT_GRID,
	payload: {
		grid
	}
})
