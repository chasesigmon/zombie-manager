import zombieReducer, { ZombieState } from './reducers/zombie.reducer';
import zombieSagas from '../sagas/zombie.sagas';
import { combineReducers } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

/* root saga */
const rootSaga = function* () {
  yield all([fork(zombieSagas)]);
};

const store = createStore(
    combineReducers({
        zombieReducer,
    }),
  applyMiddleware(sagaMiddleware, logger),
);

/** run saga watchers */
sagaMiddleware.run(rootSaga);

export interface RootReducerState {
  zombieReducer: ZombieState;
}

export default store;
