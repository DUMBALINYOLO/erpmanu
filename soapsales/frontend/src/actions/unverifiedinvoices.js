import axios from 'axios';
import {
    GET_UNVERIFIED_INVOICES_START,
    GET_UNVERIFIED_INVOICES_SUCCESS,
    GET_UNVERIFIED_INVOICES_FAIL,
    GET_UNVERIFIED_INVOICE_START,
    GET_UNVERIFIED_INVOICE_SUCCESS,
    GET_UNVERIFIED_INVOICE_FAIL
    } from '../types/unverifiedinvoiceTypes';
import { unverifiedinvoicesURL } from '../constants';

//unverified invoices
const getUnverifiedInvoiceListStart = () => {
  return {
    type: GET_UNVERIFIED_INVOICES_START
  };
};

const getUnverifiedInvoiceListSuccess = unverifiedinvoices => {
  return {
    type: GET_UNVERIFIED_INVOICES_SUCCESS,
    unverifiedinvoices
  };
};

const getUnverifiedInvoiceListFail = error => {
  return {
    type: GET_UNVERIFIED_INVOICES_FAIL,
    error: error
  };
};

const getUnverifiedInvoiceDetailStart = () => {
  return {
    type: GET_UNVERIFIED_INVOICE_START
  };
};

const getUnverifiedInvoiceDetailSuccess = unverifiedinvoice => {
  return {
    type: GET_UNVERIFIED_INVOICE_SUCCESS,
    unverifiedinvoice
  };
};

const getUnverifiedInvoiceDetailFail = error => {
  return {
    type: GET_UNVERIFIED_INVOICE_FAIL,
    error: error
  };
};

export const getUnverifiedInvoices = (token) => {
  return dispatch => {
      dispatch(getUnverifiedInvoiceListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(unverifiedinvoicesURL, headers)
        .then(res => {
          const unverifiedinvoices = res.data;
          dispatch(getUnverifiedInvoiceListSuccess(unverifiedinvoices));
          })
        .catch(err => {
          dispatch(getUnverifiedInvoiceListStart(err));
        });
    };
};

export const getUnverifiedInvoice = (id, token) => {
  return dispatch => {
      dispatch(getUnverifiedInvoiceDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${unverifiedinvoicesURL}${id}`, headers)
        .then(res => {
          const unverifiedinvoice = res.data;
          dispatch(getUnverifiedInvoiceDetailSuccess(unverifiedinvoice));
          })
        .catch(err => {
          dispatch(getUnverifiedInvoiceDetailFail(err));
        });
    };
};
