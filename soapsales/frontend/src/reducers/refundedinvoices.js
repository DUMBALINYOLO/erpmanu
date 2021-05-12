import {
    GET_REFUNDED_INVOICES_START,
    GET_REFUNDED_INVOICES_SUCCESS,
    GET_REFUNDED_INVOICES_FAIL,
    GET_REFUNDED_INVOICE_START,
    GET_REFUNDED_INVOICE_SUCCESS,
    GET_REFUNDED_INVOICE_FAIL
} from '../types/refundedinvoiceTypes';
import { updateObject } from "../utility";

const initialState = {
    refundedinvoices: [],
    refundedinvoice: {},
    loading: false,
    error: null,
}

const getRefundedInvoiceListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getRefundedInvoiceListSuccess = (state, action) => {
  return updateObject(state, {
    refundedinvoices: action.refundedinvoices,
    error: null,
    loading: false
  });
};

const getRefundedInvoiceListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getRefundedInvoiceDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getRefundedInvoiceDetailSuccess = (state, action) => {
  return updateObject(state, {
    refundedinvoice: action.refundedinvoice,
    error: null,
    loading: false
  });
};

const getRefundedInvoiceDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function refundedinvoices(state = initialState, action){
    switch(action.type){
        case GET_REFUNDED_INVOICES_START:
            return getRefundedInvoiceListStart(state, action);
        case GET_REFUNDED_INVOICES_SUCCESS:
            return getRefundedInvoiceListSuccess(state, action);
        case GET_REFUNDED_INVOICES_FAIL:
            return getRefundedInvoiceListFail(state, action);
        case GET_REFUNDED_INVOICE_START:
            return getRefundedInvoiceDetailStart(state, action);
        case GET_REFUNDED_INVOICE_SUCCESS:
            return getRefundedInvoiceDetailSuccess(state, action);
        case GET_REFUNDED_INVOICE_FAIL:
            return getRefundedInvoiceDetailFail(state, action);
        default:
            return state;
    }
}
