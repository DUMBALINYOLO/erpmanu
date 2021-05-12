import axios from 'axios';
import { 
    GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_START,
    GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_FAIL,
    CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_START,
    CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_SUCCESS,
    CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_FAIL,
    GET_PROCESSED_PRODUCT_STOCK_RECEIPT_START,
    GET_PROCESSED_PRODUCT_STOCK_RECEIPT_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_RECEIPT_FAIL,
    EDIT_PROCESSED_PRODUCT_STOCK_RECEIPT 
} from '../types/processedproductstockreceiptTypes';
import { processedproductstockreceiptsURL } from '../constants';

//processed product stock receipts
const getProcessedProductStockReceiptListStart = () => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_START
  };
};

const getProcessedProductStockReceiptListSuccess = processedproductstockreceipts => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_SUCCESS,
    processedproductstockreceipts
  };
};

const getProcessedProductStockReceiptListFail = error => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_RECEIPTS_FAIL,
    error: error
  };
};

const createProcessedProductStockReceiptStart = () => {
  return {
    type: CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_START
  };
};

const createProcessedProductStockReceiptSuccess = processedproductstockreceipt => {
  return {
    type: CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_SUCCESS,
    processedproductstockreceipt
  };
};

const createProcessedProductStockReceiptFail = error => {
  return {
    type: CREATE_PROCESSED_PRODUCT_STOCK_RECEIPT_FAIL,
    error: error
  };
};

const getProcessedProductStockReceiptDetailStart = () => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_RECEIPT_START
  };
};

const getProcessedProductStockReceiptDetailSuccess = processedproductstockreceipt => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_RECEIPT_SUCCESS,
    processedproductstockreceipt
  };
};

const getProcessedProductStockReceiptDetailFail = error => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_RECEIPT_FAIL,
    error: error
  };
};

export const getProcessedProductStockReceipts = (token) => {
  return dispatch => {
      dispatch(getProcessedProductStockReceiptListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(processedproductstockreceiptsURL, headers)
        .then(res => {
          const processedproductstockreceipts = res.data;
          dispatch(getProcessedProductStockReceiptListSuccess(processedproductstockreceipts));
          })
        .catch(err => {
          dispatch(getProcessedProductStockReceiptListStart(err));
        });
    };
};

export const getProcessedProductStockReceipt = (id, token) => {
  return dispatch => {
      dispatch(getProcessedProductStockReceiptDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${processedproductstockreceiptsURL}${id}`, headers)
        .then(res => {
          const processedproductstockreceipt = res.data;
          dispatch(getProcessedProductStockReceiptDetailSuccess(processedproductstockreceipt));
          })
        .catch(err => {
          dispatch(getProcessedProductStockReceiptDetailFail(err));
        });
    };
};

export const addProcessedProductStockReceipt = (processedproductstockreceipt, token) => {
  return dispatch => {
      dispatch(createInventoryCategoryStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(processedproductstockreceiptsURL, processedproductstockreceipt, headers)
        .then(res => {
          dispatch(createProcessedProductStockReceiptSuccess(processedproductstockreceipt));
        })
        .catch(err => {
          dispatch(createProcessedProductStockReceiptFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editProcessedProductStockReceipt = (id, processedproductstockreceipt, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${processedproductstockreceiptsURL}${id}/`, processedproductstockreceipt, headers)
    .then(res => {
        dispatch({
            type: EDIT_PROCESSED_PRODUCT_STOCK_RECEIPT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}