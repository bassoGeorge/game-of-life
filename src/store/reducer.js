import {SET_CURRENT_GRID, SET_INITIAL_GRID} from './actions'

export const defaultState = {
	initialGrid: [],
	currentGrid: []
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

		default:
			return state;
	}
}
