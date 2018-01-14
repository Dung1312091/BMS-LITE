import { GET_CONFIGURATION_OVWERVIEW, GET_CONFIGURATION_OVWERVIEW_SUCCESS, GET_CONFIGURATION_OVWERVIEW_FAIL} 
from '../actions/actionTypes';
import { Api } from '../utils/loginApi';
//Saga effects
import { put, takeLatest,call  } from 'redux-saga/effects';
function* getConfigurationOverviewSagas(action) {
    try {
        const response = yield Api.CallAPI('https://api-sandbox.vexere.com/v1/', 'configuration_overview', 'GET', action.params); 
        console.log('response==>',response);
        if (response.status === 200) {
            let data = JSON.parse(response._bodyInit);
            yield put({ type: GET_CONFIGURATION_OVWERVIEW_SUCCESS, data: data});
        }   
    } catch (error) {        
        yield put({ type: GET_CONFIGURATION_OVWERVIEW_FAIL, data: error});
    }
}
export function* watchGetConfigurationOverviewSagas() { 
    yield takeLatest (GET_CONFIGURATION_OVWERVIEW, getConfigurationOverviewSagas);
}