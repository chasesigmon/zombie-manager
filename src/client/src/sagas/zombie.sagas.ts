import axios from 'axios';
import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
  listZombiesFailed,
  listZombiesSucceeded,
  LIST_ZOMBIES_REQUEST,
} from '../redux/actions/zombie.actions';

const listZombies = () => {
  return axios(`http://localhost:3555/zombies`);
};

function* listZombiesRequested() {
  try {
    const { data } = yield call(listZombies);
    yield put(listZombiesSucceeded(data));
  } catch (e) {
    yield put(listZombiesFailed((e as Error)?.message));
  }
}

function* listZombiesWatcher() {
  yield takeLatest(
    LIST_ZOMBIES_REQUEST,
    listZombiesRequested,
  );
}

export default function* appSagas() {
  yield all([
    listZombiesWatcher(),
  ]);
}
