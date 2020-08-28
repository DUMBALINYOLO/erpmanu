import { GET_INVOICE_LINES } from '../types/invoicelineTypes';

const initialState = {
    invoicelines: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVOICE_LINES:
            return {
                ...state,
                invoicelines: action.payload
            };

        default:
            return state;
    }
}
