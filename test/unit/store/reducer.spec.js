import {expect} from '../helpers/chai-plugged-in'
import {SET_CURRENT_GRID, SET_INITIAL_GRID} from '../../../src/store/actions'
import reducer from '../../../src/store/reducer'

describe("Reducer", () => {
	const defaultState = {
		initialGrid: [],
		currentGrid: []
	}

	it("should return the initial state when setup", () => {
		expect(reducer(defaultState, {type: null})).to.equal(defaultState)
	})

	it("should handle SET_INITIAL_GRID by saving the given initialGrid to state", () => {
		const grid          = [
			      [1, 2],
			      [3, 4]
		      ],
		      action        = {
			      type   : SET_INITIAL_GRID,
			      payload: {
				      grid
			      }
		      },
		      expectedState = {...defaultState, initialGrid: grid, currentGrid: grid}

		expect(reducer(defaultState, action)).to.eql(expectedState)
	})

	it("should handle SET_CURRENT_GRID by saving the given currentGrid to state", () => {
		const grid          = [
			      [1, 2],
			      [3, 4]
		      ],
		      action        = {
			      type   : SET_CURRENT_GRID,
			      payload: {
				      grid
			      }
		      },
		      expectedState = {...defaultState, currentGrid: grid}

		expect(reducer(defaultState, action)).to.eql(expectedState)
	})


})
