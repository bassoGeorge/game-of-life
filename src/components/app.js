import React, {Fragment} from 'react'
import {Cell} from './cell'
import playGameOfLife from '../game'
import {GAME_SPEED_INTERVAL} from '../utils/constants'
import {generateRandomGrid} from '../utils/game-configurations'

export class App extends React.Component {
	constructor(props) {

		super(props);
		this.state = {
			isGameRunning: false
		}

		this.gameTimer = null;
		this.startGame = this.startGame.bind(this);
		this.stopGame  = this.stopGame.bind(this);
		this.run       = this.run.bind(this);
	}

	componentDidMount() {
		this.props.setInitialGrid(generateRandomGrid(50, 80));
	}


	startGame() {
		if (this.state.isGameRunning) return;
		this.setState({isGameRunning: true});
		//this.props.startGame();
		this.game = playGameOfLife(this.props.grid);
		this.run()
		this.gameTimer = setInterval(this.run, GAME_SPEED_INTERVAL)
	}

	stopGame() {
		this.setState({isGameRunning: false});
		//this.props.endGame();

		clearInterval(this.gameTimer);
		this.gameTimer = null;
	}

	run() {
		this.props.setCurrentGrid(this.game())
	}

	render() {
		return (
			<Fragment>
				<h1>Conway's Game of Life</h1>
				<div className="app-container">
					<div className="game-grid">
						{this.props.grid.map((row, i) => <div className="game-grid__row" key={i}>
							{row.map((cellState, j) => <Cell isAlive={cellState} key={j}/>)}
						</div>)}
					</div>
					<div className="game-controls">
						<button onClick={this.startGame}>Start</button>
						<button onClick={this.stopGame}>Stop</button>
					</div>
				</div>
			</Fragment>
		)
	}
}
