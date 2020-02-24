import React, {Fragment} from 'react'
import {Cell} from './cell'
import playGameOfLife from '../game'
import {GAME_SPEED_INTERVAL} from '../utils/constants'
import {generateRandomGrid, spaceShip} from '../utils/game-configurations'
import GlobalStyles from './GlobalStyles'
import styled from 'styled-components'

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const GameGrid = styled.div`
	display: flex;
	flex-direction: column;
`

const GameGridRow = styled.div`
	display: flex;
	flex-grow: 1;
`

const GameControls = styled.div`
	margin-top: 40px;
	display: flex;
	width: 100%;
`

const GameControlButton = styled.button`
	font-size: 20px;
	border: 1px solid darkslategrey;
	background: none;
	padding: 16px 40px;
	flex-grow: 1;
`

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
		this.props.setInitialGrid(generateRandomGrid(40, 80));
		//this.props.setInitialGrid(spaceShip);
	}


	startGame() {
		if (this.state.isGameRunning) return;
		this.setState({isGameRunning: true});
		this.game = playGameOfLife(false)(this.props.grid);
		this.run()
		this.gameTimer = setInterval(this.run, GAME_SPEED_INTERVAL)
	}

	stopGame() {
		clearInterval(this.gameTimer);
		this.setState({isGameRunning: false});
		this.gameTimer = null;
	}

	run() {
		this.props.setCurrentGrid(this.game())
	}

	render() {
		return (
			<Fragment>
				<GlobalStyles/>
				<h1>Conway's Game of Life</h1>
				<AppContainer>
					<GameGrid>
						{this.props.grid.map(row => <GameGridRow>
							{row.map(cellState => <Cell isAlive={cellState}/>)}
						</GameGridRow>)}
					</GameGrid>
					<GameControls>
						<GameControlButton onClick={this.startGame}>Start</GameControlButton>
						<GameControlButton onClick={this.stopGame}>Stop</GameControlButton>
					</GameControls>
				</AppContainer>
			</Fragment>
		)
	}
}
