import {combineEpics, ofType} from 'redux-observable'
import {setCurrentGrid} from './actions'
import {delay, filter, map, withLatestFrom} from 'rxjs/operators'
import {calculateNextGeneration} from '../game'

export const runGameEpic = (action$, state$) => console.log("blah") || action$.pipe(
	ofType(DUMMY),
	withLatestFrom(state$),
	filter(([, state]) => state.isGameRunning),
	delay(800),
	map(([, state]) => setCurrentGrid(calculateNextGeneration(state.currentGrid))),
	//takeUntil(action$.pipe(
	//	ofType(END_GAME)
	//))
)

export const rootEpic = combineEpics(
	runGameEpic
)
