import { CHANGE_ROUTE_ID } from './actionTypes';
import {storeToken, getToken} from '../utils/AsyncStorage';
const ROUTE_ID = 'route_id';
export const changeRouteId = (route_id) => {
    storeToken(ROUTE_ID,route_id);
    return {
        type: CHANGE_ROUTE_ID,
        route_id,
    }
}