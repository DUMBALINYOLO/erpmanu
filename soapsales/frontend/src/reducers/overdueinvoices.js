import {
    GET_OVERDUE_INVOICES_START,
    GET_OVERDUE_INVOICES_SUCCESS,
    GET_OVERDUE_INVOICES_FAIL,
    GET_OVERDUE_INVOICE_START,
    GET_OVERDUE_INVOICE_SUCCESS,
    GET_OVERDUE_INVOICE_FAIL
} from '../types/overdueinvoiceTypes';
import { updateObject } from "../utility";

const initialState = {
    overdueinvoices: [],
    overdueinvoice: {},
    loading: false,
    error: null,
}

const getOverdueInvoiceListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getOverdueInvoiceListSuccess = (state, action) => {
  return updateObject(state, {
    overdueinvoices: action.overdueinvoices,
    error: null,
    loading: false
  });
};

const getOverdueInvoiceListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getOverdueInvoiceDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getOverdueInvoiceDetailSuccess = (state, action) => {
  return updateObject(state, {
    overdueinvoice: action.overdueinvoice,
    error: null,
    loading: false
  });
};

const getOverdueInvoiceDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function overdueinvoices(state = initialState, action){
    switch(action.type){
        case GET_OVERDUE_INVOICES_START:
            return getOverdueInvoiceListStart(state, action);
        case GET_OVERDUE_INVOICES_SUCCESS:
            return getOverdueInvoiceListSuccess(state, action);
        case GET_OVERDUE_INVOICES_FAIL:
            return getOverdueInvoiceListFail(state, action);
        case GET_OVERDUE_INVOICE_START:
            return getOverdueInvoiceDetailStart(state, action);
        case GET_OVERDUE_INVOICE_SUCCESS:
            return getOverdueInvoiceDetailSuccess(state, action);
        case GET_OVERDUE_INVOICE_FAIL:
            return getOverdueInvoiceDetailFail(state, action);
        default:
            return state;
    }
}

