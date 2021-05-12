import axios from 'axios';
import { 
    GET_RECEIPTS_START,
    GET_RECEIPTS_SUCCESS,
    GET_RECEIPTS_FAIL,
    GET_RECEIPT_START,
    GET_RECEIPT_SUCCESS,
    GET_RECEIPT_FAIL 
} from '../types/receiptTypes';
import { receiptsURL } from '../constants';

//receipts
const getReceiptListStart = () => {
  return {
    type: GET_RECEIPTS_START
  };
};

const getReceiptListSuccess = receipts => {
  return {
    type: GET_RECEIPTS_SUCCESS,
    receipts
  };
};

const getReceiptListFail = error => {
  return {
    type: GET_RECEIPTS_FAIL,
    error: error
  };
};

const getReceiptDetailStart = () => {
  return {
    type: GET_RECEIPT_START
  };
};

const getReceiptDetailSuccess = receipt => {
  return {
    type: GET_RECEIPT_SUCCESS,
    receipt
  };
};

const getReceiptDetailFail = error => {
  return {
    type: GET_RECEIPT_FAIL,
    error: error
  };
};

export const getReceipts = (token) => {
  return dispatch => {
      dispatch(getReceiptListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(receiptsURL, headers)
        .then(res => {
          const receipts = res.data;
          dispatch(getReceiptListSuccess(receipts));
          })
        .catch(err => {
          dispatch(getReceiptListStart(err));
        });
    };
};

export const getReceipt = (id, token) => {
  return dispatch => {
      dispatch(getReceiptDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${receiptsURL}${id}`, headers)
        .then(res => {
          const receipt = res.data;
          dispatch(getReceiptDetailSuccess(receipt));
          })
        .catch(err => {
          dispatch(getReceiptDetailFail(err));
        });
    };
};

