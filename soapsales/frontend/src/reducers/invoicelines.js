import { 
    GET_INVOICE_LINES_START,
    GET_INVOICE_LINES_SUCCESS,
    GET_INVOICE_LINES_FAIL
} from '../types/invoicelineTypes';
import { updateObject } from "../utility";

const initialState = {
    invoicelines: [],
    loading: false,
    error: null,
}

const getInvoiceLineListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInvoiceLineListSuccess = (state, action) => {
  return updateObject(state, {
    invoicelines: action.invoicelines,
    error: null,
    loading: false
  });
};

const getInvoiceLineListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function invoicelines(state = initialState, action){
    switch(action.type){
        case GET_INVOICE_LINES_START:
            return getInvoiceLineListStart(state, action);
        case GET_INVOICE_LINES_SUCCESS:
            return getInvoiceLineListSuccess(state, action);
        case GET_INVOICE_LINES_FAIL:
            return getInvoiceLineListFail(state, action);
        default:
            return state;
    }
}

