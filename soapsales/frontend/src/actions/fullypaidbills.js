import axios from 'axios';
import {
    GET_FULLY_PAID_BILLS_START,
    GET_FULLY_PAID_BILLS_SUCCESS,
    GET_FULLY_PAID_BILLS_FAIL,
    GET_FULLY_PAID_BILL_START,
    GET_FULLY_PAID_BILL_SUCCESS,
    GET_FULLY_PAID_BILL_FAIL
    } from '../types/fullypaidbillTypes';
import { fullypaidbillsURL } from '../constants';

//fully paid bills
const getFullyPaidBillListStart = () => {
  return {
    type: GET_FULLY_PAID_BILLS_START
  };
};

const getFullyPaidBillListSuccess = fullypaidbills => {
  return {
    type: GET_FULLY_PAID_BILLS_SUCCESS,
    fullypaidbills
  };
};

const getFullyPaidBillListFail = error => {
  return {
    type: GET_FULLY_PAID_BILLS_FAIL,
    error: error
  };
};

const getFullyPaidBillDetailStart = () => {
  return {
    type: GET_FULLY_PAID_BILL_START
  };
};

const getFullyPaidBillDetailSuccess = fullypaidbill => {
  return {
    type: GET_FULLY_PAID_BILL_SUCCESS,
    fullypaidbill
  };
};

const getFullyPaidBillDetailFail = error => {
  return {
    type: GET_FULLY_PAID_BILL_FAIL,
    error: error
  };
};

export const getFullyPaidBills = (token) => {
  return dispatch => {
      dispatch(getFullyPaidBillListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(fullypaidbillsURL, headers)
        .then(res => {
          const fullypaidbills = res.data;
          dispatch(getFullyPaidBillListSuccess(fullypaidbills));
          })
        .catch(err => {
          dispatch(getFullyPaidBillListStart(err));
        });
    };
};

export const getFullyPaidBill = (id, token) => {
  return dispatch => {
      dispatch(getFullyPaidBillDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${fullypaidbillsURL}${id}`, headers)
        .then(res => {
          const fullypaidbill = res.data;
          dispatch(getFullyPaidBillDetailSuccess(fullypaidbill));
          })
        .catch(err => {
          dispatch(getFullyPaidBillDetailFail(err));
        });
    };
};
