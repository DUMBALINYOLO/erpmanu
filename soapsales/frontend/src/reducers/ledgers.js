import {
        GET_LEDGERS,
        DELETE_LEDGER,
        GET_LEDGER,
        EDIT_LEDGER,
        ADD_LEDGER
    } from '../types/ledgerTypes';

const initialState = {
    ledgers: [],
    ledger: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_LEDGERS:
            return {
                ...state,
                ledgers: action.payload
            };
        case DELETE_LEDGER:
            return {
                ...state,
                ledger: state.ledgers.filter(ledger=> ledger.id !== action.payload)
            };
        case GET_LEDGER:
            return {
                ...state,
                ledger:action.payload
                };
        case ADD_LEDGER:
            return {
                ...state,
                ledger: [...state.ledgers, action.payload]
            };
        case EDIT_LEDGER:
            const arrayList = state.ledgers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                ledgers: arrayList,
            };
        default:
            return state;
    }
}
