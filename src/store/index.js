import {applyMiddleware, compose, createStore} from 'redux'
import {createEpicMiddleware} from 'redux-observable'
import reducer from './reducer'
import {rootEpic} from './epics'

export const configureStore = () => {
	const epicsMiddleware = createEpicMiddleware()

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const enhancers = composeEnhancers(
		applyMiddleware(epicsMiddleware),
	)

	const store = createStore(reducer, enhancers)
	epicsMiddleware.run(rootEpic)
	return store
}
