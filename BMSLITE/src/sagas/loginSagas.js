import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,call  } from 'redux-saga/effects';
function* LoginSagas(action) {
    try {
        console.log('action===>',action);
        // const respone = yield Api.getMoviesFromApi();  
        yield put({ type: LOGIN_SUCCESS, account: action.account });     
    } catch (error) {        
        yield put({ type: LOGIN_FAIL, account: false });
    }
}
export function* watchLoginSagas() { 
    console.log('eo chay la sao bay');
    yield takeLatest (LOGIN, LoginSagas);
}