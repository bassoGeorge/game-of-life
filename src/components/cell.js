import React from 'react'
import styled from 'styled-components'
import {CELL_SIZE} from './GlobalStyles'

const CellOuter = styled.div`
	border: 1px solid #eee;
	height: ${CELL_SIZE};
	width:  ${CELL_SIZE};
	${props => props.isAlive && `border: 1px solid darkslategray;`}
`

const CellDot = styled.div`
	background-color: darkslategrey;
	height: 100%;
	width: 100%;
	${props => !props.isAlive && `visibility: hidden;`}
`

export class Cell extends React.PureComponent {
	render() {
		return (
			<CellOuter isAlive={this.props.isAlive}>
				<CellDot isAlive={this.props.isAlive}/>
			</CellOuter>
		)
	}
}
