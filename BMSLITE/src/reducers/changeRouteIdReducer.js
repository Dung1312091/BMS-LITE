import {CHANGE_ROUTE_ID} from '../actions/actionTypes';
import moment from 'moment';
const initialState = {};

const changeRouteReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ROUTE_ID:
           return state.route_id = action.route_id;
        default:
            return state;
    }
}
export default changeRouteReducer;