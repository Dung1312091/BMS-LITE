import { combineReducers } from 'redux';
import loginReducers from './loginReducer';
import getDayReducers from './getDayReducer';
import getTripReducers from './getTripsReducer';
const allReducers = combineReducers({
  loginReducers,
  getDayReducers
});
export default allReducers;