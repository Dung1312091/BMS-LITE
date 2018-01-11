import { GET_TRIPS, GET_TRIPS_SUCCESS, GET_TRIPS_FAIL} from '../actions/actionTypes';
import { Api } from '../utils/loginApi';
//Saga effects
import { put, takeLatest,call  } from 'redux-saga/effects';
function*  getTripSagas(action) {
    try {
        const respone = yield Api.CallAPI('https://api-sandbox.vexere.com/v1/', 'trip/get_trips', 'GET', action.params); 
        yield put({ type: GET_TRIPS_SUCCESS, data: respone});   
    } catch (error) {        
        yield put({ type: GET_TRIPS_FAIL, data: error});
    }
}
export function* watchGetTripSagas() { 
    // yield takeLatest (GET_TRIPS, getTripSagas);
}