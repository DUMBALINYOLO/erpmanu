import {
        GET_DEACTIVATED_CUSTOMERS
    } from '../types/deactivatedcustomerTypes';

const initialState = {
    deactivatedcustomers: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_DEACTIVATED_CUSTOMERS:
            return {
                ...state,
                deactivatedcustomers: action.payload
            };
        default:
            return state;
    }
}
