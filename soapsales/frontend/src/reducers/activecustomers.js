import {
    GET_ACTIVE_CUSTOMERS,
    ADD_ACTIVE_CUSTOMER,
    DELETE_ACTIVE_CUSTOMER,
    EDIT_ACTIVE_CUSTOMER,
    GET_ACTIVE_CUSTOMER
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
        case DELETE_ACTIVE_CUSTOMER:
            return {
                ...state,
                activecustomer: state.activecustomers.filter(activecustomer=> activecustomer.id !== action.payload)
            };
        case ADD_ACTIVE_CUSTOMER:
            return {
                ...state,
                activecustomer: [...state.activecustomers, action.payload]
            }
        case GET_ACTIVE_CUSTOMER:
            return {
                ...state,
                activecustomer:action.payload
                };
        case EDIT_ACTIVE_CUSTOMER:
            const arrayList = state.activecustomers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                activecustomers: arrayList,
            };
        default:
            return state;
    }
}
