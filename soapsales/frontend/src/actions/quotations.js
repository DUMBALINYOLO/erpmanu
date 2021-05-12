import axios from 'axios';
import { 
    GET_QUOTATIONS_START,
    GET_QUOTATIONS_SUCCESS,
    GET_QUOTATIONS_FAIL,
    GET_QUOTATION_START,
    GET_QUOTATION_SUCCESS,
    GET_QUOTATION_FAIL 
} from '../types/quotationTypes';
import { quotationsURL } from '../constants';

//quotations
const getQuotationListStart = () => {
  return {
    type: GET_QUOTATIONS_START
  };
};

const getQuotationListSuccess = quotations => {
  return {
    type: GET_QUOTATIONS_SUCCESS,
    quotations
  };
};

const getQuotationListFail = error => {
  return {
    type: GET_QUOTATIONS_FAIL,
    error: error
  };
};

const getQuotationDetailStart = () => {
  return {
    type: GET_QUOTATION_START
  };
};

const getQuotationDetailSuccess = quotation => {
  return {
    type: GET_QUOTATION_SUCCESS,
    quotation
  };
};

const getQuotationDetailFail = error => {
  return {
    type: GET_QUOTATION_FAIL,
    error: error
  };
};

export const getQuotations = (token) => {
  return dispatch => {
      dispatch(getQuotationListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(quotationsURL, headers)
        .then(res => {
          const quotations = res.data;
          dispatch(getQuotationListSuccess(quotations));
          })
        .catch(err => {
          dispatch(getQuotationListStart(err));
        });
    };
};

export const getQuotation = (id, token) => {
  return dispatch => {
      dispatch(getQuotationDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${quotationsURL}${id}`, headers)
        .then(res => {
          const quotation = res.data;
          dispatch(getQuotationDetailSuccess(quotation));
          })
        .catch(err => {
          dispatch(getQuotationDetailFail(err));
        });
    };
};
