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
import { updateObject } from "../utility";

const initialState = {
    inventoryreceipts: [],
    inventoryreceipt: {},
    loading: false,
    error: null,
}

const getInventoryReceiptListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryReceiptListSuccess = (state, action) => {
  return updateObject(state, {
    inventoryreceipts: action.inventoryreceipts,
    error: null,
    loading: false
  });
};

const getInventoryReceiptListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createInventoryReceiptStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createInventoryReceiptSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createInventoryReceiptFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getInventoryReceiptDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryReceiptDetailSuccess = (state, action) => {
  return updateObject(state, {
    inventoryreceipt: action.inventoryreceipt,
    error: null,
    loading: false
  });
};

const getInventoryReceiptDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function inventoryreceipts(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_RECEIPTS_START:
            return getInventoryReceiptListStart(state, action);
        case GET_INVENTORY_RECEIPTS_SUCCESS:
            return getInventoryReceiptListSuccess(state, action);
        case GET_INVENTORY_RECEIPTS_FAIL:
            return getInventoryReceiptListFail(state, action);
        case CREATE_INVENTORY_RECEIPT_START:
            return createInventoryReceiptStart(state, action);
        case CREATE_INVENTORY_RECEIPT_SUCCESS:
            return createInventoryReceiptSuccess(state, action);
        case CREATE_INVENTORY_RECEIPT_FAIL:
            return createInventoryReceiptFail(state, action);
        case GET_INVENTORY_RECEIPT_START:
        return getInventoryReceiptDetailStart(state, action);
        case GET_INVENTORY_RECEIPT_SUCCESS:
            return getInventoryReceiptDetailSuccess(state, action);
        case GET_INVENTORY_RECEIPT_FAIL:
            return getInventoryReceiptDetailFail(state, action);
        case EDIT_INVENTORY_RECEIPT:
            const arrayList = state.inventoryreceipts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                inventoryreceipts: arrayList,
            };
        default:
            return state;
    }
}
