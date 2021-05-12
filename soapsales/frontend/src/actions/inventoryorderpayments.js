import axios from 'axios';
import {
    GET_INVENTORY_ORDERPAYMENTS_START,
    GET_INVENTORY_ORDERPAYMENTS_SUCCESS,
    GET_INVENTORY_ORDERPAYMENTS_FAIL,
    CREATE_INVENTORY_ORDERPAYMENT_START,
    CREATE_INVENTORY_ORDERPAYMENT_SUCCESS,
    CREATE_INVENTORY_ORDERPAYMENT_FAIL,
    GET_INVENTORY_ORDERPAYMENT_START,
    GET_INVENTORY_ORDERPAYMENT_SUCCESS,
    GET_INVENTORY_ORDERPAYMENT_FAIL,
    EDIT_INVENTORY_ORDERPAYMENT
    } from '../types/inventoryorderpaymentTypes';
import { inventoryorderpaymentsURL } from '../constants';

//inventory order payments
const getInventoryOrderPaymentListStart = () => {
  return {
    type: GET_INVENTORY_ORDERPAYMENTS_START
  };
};

const getInventoryOrderPaymentListSuccess = inventoryorderpayments => {
  return {
    type: GET_INVENTORY_ORDERPAYMENTS_SUCCESS,
    inventoryorderpayments
  };
};

const getInventoryOrderPaymentListFail = error => {
  return {
    type: GET_INVENTORY_ORDERPAYMENTS_FAIL,
    error: error
  };
};

const createInventoryOrderPaymentStart = () => {
  return {
    type: CREATE_INVENTORY_ORDERPAYMENT_START
  };
};

const createInventoryOrderPaymentSuccess = inventoryorderpayment => {
  return {
    type: CREATE_INVENTORY_ORDERPAYMENT_SUCCESS,
    inventoryorderpayment
  };
};

const createInventoryOrderPaymentFail = error => {
  return {
    type: CREATE_INVENTORY_ORDERPAYMENT_FAIL,
    error: error
  };
};

const getInventoryOrderPaymentDetailStart = () => {
  return {
    type: GET_INVENTORY_ORDERPAYMENT_START
  };
};

const getInventoryOrderPaymentDetailSuccess = inventoryorderpayment => {
  return {
    type: GET_INVENTORY_ORDERPAYMENT_SUCCESS,
    inventoryorderpayment
  };
};

const getInventoryOrderPaymentDetailFail = error => {
  return {
    type: GET_INVENTORY_ORDERPAYMENT_FAIL,
    error: error
  };
};

export const getInventoryOrderPayments = (token) => {
  return dispatch => {
      dispatch(getInventoryOrderPaymentListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(inventoryorderpaymentsURL, headers)
        .then(res => {
          const inventoryorderpayments = res.data;
          dispatch(getInventoryOrderPaymentListSuccess(inventoryorderpayments));
          })
        .catch(err => {
          dispatch(getInventoryOrderPaymentListStart(err));
        });
    };
};

export const getInventoryOrderPayment = (id, token) => {
  return dispatch => {
      dispatch(getInventoryOrderPaymentDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${inventoryorderpaymentsURL}${id}`, headers)
        .then(res => {
          const inventoryorderpayment = res.data;
          dispatch(getInventoryOrderPaymentDetailSuccess(inventoryorderpayment));
          })
        .catch(err => {
          dispatch(getInventoryOrderPaymentDetailFail(err));
        });
    };
};

export const addInventoryOrderPayment = (inventoryorderpayment, token) => {
  return dispatch => {
      dispatch(createInventoryOrderPaymentStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(inventoryorderpaymentsURL, inventoryorderpayment, headers)
        .then(res => {
          dispatch(createInventoryOrderPaymentSuccess(inventoryorderpayment));
        })
        .catch(err => {
          dispatch(createInventoryOrderPaymentFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editInventoryOrderPayment = (id, inventoryorderpayment, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${inventoryorderpaymentsURL}${id}/`, inventoryorderpayment, headers)
    .then(res => {
        dispatch({
            type: EDIT_INVENTORY_ORDERPAYMENT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
