import axios from 'axios';
import {
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_START,
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_SUCCESS,
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_FAIL,
    CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_START,
    CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_SUCCESS,
    CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_FAIL,
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_START,
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_SUCCESS,
    GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_FAIL,
    EDIT_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER
    } from '../types/fullyreceivedtotalpaidforandverifiedorderTypes';
import { fullyreceivedtotalpaidforandverifiedordersURL } from '../constants';

//fully received total paid for and verified orders
const getFullyReceivedTotalPaidForAndVerifiedOrderListStart = () => {
  return {
    type: GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_START
  };
};

const getFullyReceivedTotalPaidForAndVerifiedOrderListSuccess = fullyreceivedtotalpaidforandverifiedorders => {
  return {
    type: GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_SUCCESS,
    fullyreceivedtotalpaidforandverifiedorders
  };
};

const getFullyReceivedTotalPaidForAndVerifiedOrderListFail = error => {
  return {
    type: GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS_FAIL,
    error: error
  };
};

const createFullyReceivedTotalPaidForAndVerifiedOrderStart = () => {
  return {
    type: CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_START
  };
};


const createFullyReceivedTotalPaidForAndVerifiedOrderSuccess = fullyreceivedtotalpaidforandverifiedorder => {
  return {
    type: CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_SUCCESS,
    fullyreceivedtotalpaidforandverifiedorder
  };
};

const createFullyReceivedTotalPaidForAndVerifiedOrderFail = error => {
  return {
    type: CREATE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_FAIL,
    error: error
  };
};

const getFullyReceivedTotalPaidForAndVerifiedOrderDetailStart = () => {
  return {
    type: GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_START
  };
};

const getFullyReceivedTotalPaidForAndVerifiedOrderDetailSuccess = fullyreceivedtotalpaidforandverifiedorder => {
  return {
    type: GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_SUCCESS,
    fullyreceivedtotalpaidforandverifiedorder
  };
};

const getFullyReceivedTotalPaidForAndVerifiedOrderDetailFail = error => {
  return {
    type: GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER_FAIL,
    error: error
  };
};

export const getFullyReceivedTotalPaidForAndVerifiedOrders = (token) => {
  return dispatch => {
      dispatch(getFullyReceivedTotalPaidForAndVerifiedOrderListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(fullyreceivedtotalpaidforandverifiedordersURL, headers)
        .then(res => {
          const fullyreceivedtotalpaidforandverifiedorders = res.data;
          dispatch(getFullyReceivedTotalPaidForAndVerifiedOrderListSuccess(fullyreceivedtotalpaidforandverifiedorders));
          })
        .catch(err => {
          dispatch(getFullyReceivedTotalPaidForAndVerifiedOrderListStart(err));
        });
    };
};

export const getFullyReceivedTotalPaidForAndVerifiedOrder = (id, token) => {
  return dispatch => {
      dispatch(getFullyReceivedTotalPaidForAndVerifiedOrderDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${fullyreceivedtotalpaidforandverifiedordersURL}${id}`, headers)
        .then(res => {
          const fullyreceivedtotalpaidforandverifiedorder = res.data;
          dispatch(getFullyReceivedTotalPaidForAndVerifiedOrderDetailSuccess(fullyreceivedtotalpaidforandverifiedorder));
          })
        .catch(err => {
          dispatch(getFullyReceivedTotalPaidForAndVerifiedOrderDetailFail(err));
        });
    };
};

export const addFullyReceivedTotalPaidForAndVerifiedOrder = (fullyreceivedtotalpaidforandverifiedorder, token) => {
  return dispatch => {
      dispatch(createFullyReceivedTotalPaidForAndVerifiedOrderStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(fullyreceivedtotalpaidforandverifiedordersURL, fullyreceivedtotalpaidforandverifiedorder, headers)
        .then(res => {
          dispatch(createFullyReceivedTotalPaidForAndVerifiedOrderSuccess(fullyreceivedtotalpaidforandverifiedorder));
        })
        .catch(err => {
          dispatch(createFullyReceivedTotalPaidForAndVerifiedOrderFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editFullyReceivedTotalPaidForAndVerifiedOrder = (id, fullyreceivedtotalpaidforandverifiedorder, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${fullyreceivedtotalpaidforandverifiedordersURL}${id}/`, fullyreceivedtotalpaidforandverifiedorder, headers)
    .then(res => {
        dispatch({
            type: EDIT_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
