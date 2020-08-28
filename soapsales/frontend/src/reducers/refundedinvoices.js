import {
    GET_REFUNDED_INVOICES ,
    DELETE_REFUNDED_INVOICE,
    GET_REFUNDED_INVOICE,
} from '../types/refundedinvoiceTypes';

const initialState = {
    refundedinvoices: [],
    refundedinvoice: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_REFUNDED_INVOICES:
            return {
                ...state,
                refundedinvoices: action.payload
            };
        case DELETE_REFUNDED_INVOICE:
            return {
                ...state,
                refundedinvoice: state.refundedinvoices.filter(refundedinvoice=> refundedinvoice.id !== action.payload)
            };
        case GET_REFUNDED_INVOICE:
            return {
                ...state,
                refundedinvoice:action.payload
                };
        default:
            return state;
    }
}
