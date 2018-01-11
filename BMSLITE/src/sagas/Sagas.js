import { fork } from 'redux-saga/effects';
import { watchLoginSagas } from './loginSagas';
import { watchGetTripSagas } from './getTripSagas';
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    fork(watchLoginSagas),
    fork(watchGetTripSagas)
  ];
}
