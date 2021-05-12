import axios from 'axios';
import {
    GET_VOIDED_INVOICES_START,
    GET_VOIDED_INVOICES_SUCCESS,
    GET_VOIDED_INVOICES_FAIL,
    GET_VOIDED_INVOICE_START,
    GET_VOIDED_INVOICE_SUCCESS,
    GET_VOIDED_INVOICE_FAIL
    } from '../types/voidedinvoiceTypes';
import { voidedinvoicesURL } from '../constants';

//voided invoices
const getVoidedInvoiceListStart = () => {
  return {
    type: GET_VOIDED_INVOICES_START
  };
};

const getVoidedInvoiceListSuccess = voidedinvoices => {
  return {
    type: GET_VOIDED_INVOICES_SUCCESS,
    voidedinvoices
  };
};

const getVoidedInvoiceListFail = error => {
  return {
    type: GET_VOIDED_INVOICES_FAIL,
    error: error
  };
};

const getVoidedInvoiceDetailStart = () => {
  return {
    type: GET_VOIDED_INVOICE_START
  };
};

const getVoidedInvoiceDetailSuccess = voidedinvoice => {
  return {
    type: GET_VOIDED_INVOICE_SUCCESS,
    voidedinvoice
  };
};

const getVoidedInvoiceDetailFail = error => {
  return {
    type: GET_VOIDED_INVOICE_FAIL,
    error: error
  };
};

export const getVoidedInvoices = (token) => {
  return dispatch => {
      dispatch(getVoidedInvoiceListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(voidedinvoicesURL, headers)
        .then(res => {
          const voidedinvoices = res.data;
          dispatch(getVoidedInvoiceListSuccess(voidedinvoices));
          })
        .catch(err => {
          dispatch(getVoidedInvoiceListStart(err));
        });
    };
};

export const getVoidedInvoice = (id, token) => {
  return dispatch => {
      dispatch(getVoidedInvoiceDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${voidedinvoicesURL}${id}`, headers)
        .then(res => {
          const voidedinvoice = res.data;
          dispatch(getVoidedInvoiceDetailSuccess(voidedinvoice));
          })
        .catch(err => {
          dispatch(getVoidedInvoiceDetailFail(err));
        });
    };
};

