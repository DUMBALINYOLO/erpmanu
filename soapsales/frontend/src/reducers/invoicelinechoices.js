import { GET_INVOICE_LINE_CHOICES } from '../actions/types.js';

const initialState = {
   invoicelinechoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVOICE_LINE_CHOICES:
            return {
                ...state,
                invoicelinechoices : action.payload
            };
        default:
            return state;
    }
}
