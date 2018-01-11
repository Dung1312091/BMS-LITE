import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAIL, AUTHENTICATION} from '../actions/actionTypes';
import { AsyncStorage } from 'react-native';
const initialState = {
    username: null,
    status: null,
    token: null,
    isAuthentication: false
}
const loginReducers = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION_SUCCESS: {
            state.isAuthentication = true;
            state.token = action.token;
            state.trip = action.trip
            return {
                ...state
            }
        }
        case AUTHENTICATION_FAIL: {
            state.isAuthentication = false;
            state.token = null;
            return {
                ...state
            }
        }
        case LOGIN_SUCCESS:
            state.username = action.data.username;
            state.isAuthentication =true;
            state.trip = action.data.trip;
            return {
               ...state,
               user: action.data.user
            };
        case LOGIN_FAIL:
            return {
                error: action.error,
                ...state
            }
        default:
            return state;
    }
}
export default loginReducers;