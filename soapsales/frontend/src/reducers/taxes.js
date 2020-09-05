import {
        ADD_TAX,
        GET_TAXES,
        DELETE_TAX,
        EDIT_TAX
    } from '../types/taxTypes';

const initialState = {
    taxes: [],
    tax: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_TAXES:
            return {
                ...state,
                taxes: action.payload
            };
        case DELETE_TAX:
            return {
                ...state,
                tax: state.taxes.filter(tax=> tax.id !== action.payload)
            };
        case ADD_TAX:
            return {
                ...state,
                tax: [...state.taxes, action.payload]
            };
        case EDIT_TAX:
            const arrayList = state.taxes;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                taxes: arrayList,
            };
        default:
            return state;
    }
}
