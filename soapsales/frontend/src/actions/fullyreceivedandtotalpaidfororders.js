import axios from 'axios';
import {
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_START,
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_SUCCESS,
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_FAIL,
    CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_START,
    CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_SUCCESS,
    CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_FAIL,
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_START,
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_SUCCESS,
    GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_FAIL,
    EDIT_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER
    } from '../types/fullyreceivedandtotalpaidfororderTypes';
import { fullyreceivedandtotalpaidforordersURL } from '../constants';

//fully received and total paid for orders
const getFullyReceivedAndTotalPaidForOrderListStart = () => {
  return {
    type: GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_START
  };
};

const getFullyReceivedAndTotalPaidForOrderListSuccess = fullyreceivedandtotalpaidfororders => {
  return {
    type: GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_SUCCESS,
    fullyreceivedandtotalpaidfororders
  };
};

const getFullyReceivedAndTotalPaidForOrderListFail = error => {
  return {
    type: GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS_FAIL,
    error: error
  };
};

const createFullyReceivedAndTotalPaidForOrderStart = () => {
  return {
    type: CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_START
  };
};


const createFullyReceivedAndTotalPaidForOrderSuccess = fullyreceivedandtotalpaidfororder => {
  return {
    type: CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_SUCCESS,
    fullyreceivedandtotalpaidfororder
  };
};

const createFullyReceivedAndTotalPaidForOrderFail = error => {
  return {
    type: CREATE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_FAIL,
    error: error
  };
};

const getFullyReceivedAndTotalPaidForOrderDetailStart = () => {
  return {
    type: GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_START
  };
};

const getFullyReceivedAndTotalPaidForOrderDetailSuccess = fullyreceivedandtotalpaidfororder => {
  return {
    type: GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_SUCCESS,
    fullyreceivedandtotalpaidfororder
  };
};

const getFullyReceivedAndTotalPaidForOrderDetailFail = error => {
  return {
    type: GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER_FAIL,
    error: error
  };
};

export const getFullyReceivedAndTotalPaidForOrders = (token) => {
  return dispatch => {
      dispatch(getFullyReceivedAndTotalPaidForOrderListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(fullyreceivedandtotalpaidforordersURL, headers)
        .then(res => {
          const fullyreceivedandtotalpaidfororders = res.data;
          dispatch(getFullyReceivedAndTotalPaidForOrderListSuccess(fullyreceivedandtotalpaidfororders));
          })
        .catch(err => {
          dispatch(getFullyReceivedAndTotalPaidForOrderListStart(err));
        });
    };
};

export const getFullyReceivedAndTotalPaidForOrder = (id, token) => {
  return dispatch => {
      dispatch(getFullyReceivedAndTotalPaidForOrderDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${fullyreceivedandtotalpaidforordersURL}${id}`, headers)
        .then(res => {
          const fullyreceivedandtotalpaidfororder = res.data;
          dispatch(getFullyReceivedAndTotalPaidForOrderDetailSuccess(fullyreceivedandtotalpaidfororder));
          })
        .catch(err => {
          dispatch(getFullyReceivedAndTotalPaidForOrderDetailFail(err));
        });
    };
};

export const addFullyReceivedAndTotalPaidForOrder = (fullyreceivedandtotalpaidfororder, token) => {
  return dispatch => {
      dispatch(createFullyReceivedAndTotalPaidForOrderStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(fullyreceivedandtotalpaidforordersURL, fullyreceivedandtotalpaidfororder, headers)
        .then(res => {
          dispatch(createFullyReceivedAndTotalPaidForOrderSuccess(fullyreceivedandtotalpaidfororder));
        })
        .catch(err => {
          dispatch(createFullyReceivedAndTotalPaidForOrderFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editFullyReceivedAndTotalPaidForOrder = (id, fullyreceivedandtotalpaidfororder, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${fullyreceivedandtotalpaidforordersURL}${id}/`, fullyreceivedandtotalpaidfororder, headers)
    .then(res => {
        dispatch({
            type: EDIT_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
