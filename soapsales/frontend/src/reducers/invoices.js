import { GET_INVOICES, ADD_INVOICE } from '../actions/types.js';

const initialState = {
   invoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVOICES:
            return {
                ...state,
                invoices : action.payload
            };
        case ADD_INVOICE:
            return {
                ...state,
                invoice: [...state.invoices, action.payload]
            };
        default:
            return state;
    }
}


