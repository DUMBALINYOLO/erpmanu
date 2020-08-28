import {
        GET_FULLY_PAID_BILLS,
        DELETE_FULLY_PAID_BILL,
        GET_FULLY_PAID_BILL
    } from '../types/fullypaidbillTypes';

const initialState = {
    fullypaidbills: [],
    fullypaidbill: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_FULLY_PAID_BILLS:
            return {
                ...state,
                fullypaidbills: action.payload
            };
        case DELETE_FULLY_PAID_BILL:
            return {
                ...state,
                fullypaidbill: state.fullypaidbills.filter(fullypaidbill=> fullypaidbill.id !== action.payload)
            };
        case GET_FULLY_PAID_BILL:
            return {
                ...state,
                fullypaidbill:action.payload
                };
        default:
            return state;
    }
}
