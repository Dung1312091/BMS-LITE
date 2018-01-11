import {GET_TODAY, SELECT_TODAY, NEXT_TODAY} from '../actions/actionTypes';
import moment from 'moment';
var day = moment();
var date = moment(day).format("DD-MM-YYYY");
const initialState = date;

const getDayReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_TODAY:
            return  (state.day = moment(day).format("DD-MM-YYYY")); 
        case SELECT_TODAY: {
            // console.log('acton.date==.',action.date)
            return action.date; 
        }
        default:
            return state;
    }
}
export default getDayReducers;