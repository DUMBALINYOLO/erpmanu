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
            const arrayList = state.currencies;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                currencies: arrayList,
            };
        default:
            return state;
    }
}
