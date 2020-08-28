import { GET_INVOICE_SALES_CHOICES } from '../actions/types.js';

const initialState = {
   invoicesaleschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVOICE_SALES_CHOICES:
            return {
                ...state,
                invoicesaleschoices : action.payload
            };
        default:
            return state;
    }
}
