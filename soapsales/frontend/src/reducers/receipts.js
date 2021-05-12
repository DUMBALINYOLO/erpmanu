import { 
    GET_RECEIPTS_START,
    GET_RECEIPTS_SUCCESS,
    GET_RECEIPTS_FAIL,
    GET_RECEIPT_START,
    GET_RECEIPT_SUCCESS,
    GET_RECEIPT_FAIL
} from '../types/receiptTypes';
import { updateObject } from "../utility";

const initialState = {
    receipts: [],
    receipt: {},
    loading: false,
    error: null,
}

const getReceiptListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getReceiptListSuccess = (state, action) => {
  return updateObject(state, {
    receipts: action.receipts,
    error: null,
    loading: false
  });
};

const getReceiptListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getReceiptDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getReceiptDetailSuccess = (state, action) => {
  return updateObject(state, {
    receipt: action.receipt,
    error: null,
    loading: false
  });
};

const getReceiptDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function receipts(state = initialState, action){
    switch(action.type){
        case GET_RECEIPTS_START:
            return getReceiptListStart(state, action);
        case GET_RECEIPTS_SUCCESS:
            return getReceiptListSuccess(state, action);
        case GET_RECEIPTS_FAIL:
            return getReceiptListFail(state, action);
        case GET_RECEIPT_START:
            return getReceiptDetailStart(state, action);
        case GET_RECEIPT_SUCCESS:
            return getReceiptDetailSuccess(state, action);
        case GET_RECEIPT_FAIL:
            return getReceiptDetailFail(state, action);
        default:
            return state;
    }
}
