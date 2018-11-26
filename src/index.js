import React from 'react'
import ReactDOM from 'react-dom'

import "./assets/scss/App.scss"
import {App} from './components/app'

const wrapper = document.getElementById("app")
wrapper && ReactDOM.render(<App />, wrapper)
