import { combineReducers } from 'redux';
import loginReducers from './loginReducer';
import getDayReducers from './getDayReducer';
import getConfigurationOverview from './configurationOverviewReducer';
import changeRouteReducer from './changeRouteIdReducer';
const allReducers = combineReducers({
  loginReducers,
  getDayReducers,
  getConfigurationOverview,
  changeRouteReducer
});
export default allReducers;