import axios from 'axios';
import { 
	GET_INVOICE_LINES_START,
	GET_INVOICE_LINES_SUCCESS,
	GET_INVOICE_LINES_FAIL
} from '../types/invoicelineTypes';
import { invoicelinesURL } from '../constants';


//invoice lines
const getInvoiceLineListStart = () => {
  return {
    type: GET_INVOICE_LINES_START
  };
};

const getInvoiceLineListSuccess = invoicelines => {
  return {
    type: GET_INVOICE_LINES_SUCCESS,
    invoicelines
  };
};

const getInvoiceLineListFail = error => {
  return {
    type: GET_INVOICE_LINES_FAIL,
    error: error
  };
};

export const getInvoiceLines = (token) => {
  return dispatch => {
      dispatch(getInvoiceLineListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(invoicelinesURL, headers)
        .then(res => {
          const invoicelines = res.data;
          dispatch(getInvoiceLineListSuccess(invoicelines));
          })
        .catch(err => {
          dispatch(getInvoiceLineListStart(err));
        });
    };
};
