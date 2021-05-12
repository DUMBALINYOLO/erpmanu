import { 
    GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_START,
    GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_FAIL,
    GET_PROCESSED_PRODUCT_STOCK_RECEIPT_START,
    GET_PROCESSED_PRODUCT_STOCK_RECEIPT_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_RECEIPT_FAIL,
    CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_START,
    CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_SUCCESS,
    CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_FAIL,
    EDIT_PROCESSED_PRODUCT_STOCK_RECEIPT
} from '../types/processedproductstockreceiptTypes';
import { updateObject } from "../utility";

const initialState = {
    processedproductstockreceipts: [],
    processedproductstockreceipt: {},
    loading: false,
    error: null,
}

const getProcessedProductStockReceiptListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessedProductStockReceiptListSuccess = (state, action) => {
  return updateObject(state, {
    processedproductstockreceipts: action.processedproductstockreceipts,
    error: null,
    loading: false
  });
};

const getProcessedProductStockReceiptListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProcessedProductStockReceiptStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProcessedProductStockReceiptSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProcessedProductStockReceiptFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProcessedProductStockReceiptDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessedProductStockReceiptDetailSuccess = (state, action) => {
  return updateObject(state, {
    processedproductstockreceipt: action.processedproductstockreceipt,
    error: null,
    loading: false
  });
};

const getProcessedProductStockReceiptDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function processedproductstockreceipts(state = initialState, action){
    switch(action.type){
        case GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_START:
            return getProcessedProductStockReceiptListStart(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_SUCCESS:
            return getProcessedProductStockReceiptListSuccess(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_FAIL:
            return getProcessedProductStockReceiptListFail(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_RECEIPT_START:
            return getProcessedProductStockReceiptDetailStart(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_RECEIPT_SUCCESS:
            return getProcessedProductStockReceiptDetailSuccess(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_RECEIPT_FAIL:
            return getProcessedProductStockReceiptDetailFail(state, action);
        case CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_START:
            return createProcessedProductStockReceiptStart(state, action);
        case CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_SUCCESS:
            return createProcessedProductStockReceiptSuccess(state, action);
        case CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_FAIL:
            return createProcessedProductStockReceiptFail(state, action);
        case EDIT_PROCESSED_PRODUCT_STOCK_RECEIPT:
            const arrayList = state.processedproductstockreceipts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                processedproductstockreceipts: arrayList,
            };
        default:
            return state;
    }
}
