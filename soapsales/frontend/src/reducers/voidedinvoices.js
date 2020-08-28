import {
    GET_VOIDED_INVOICES ,
    DELETE_VOIDED_INVOICE,
    GET_VOIDED_INVOICE,
} from '../types/voidedinvoiceTypes';

const initialState = {
    voidedinvoices: [],
    voidedinvoice: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_VOIDED_INVOICES:
            return {
                ...state,
                voidedinvoices: action.payload
            };
        case DELETE_VOIDED_INVOICE:
            return {
                ...state,
                voidedinvoice: state.voidedinvoices.filter(voidedinvoice=> voidedinvoice.id !== action.payload)
            };
        case GET_VOIDED_INVOICE:
            return {
                ...state,
                voidedinvoice:action.payload
                };
        default:
            return state;
    }
}
