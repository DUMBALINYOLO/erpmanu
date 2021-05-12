import { 
    GET_INVOICES_START,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAIL,
    CREATE_INVOICE_START,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_FAIL
} from '../actions/types.js';
import { updateObject } from "../utility";

const initialState = {
    invoices: [],
    loading: false,
    error: null,
}

const getInvoiceListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInvoiceListSuccess = (state, action) => {
  return updateObject(state, {
    invoices: action.invoices,
    error: null,
    loading: false
  });
};

const getInvoiceListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createInvoiceStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createInvoiceSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createInvoiceFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function invoices(state = initialState, action){
    switch(action.type){
        case GET_INVOICES_START:
            return getInvoiceListStart(state, action);
        case GET_INVOICES_SUCCESS:
            return getInvoiceListSuccess(state, action);
        case GET_INVOICES_FAIL:
            return getInvoiceListFail(state, action);
        case CREATE_INVOICE_START:
            return createInvoiceStart(state, action);
        case CREATE_INVOICE_SUCCESS:
            return createInvoiceSuccess(state, action);
        case CREATE_INVOICE_FAIL:
            return createInvoiceFail(state, action);
        default:
            return state;
    }
}



