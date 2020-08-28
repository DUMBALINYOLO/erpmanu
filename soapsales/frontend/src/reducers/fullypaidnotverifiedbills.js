import {
        GET_FULLY_PAID_NOT_VERIFIED_BILLS,
        DELETE_FULLY_PAID_NOT_VERIFIED_BILL,
        GET_FULLY_PAID_NOT_VERIFIED_BILL
    } from '../types/fullypaidnotverifiedbillTypes';

const initialState = {
    fullypaidnotverifiedbills: [],
    fullypaidnotverifiedbill: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_FULLY_PAID_NOT_VERIFIED_BILLS:
            return {
                ...state,
                fullypaidnotverifiedbills: action.payload
            };
        case DELETE_FULLY_PAID_NOT_VERIFIED_BILL:
            return {
                ...state,
                fullypaidnotverifiedbill: state.fullypaidnotverifiedbills.filter(fullypaidnotverifiedbill=> fullypaidnotverifiedbill.id !== action.payload)
            };
        case GET_FULLY_PAID_NOT_VERIFIED_BILL:
            return {
                ...state,
                fullypaidnotverifiedbill:action.payload
                };
        default:
            return state;
    }
}
