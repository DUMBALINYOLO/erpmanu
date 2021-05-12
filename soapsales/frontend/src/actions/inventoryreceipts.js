import axios from 'axios';
import {
    GET_INVENTORY_RECEIPTS_START,
    GET_INVENTORY_RECEIPTS_SUCCESS,
    GET_INVENTORY_RECEIPTS_FAIL,
    CREATE_INVENTORY_RECEIPT_START,
    CREATE_INVENTORY_RECEIPT_SUCCESS,
    CREATE_INVENTORY_RECEIPT_FAIL,
    GET_INVENTORY_RECEIPT_START,
    GET_INVENTORY_RECEIPT_SUCCESS,
    GET_INVENTORY_RECEIPT_FAIL,
    EDIT_INVENTORY_RECEIPT
    } from '../types/inventoryreceiptTypes';
import { inventoryreceiptsURL } from '../constants';

//inventory receipts
const getInventoryReceiptListStart = () => {
  return {
    type: GET_INVENTORY_RECEIPTS_START
  };
};

const getInventoryReceiptListSuccess = inventoryreceipts => {
  return {
    type: GET_INVENTORY_RECEIPTS_SUCCESS,
    inventoryreceipts
  };
};

const getInventoryReceiptListFail = error => {
  return {
    type: GET_INVENTORY_RECEIPTS_FAIL,
    error: error
  };
};

const createInventoryReceiptStart = () => {
  return {
    type: CREATE_INVENTORY_RECEIPT_START
  };
};

const createInventoryReceiptSuccess = inventoryreceipt => {
  return {
    type: CREATE_INVENTORY_RECEIPT_SUCCESS,
    inventoryreceipt
  };
};

const createInventoryReceiptFail = error => {
  return {
    type: CREATE_INVENTORY_RECEIPT_FAIL,
    error: error
  };
};

const getInventoryReceiptDetailStart = () => {
  return {
    type: GET_INVENTORY_RECEIPT_START
  };
};

const getInventoryReceiptDetailSuccess = inventoryreceipt => {
  return {
    type: GET_INVENTORY_RECEIPT_SUCCESS,
    inventoryreceipt
  };
};

const getInventoryReceiptDetailFail = error => {
  return {
    type: GET_INVENTORY_RECEIPT_FAIL,
    error: error
  };
};

export const getInventoryReceipts = (token) => {
  return dispatch => {
      dispatch(getInventoryReceiptListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(inventoryreceiptsURL, headers)
        .then(res => {
          const inventoryreceipts = res.data;
          dispatch(getInventoryReceiptListSuccess(inventoryreceipts));
          })
        .catch(err => {
          dispatch(getInventoryReceiptListStart(err));
        });
    };
};

export const getInventoryReceipt = (id, token) => {
  return dispatch => {
      dispatch(getInventoryReceiptDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${inventoryreceiptsURL}${id}`, headers)
        .then(res => {
          const inventoryreceipt = res.data;
          dispatch(getInventoryReceiptDetailSuccess(inventoryreceipt));
          })
        .catch(err => {
          dispatch(getInventoryReceiptDetailFail(err));
        });
    };
};

export const addInventoryReceipt = (inventoryreceipt, token) => {
  return dispatch => {
      dispatch(createInventoryReceiptStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(inventoryreceiptsURL, inventoryreceipt, headers)
        .then(res => {
          dispatch(createInventoryReceiptSuccess(inventoryreceipt));
        })
        .catch(err => {
          dispatch(createInventoryReceiptFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editInventoryReceipt = (id, inventoryreceipt, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${inventoryreceiptsURL}${id}/`, inventoryreceipt, headers)
    .then(res => {
        dispatch({
            type: EDIT_INVENTORY_RECEIPT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
