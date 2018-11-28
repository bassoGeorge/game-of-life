import {cloneGrid} from '../utils/utils'

export const SET_INITIAL_GRID = "SET_INITIAL_GRID";
export const SET_CURRENT_GRID = "SET_CURRENT_GRID";
export const START_GAME       = "START_GAME";
export const END_GAME         = "END_GAME";
export const DUMMY            = "DUMMY";

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

export const startGame = () => ({
	type   : START_GAME,
	payload: {}
})

export const endGame = () => ({
	type   : END_GAME,
	payload: {}
})
