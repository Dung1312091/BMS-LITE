import { all,fork } from 'redux-saga/effects';
import {watchLoginSagas} from './loginSagas';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  console.log('chay root sagas');
  // yield all([
  //   watchLoginSagas,
  // ]);
  yield [
    fork(watchLoginSagas)
];
}
