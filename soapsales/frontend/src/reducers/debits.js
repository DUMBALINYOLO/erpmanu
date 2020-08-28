import {
        GET_DEBITS,
        DELETE_DEBIT,
        GET_DEBIT
    } from '../types/debitTypes';

const initialState = {
    debits: [],
    debit: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_DEBITS:
            return {
                ...state,
                debits: action.payload
            };
        case DELETE_DEBIT:
            return {
                ...state,
                debit: state.debits.filter(debit=> debit.id !== action.payload)
            };
        case GET_DEBIT:
            return {
                ...state,
                debit:action.payload
                };
        default:
            return state;
    }
}
