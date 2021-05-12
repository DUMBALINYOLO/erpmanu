import {
    GET_UNVERIFIED_INVOICES_START,
    GET_UNVERIFIED_INVOICES_SUCCESS,
    GET_UNVERIFIED_INVOICES_FAIL,
    GET_UNVERIFIED_INVOICE_START,
    GET_UNVERIFIED_INVOICE_SUCCESS,
    GET_UNVERIFIED_INVOICE_FAIL
    } from '../types/unverifiedinvoiceTypes';
import { updateObject } from "../utility";

const initialState = {
    unverifiedinvoices: [],
    unverifiedinvoice: {},
    loading: false,
    error: null,
}

const getUnverifiedInvoiceListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUnverifiedInvoiceListSuccess = (state, action) => {
  return updateObject(state, {
    unverifiedinvoices: action.unverifiedinvoices,
    error: null,
    loading: false
  });
};

const getUnverifiedInvoiceListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getUnverifiedInvoiceDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUnverifiedInvoiceDetailSuccess = (state, action) => {
  return updateObject(state, {
    unverifiedinvoice: action.unverifiedinvoice,
    error: null,
    loading: false
  });
};

const getUnverifiedInvoiceDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function unverifiedinvoices(state = initialState, action){
    switch(action.type){
        case GET_UNVERIFIED_INVOICES_START:
            return getUnverifiedInvoiceListStart(state, action);
        case GET_UNVERIFIED_INVOICES_SUCCESS:
            return getUnverifiedInvoiceListSuccess(state, action);
        case GET_UNVERIFIED_INVOICES_FAIL:
            return getUnverifiedInvoiceListFail(state, action);
        case GET_UNVERIFIED_INVOICE_START:
            return getUnverifiedInvoiceDetailStart(state, action);
        case GET_UNVERIFIED_INVOICE_SUCCESS:
            return getUnverifiedInvoiceDetailSuccess(state, action);
        case GET_UNVERIFIED_INVOICE_FAIL:
            return getUnverifiedInvoiceDetailFail(state, action);
        default:
            return state;
    }
}
