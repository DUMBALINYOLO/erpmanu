import {
        ADD_CURRENCY,
        GET_CURRENCIES,
        EDIT_CURRENCY,
        DELETE_CURRENCY
    } from '../types/currencyTypes';

const initialState = {
    currencies: [],
    currency: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_CURRENCIES:
            return {
                ...state,
                currencies: action.payload
            };
        case DELETE_CURRENCY:
            return {
                ...state,
                currency: state.currencies.filter(currency=> currency.id !== action.payload)
            };
        case ADD_CURRENCY:
            return {
                ...state,
                currency: [...state.currencies, action.payload]
            };
        case EDIT_CURRENCY:
            return {
                ...state,
                currencies: state.currencies.map(currency=> currency.id !== action.payload)
            };
        default:
            return state;
    }
}
