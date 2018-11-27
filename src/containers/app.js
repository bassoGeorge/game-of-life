import {connect} from 'react-redux'
import {setCurrentGrid, setInitialGrid} from '../store/actions'
import {App} from '../components/app'

export const mapStateToProps = state => ({
	grid: state.currentGrid
});

export const mapDispatchToProps = dispatch => ({
	setInitialGrid: grid => dispatch(setInitialGrid(grid)),
	setCurrentGrid: grid => dispatch(setCurrentGrid(grid))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
