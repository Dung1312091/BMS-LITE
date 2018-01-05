import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/actionTypes';
const loginReducers = (account = [], action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        console.log('action==>',action);
            return 'ok';
        case LOGIN_FAIL:
            return 'false';
        default:
            return account;
    }
}

export default loginReducers;