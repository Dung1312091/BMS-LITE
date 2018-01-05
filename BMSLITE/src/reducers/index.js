import { combineReducers } from 'redux';
import loginReducers from './loginReducer';
const allReducers = combineReducers({
  loginReducers,
});
export default allReducers;