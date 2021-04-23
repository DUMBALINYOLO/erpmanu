import axios from 'axios';
import {
    GET_FULLY_PAID_NOT_YET_SALES_INVOICES_START,
    GET_FULLY_PAID_NOT_YET_SALES_SUCCESS,
    GET_FULLY_PAID_NOT_YET_SALES_FAIL,
    GET_FULLY_PAID_NOT_YET_SALE_START,
    GET_FULLY_PAID_NOT_YET_SALE_SUCCESS,
    GET_FULLY_PAID_NOT_YET_SALE_FAIL             
    } from '../types/fullypaidnotyetsalesinvoiceTypes';
import { fullypaidnotyetsalesinvoicesURL } from '../constants';

//fully paid not yet sales invoices
const getFullyPaidNotYetSalesInvoiceListStart = () => {
  return {
    type: GET_FULLY_PAID_NOT_YET_SALES_INVOICES_START
  };
};

const getFullyPaidNotYetSalesInvoiceListSuccess = fullypaidnotyetsalesinvoices => {
  return {
    type: GET_FULLY_PAID_NOT_YET_SALES_SUCCESS,
    fullypaidnotyetsalesinvoices
  };
};

const getFullyPaidNotYetSalesInvoiceListFail = error => {
  return {
    type: GET_FULLY_PAID_NOT_YET_SALES_FAIL,
    error: error
  };
};

const getFullyPaidNotYetSalesInvoiceDetailStart = () => {
  return {
    type: GET_FULLY_PAID_NOT_YET_SALE_START
  };
};

const getFullyPaidNotYetSalesInvoiceDetailSuccess = fullypaidnotyetsalesinvoice => {
  return {
    type: GET_FULLY_PAID_NOT_YET_SALE_SUCCESS,
    fullypaidnotyetsalesinvoice
  };
};

const getFullyPaidNotYetSalesInvoiceDetailFail = error => {
  return {
    type: GET_FULLY_PAID_NOT_YET_SALE_FAIL,
    error: error
  };
};

export const getFullyPaidNotYetSalesInvoices = (token) => {
  return dispatch => {
      dispatch(getFullyPaidNotYetSalesInvoiceListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(fullypaidnotyetsalesinvoicesURL, headers)
        .then(res => {
          const fullypaidnotyetsalesinvoices = res.data;
          dispatch(getFullyPaidNotYetSalesInvoiceListSuccess(fullypaidnotyetsalesinvoices));
          })
        .catch(err => {
          dispatch(getFullyPaidNotYetSalesInvoiceListStart(err));
        });
    };
};

export const getFullyPaidNotYetSalesInvoice = (id, token) => {
  return dispatch => {
      dispatch(getFullyPaidNotYetSalesInvoiceDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${fullypaidnotyetsalesinvoicesURL}${id}`, headers)
        .then(res => {
          const fullypaidnotyetsalesinvoice = res.data;
          dispatch(getFullyPaidNotYetSalesInvoiceDetailSuccess(fullypaidnotyetsalesinvoice));
          })
        .catch(err => {
          dispatch(getFullyPaidNotYetSalesInvoiceDetailFail(err));
        });
    };
};
