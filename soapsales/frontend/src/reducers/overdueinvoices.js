import {
    GET_OVERDUE_INVOICES ,
    DELETE_OVERDUE_INVOICE,
    GET_OVERDUE_INVOICE,
} from '../types/overdueinvoiceTypes';

const initialState = {
    overdueinvoices: [],
    overdueinvoice: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_OVERDUE_INVOICES:
            return {
                ...state,
                overdueinvoices: action.payload
            };
        case DELETE_OVERDUE_INVOICE:
            return {
                ...state,
                overdueinvoice: state.overdueinvoices.filter(overdueinvoice=> overdueinvoice.id !== action.payload)
            };
        case GET_OVERDUE_INVOICE:
            return {
                ...state,
                overdueinvoice:action.payload
                };
        default:
            return state;
    }
}
