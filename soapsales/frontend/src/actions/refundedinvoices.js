import axios from 'axios';
import {
    GET_REFUNDED_INVOICES_START,
    GET_REFUNDED_INVOICES_SUCCESS,
    GET_REFUNDED_INVOICES_FAIL,
    GET_REFUNDED_INVOICE_START,
    GET_REFUNDED_INVOICE_SUCCESS,
    GET_REFUNDED_INVOICE_FAIL
    } from '../types/refundedinvoiceTypes';
import { refundedinvoicesURL } from '../constants';

//refunded invoices
const getRefundedInvoiceListStart = () => {
  return {
    type: GET_REFUNDED_INVOICES_START
  };
};

const getRefundedInvoiceListSuccess = refundedinvoices => {
  return {
    type: GET_REFUNDED_INVOICES_SUCCESS,
    refundedinvoices
  };
};

const getRefundedInvoiceListFail = error => {
  return {
    type: GET_REFUNDED_INVOICES_FAIL,
    error: error
  };
};

const getRefundedInvoiceDetailStart = () => {
  return {
    type: GET_REFUNDED_INVOICE_START
  };
};

const getRefundedInvoiceDetailSuccess = refundedinvoice => {
  return {
    type: GET_REFUNDED_INVOICE_SUCCESS,
    refundedinvoice
  };
};

const getRefundedInvoiceDetailFail = error => {
  return {
    type: GET_REFUNDED_INVOICE_FAIL,
    error: error
  };
};

export const getRefundedInvoices = (token) => {
  return dispatch => {
      dispatch(getRefundedInvoiceListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(refundedinvoicesURL, headers)
        .then(res => {
          const refundedinvoices = res.data;
          dispatch(getRefundedInvoiceListSuccess(refundedinvoices));
          })
        .catch(err => {
          dispatch(getRefundedInvoiceListStart(err));
        });
    };
};

export const getRefundedInvoice = (id, token) => {
  return dispatch => {
      dispatch(getRefundedInvoiceDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${refundedinvoicesURL}${id}`, headers)
        .then(res => {
          const refundedinvoice = res.data;
          dispatch(getRefundedInvoiceDetailSuccess(refundedinvoice));
          })
        .catch(err => {
          dispatch(getRefundedInvoiceDetailFail(err));
        });
    };
};

