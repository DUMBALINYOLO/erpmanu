import axios from 'axios';
import {
    GET_INVOICES_START,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAIL,
    CREATE_INVOICE_START,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_FAIL,
    EDIT_INVOICE
    } from './types';
import { invoicesURL } from '../constants';

//invoices
const getInvoiceListStart = () => {
  return {
    type: GET_INVOICES_START
  };
};

const getInvoiceListSuccess = invoices => {
  return {
    type: GET_INVOICES_SUCCESS,
    invoices
  };
};

const getInvoiceListFail = error => {
  return {
    type: GET_INVOICES_FAIL,
    error: error
  };
};

const createInvoiceStart = () => {
  return {
    type: CREATE_INVOICE_START
  };
};

const createInvoiceSuccess = invoice => {
  return {
    type: CREATE_INVOICE_SUCCESS,
    invoice
  };
};

const createInvoiceFail = error => {
  return {
    type: CREATE_INVOICE_FAIL,
    error: error
  };
};

export const getInvoices = (token) => {
  return dispatch => {
      dispatch(getInvoiceListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(invoicesURL, headers)
        .then(res => {
          const invoices = res.data;
          dispatch(getInvoiceListSuccess(invoices));
          })
        .catch(err => {
          dispatch(getInvoiceListStart(err));
        });
    };
};

export const addInvoice = (invoice, token) => {
  return dispatch => {
      dispatch(createInvoiceStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(invoicesURL, invoice, headers)
        .then(res => {
          dispatch(createInvoiceSuccess(invoice));
        })
        .catch(err => {
          dispatch(createInvoiceFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editInvoice = (id, invoice, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${invoicesURL}${id}/`, invoice, headers)
    .then(res => {
        dispatch({
            type: EDIT_INVOICE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

