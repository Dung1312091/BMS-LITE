import { GET_TRIPS, GET_TRIPS_SUCCESS, GET_TRIPS_FAIL } from './actionTypes';

export const getTrips = (params) => {
    return {
        type: GET_TRIPS,
        params
    }
}
//Action sent by Redux-saga
export const getTripSuccess = (result) => {
    return {
        type: GET_TRIPS_SUCCESS,
        result
    }
}

export const getTripSuccessFail = (error) => {
    return {
        type: GET_TRIPS_FAIL,
        error
    }
}