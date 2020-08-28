import {
        GET_ACTIVE_CUSTOMERS
    } from '../types/activecustomerTypes';

const initialState = {
    activecustomers: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ACTIVE_CUSTOMERS:
            return {
                ...state,
                activecustomers: action.payload
            };
        default:
            return state;
    }
}
