import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import "./assets/scss/App.scss"
import App from './containers/app'
import {store} from './store'

const wrapper = document.getElementById("app")
wrapper && ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	wrapper)
