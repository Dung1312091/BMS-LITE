import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL} from './actionTypes';

export const LoginAction = (account) => {
    console.log('LoginAction===>',account);
    return {
        type: LOGIN,
        account
    }
}

//Action sent by Redux-saga
export const LoginSuccess = (result) => {
    return {
        type: LOGIN_SUCCESS,
        result
    }
}

export const LoginFail = (error) => {
    return {
        type: LOGIN_FAIL,
        error
    }
}