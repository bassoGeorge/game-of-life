import React, {Fragment} from 'react'
import {Cell} from './cell'
import playGameOfLife from '../game'

const spaceShipSetting = [
	[false, false, true, false, false, false, false, false, false, false],
	[true, false, true, false, false, false, false, false, false, false],
	[false, true, true, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
]

const randomGrid = [
	[false, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
	[false, true , true , true , false, false, false, false, false, false],
	[false, false, false, true , false, false, false, false, false, false],
	[true , false, true , false, false, false, true , true , false, false],
	[true , false, false, false, false, false, true , true , false, false],
	[false, true , true , true , false, false, false, false, true , true ],
	[false, false, true , false, false, false, false, false, true , true ],
	[false, false, true , true , false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false, false],
]
export class App extends React.Component {
	constructor(props) {

		super(props);
		this.state = {
			grid: randomGrid
		}

		this.gameTimer = null;
		this.game = playGameOfLife(this.state.grid);
		this.startGame = this.startGame.bind(this);
		this.stopGame = this.stopGame.bind(this);
		this.run = this.run.bind(this);
	}

	startGame() {
		this.run()
		this.gameTimer = setInterval(this.run, 100)
	}

	stopGame() {
		clearInterval(this.gameTimer);
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
