import axios from 'axios';
import { ADD_PROCESSED_PRODUCT_STOCK_RECEIPT, GET_PROCESSED_PRODUCT_STOCK_RECEIPTS, GET_PROCESSED_PRODUCT_STOCK_RECEIPT, DELETE_PROCESSED_PRODUCT_STOCK_RECEIPT } from '../types/processedproductstockreceiptTypes';
import { processedproductstockreceiptsURL } from '../constants';

// Get
export const getProcessedProductStockReceipts=  () => dispatch => {
    axios.get(processedproductstockreceiptsURL)
        .then(res => {
            dispatch({
                type:  GET_PROCESSED_PRODUCT_STOCK_RECEIPTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteProcessedProductStockReceipt = (id) => dispatch => {
    axios.delete(processedproductstockreceiptsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_PROCESSED_PRODUCT_STOCK_RECEIPT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addProcessedProductStockReceipt = processedproductstockreceipt => dispatch => {
    axios.post(processedproductstockreceiptsURL, processedproductstockreceipt)
        .then(res => {
            dispatch({
                type: ADD_PROCESSED_PRODUCT_STOCK_RECEIPT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getProcessedProductStockReceipt = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/processed-product-stock-receipts/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROCESSED_PRODUCT_STOCK_RECEIPT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
