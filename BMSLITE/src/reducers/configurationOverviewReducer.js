import { GET_CONFIGURATION_OVWERVIEW, GET_CONFIGURATION_OVWERVIEW_SUCCESS, GET_CONFIGURATION_OVWERVIEW_FAIL} 
from '../actions/actionTypes';
const initialState ={};
const getConfigurationOverview = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONFIGURATION_OVWERVIEW_SUCCESS:
        // console.log('action==>',action);
            return action.data;
        default:
            return state;
    }
}
export default getConfigurationOverview;