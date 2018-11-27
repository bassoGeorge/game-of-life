import {expect} from '../helpers/chai-plugged-in'
import {SET_CURRENT_GRID, SET_INITIAL_GRID, setCurrentGrid, setInitialGrid} from '../../../src/store/actions'

describe("Actions", () => {

	it("should return correct action object for 'setInitialGrid' with a cloned version of the grid", () => {
		const grid = [[1, 2], [3, 4]];

		const action = setInitialGrid(grid);
		expect(action).to.eql({
			type   : SET_INITIAL_GRID,
			payload: {grid}
		});

		expect(action.payload.grid).to.not.equal(grid);
	})

	it("should return correct action object for 'setCurrentGrid' with the given grid", () => {
		const grid   = [[1, 2], [3, 4]];
		const action = setCurrentGrid(grid);
		expect(action).to.eql({
			type   : SET_CURRENT_GRID,
			payload: {grid}
		})

		expect(action.payload.grid).to.equal(grid)
	})

})
