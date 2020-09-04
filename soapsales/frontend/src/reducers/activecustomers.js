import {
        GET_ACTIVE_CUSTOMERS,
        ADD_ACTIVE_CUSTOMER
    } from '../types/activecustomerTypes';

const initialState = {
    activecustomers: [],
    activecustomer: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ACTIVE_CUSTOMERS:
            return {
                ...state,
                activecustomers: action.payload
            };
        case ADD_ACTIVE_CUSTOMER:
            return {
                ...state,
                activecustomer: [...state.activecustomers, action.payload]
            };
        default:
            return state;
    }
}
