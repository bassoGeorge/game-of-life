import {connect} from 'react-redux'
import {endGame, setCurrentGrid, setInitialGrid, startGame} from '../store/actions'
import {App} from '../components/app'

export const mapStateToProps = state => ({
	grid: state.currentGrid
});

export const mapDispatchToProps = dispatch => ({
	setInitialGrid: grid => dispatch(setInitialGrid(grid)),
	setCurrentGrid: grid => dispatch(setCurrentGrid(grid)),
	startGame     : () => dispatch(startGame()),
	endGame       : () => dispatch(endGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
