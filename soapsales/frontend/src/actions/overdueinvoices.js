import axios from 'axios';
import {
    GET_OVERDUE_INVOICES_START,
    GET_OVERDUE_INVOICES_SUCCESS,
    GET_OVERDUE_INVOICES_FAIL,
    GET_OVERDUE_INVOICE_START,
    GET_OVERDUE_INVOICE_SUCCESS,
    GET_OVERDUE_INVOICE_FAIL
    } from '../types/overdueinvoiceTypes';
import { overdueinvoicesURL } from '../constants';

//overdue invoices
const getOverdueInvoiceListStart = () => {
  return {
    type: GET_OVERDUE_INVOICES_START
  };
};

const getOverdueInvoiceListSuccess = overdueinvoices => {
  return {
    type: GET_OVERDUE_INVOICES_SUCCESS,
    overdueinvoices
  };
};

const getOverdueInvoiceListFail = error => {
  return {
    type: GET_OVERDUE_INVOICES_FAIL,
    error: error
  };
};

const getOverdueInvoiceDetailStart = () => {
  return {
    type: GET_OVERDUE_INVOICE_START
  };
};

const getOverdueInvoiceDetailSuccess = overdueinvoice => {
  return {
    type: GET_OVERDUE_INVOICE_SUCCESS,
    overdueinvoice
  };
};

const getOverdueInvoiceDetailFail = error => {
  return {
    type: GET_OVERDUE_INVOICE_FAIL,
    error: error
  };
};

export const getOverdueInvoices = (token) => {
  return dispatch => {
      dispatch(getOverdueInvoiceListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(overdueinvoicesURL, headers)
        .then(res => {
          const overdueinvoices = res.data;
          dispatch(getOverdueInvoiceListSuccess(overdueinvoices));
          })
        .catch(err => {
          dispatch(getOverdueInvoiceListStart(err));
        });
    };
};

export const getOverdueInvoice = (id, token) => {
  return dispatch => {
      dispatch(getOverdueInvoiceDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${overdueinvoicesURL}${id}`, headers)
        .then(res => {
          const overdueinvoice = res.data;
          dispatch(getOverdueInvoiceDetailSuccess(overdueinvoice));
          })
        .catch(err => {
          dispatch(getOverdueInvoiceDetailFail(err));
        });
    };
};

