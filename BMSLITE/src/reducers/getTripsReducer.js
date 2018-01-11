import { GET_TRIPS, GET_TRIPS_SUCCESS, GET_TRIPS_FAIL} from '../actions/actionTypes';
const initialState ={};
const getTripReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS_SUCCESS:
        // console.log('action==>',action);
            return state.data =  action.data;
        default:
            return state;
    }
}
export default getTripReducers;