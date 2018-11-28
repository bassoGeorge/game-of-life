import {END_GAME, SET_CURRENT_GRID, SET_INITIAL_GRID, START_GAME} from './actions'

export const defaultState = {
	initialGrid  : [],
	currentGrid  : [],
	isGameRunning: false
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case SET_INITIAL_GRID:
			return {
				...state,
				initialGrid: action.payload.grid,
				currentGrid: action.payload.grid
			}

		case SET_CURRENT_GRID:
			return {
				...state,
				currentGrid: action.payload.grid
			}

		case START_GAME:
			return {
				...state,
				isGameRunning: true
			}

		case END_GAME:
			return {
				...state,
				isGameRunning: false
			}

		default:
			return state;
	}
}
