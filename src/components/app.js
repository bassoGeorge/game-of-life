import React, {Fragment} from 'react'
import {Cell} from './cell'
import playGameOfLife from '../game'
import {GAME_SPEED_INTERVAL} from '../utils/constants'
import {spaceShip} from '../utils/game-configurations'

export class App extends React.Component {
	constructor(props) {

		super(props);
		this.state = {
			grid: spaceShip
		}

		this.gameTimer = null;
		this.game      = playGameOfLife(this.state.grid);
		this.startGame = this.startGame.bind(this);
		this.stopGame  = this.stopGame.bind(this);
		this.run       = this.run.bind(this);
	}

	startGame() {
		if (this.gameTimer !== null) return;
		this.run()
		this.gameTimer = setInterval(this.run, GAME_SPEED_INTERVAL)
	}

	stopGame() {
		clearInterval(this.gameTimer);
		this.gameTimer = null;
	}

	run() {
		this.setState({
			grid: this.game()
		});
	}

	render() {
		return (
			<Fragment>
				<h1>Conway's Game of Life</h1>
				<div className="app-container">
					<div className="game-grid">
						{this.state.grid.map(row => <div className="game-grid__row">
							{row.map(cellState => <Cell isAlive={cellState}/>)}
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
