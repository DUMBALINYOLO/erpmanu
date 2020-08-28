import { GET_INVOICE_SALES_TYPES_CHOICES } from '../actions/types.js';

const initialState = {
   invoicesalestypeschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVOICE_SALES_TYPES_CHOICES:
            return {
                ...state,
                invoicesalestypeschoices : action.payload
            };
        default:
            return state;
    }
}
