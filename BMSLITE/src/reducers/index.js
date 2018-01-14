import { combineReducers } from 'redux';
import loginReducers from './loginReducer';
import getDayReducers from './getDayReducer';
import getConfigurationOverview from './configurationOverviewReducer';
const allReducers = combineReducers({
  loginReducers,
  getDayReducers,
  getConfigurationOverview
});
export default allReducers;