import {
        GET_UNVERIFIED_INVOICES,
        DELETE_UNVERIFIED_INVOICE,
        GET_UNVERIFIED_INVOICE
    } from '../types/unverifiedinvoiceTypes';

const initialState = {
    unverifiedinvoices: [],
    unverifiedinvoice: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_UNVERIFIED_INVOICES:
            return {
                ...state,
                unverifiedinvoices: action.payload
            };
        case DELETE_UNVERIFIED_INVOICE:
            return {
                ...state,
                unverifiedinvoice: state.unverifiedinvoices.filter(unverifiedinvoice=> unverifiedinvoice.id !== action.payload)
            };
        case GET_UNVERIFIED_INVOICE:
            return {
                ...state,
                unverifiedinvoice:action.payload
                };
        default:
            return state;
    }
}
