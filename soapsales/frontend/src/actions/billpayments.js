import axios from 'axios';
import {
    GET_BILL_PAYMENTS_START,
    GET_BILL_PAYMENTS_SUCCESS,
    GET_BILL_PAYMENTS_FAIL,
    CREATE_BILL_PAYMENT_START,
    CREATE_BILL_PAYMENT_SUCCESS,
    CREATE_BILL_PAYMENT_FAIL,
    GET_BILL_PAYMENT_START,
    GET_BILL_PAYMENT_SUCCESS,
    GET_BILL_PAYMENT_FAIL,
    EDIT_BILL_PAYMENT
    } from '../types/billpaymentTypes';
import { billpaymentsURL } from '../constants';

//bill payments
const getBillPaymentListStart = () => {
  return {
    type: GET_BILL_PAYMENTS_START
  };
};

const getBillPaymentListSuccess = billpayments => {
  return {
    type: GET_BILL_PAYMENTS_SUCCESS,
    billpayments
  };
};

const getBillPaymentListFail = error => {
  return {
    type: GET_BILL_PAYMENTS_FAIL,
    error: error
  };
};

const createBillPaymentStart = () => {
  return {
    type: CREATE_BILL_PAYMENT_START
  };
};


const createBillPaymentSuccess = billpayment => {
  return {
    type: CREATE_BILL_PAYMENT_SUCCESS,
    billpayment
  };
};

const createBillPaymentFail = error => {
  return {
    type: CREATE_BILL_PAYMENT_FAIL,
    error: error
  };
};

const getBillPaymentDetailStart = () => {
  return {
    type: GET_BILL_PAYMENT_START
  };
};

const getBillPaymentDetailSuccess = billpayment => {
  return {
    type: GET_BILL_PAYMENT_SUCCESS,
    billpayment
  };
};

const getBillPaymentDetailFail = error => {
  return {
    type: GET_BILL_PAYMENT_FAIL,
    error: error
  };
};

export const getBillPayments = (token) => {
  return dispatch => {
      dispatch(getBillPaymentListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(billpaymentsURL, headers)
        .then(res => {
          const billpayments = res.data;
          dispatch(getBillPaymentListSuccess(billpayments));
          })
        .catch(err => {
          dispatch(getBillPaymentListStart(err));
        });
    };
};

export const getBillPayment = (id, token) => {
  return dispatch => {
      dispatch(getBillPaymentDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${billpaymentsURL}${id}`, headers)
        .then(res => {
          const billpayment = res.data;
          dispatch(getBillPaymentDetailSuccess(billpayment));
          })
        .catch(err => {
          dispatch(getBillPaymentDetailFail(err));
        });
    };
};

export const addBillPayment = (billpayment, token) => {
  return dispatch => {
      dispatch(createBillPaymentStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(billpaymentsURL, billpayment, headers)
        .then(res => {
          dispatch(createBillPaymentSuccess(billpayment));
        })
        .catch(err => {
          dispatch(createBillPaymentFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editBillPayment = (id, billpayment, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${billpaymentsURL}${id}/`, billpayment, headers)
    .then(res => {
        dispatch({
            type: EDIT_BILL_PAYMENT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
