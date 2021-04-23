import axios from 'axios';
import {
    GET_FULLY_PAID_NOT_VERIFIED_BILLS_START,
    GET_FULLY_PAID_NOT_VERIFIED_BILLS_SUCCESS,
    GET_FULLY_PAID_NOT_VERIFIED_BILLS_FAIL,
    GET_FULLY_PAID_NOT_VERIFIED_BILL_START,
    GET_FULLY_PAID_NOT_VERIFIED_BILL_SUCCESS,
    GET_FULLY_PAID_NOT_VERIFIED_BILL_FAIL
    } from '../types/fullypaidnotverifiedbillTypes';
import { fullypaidnotverifiedbillsURL } from '../constants';

//fully paid not verified bills
const getFullyPaidNotVerifiedBillListStart = () => {
  return {
    type: GET_FULLY_PAID_NOT_VERIFIED_BILLS_START
  };
};

const getFullyPaidNotVerifiedBillListSuccess = fullypaidnotverifiedbills => {
  return {
    type: GET_FULLY_PAID_NOT_VERIFIED_BILLS_SUCCESS,
    fullypaidnotverifiedbills
  };
};

const getFullyPaidNotVerifiedBillListFail = error => {
  return {
    type: GET_FULLY_PAID_NOT_VERIFIED_BILLS_FAIL,
    error: error
  };
};

const getFullyPaidNotVerifiedBillDetailStart = () => {
  return {
    type: GET_FULLY_PAID_NOT_VERIFIED_BILL_START
  };
};

const getFullyPaidNotVerifiedBillDetailSuccess = fullypaidnotverifiedbill => {
  return {
    type: GET_FULLY_PAID_NOT_VERIFIED_BILL_SUCCESS,
    fullypaidnotverifiedbill
  };
};

const getFullyPaidNotVerifiedBillDetailFail = error => {
  return {
    type: GET_FULLY_PAID_NOT_VERIFIED_BILL_FAIL,
    error: error
  };
};

export const getFullyPaidNotVerifiedBills = (token) => {
  return dispatch => {
      dispatch(getFullyPaidNotVerifiedBillListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(fullypaidnotverifiedbillsURL, headers)
        .then(res => {
          const fullypaidnotverifiedbills = res.data;
          dispatch(getFullyPaidNotVerifiedBillListSuccess(fullypaidnotverifiedbills));
          })
        .catch(err => {
          dispatch(getFullyPaidNotVerifiedBillListStart(err));
        });
    };
};

export const getFullyPaidNotVerifiedBill = (id, token) => {
  return dispatch => {
      dispatch(getFullyPaidNotVerifiedBillDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${fullypaidnotverifiedbillsURL}${id}`, headers)
        .then(res => {
          const fullypaidnotverifiedbill = res.data;
          dispatch(getFullyPaidNotVerifiedBillDetailSuccess(fullypaidnotverifiedbill));
          })
        .catch(err => {
          dispatch(getFullyPaidNotVerifiedBillDetailFail(err));
        });
    };
};

