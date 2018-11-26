import React from 'react'

export class Cell extends React.PureComponent {
	render() {
		return (
			<div className={`cell cell--${this.props.isAlive ? 'alive' : 'dead'}`}>
				<div className="cell__dot"/>
			</div>
		)
	}
}
