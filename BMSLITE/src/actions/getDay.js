import { GET_TODAY, SELECT_TODAY, NEXT_TODAY } from './actionTypes';
export const getToday = () => {
    return {
        type: GET_TODAY
    }
}
export const selectDay = (date) => {
    return {
        type: SELECT_TODAY,
        date
    }
}