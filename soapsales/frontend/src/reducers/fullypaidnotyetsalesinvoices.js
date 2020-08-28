import {
    GET_FULLYPAID_NOT_YET_SALES_INVOICES ,
    DELETE_FULLYPAID_NOT_YET_SALES_INVOICE,
    GET_FULLYPAID_NOT_YET_SALES_INVOICE,
} from '../types/fullypaidnotyetsalesinvoiceTypes';

const initialState = {
    fullypaidnotyetsalesinvoices: [],
    fullypaidnotyetsalesinvoice: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_FULLYPAID_NOT_YET_SALES_INVOICES:
            return {
                ...state,
                fullypaidnotyetsalesinvoices: action.payload
            };
        case DELETE_FULLYPAID_NOT_YET_SALES_INVOICE:
            return {
                ...state,
                fullypaidnotyetsalesinvoice: state.fullypaidnotyetsalesinvoices.filter(fullypaidnotyetsalesinvoice=> fullypaidnotyetsalesinvoice.id !== action.payload)
            };
        case GET_FULLYPAID_NOT_YET_SALES_INVOICE:
            return {
                ...state,
                fullypaidnotyetsalesinvoice:action.payload
                };
        default:
            return state;
    }
}
