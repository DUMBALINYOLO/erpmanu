import axios from 'axios';
import { ADD_PROCESSED_PRODUCT_STOCK_ADJUSTMENT, EDIT_PROCESSED_PRODUCT_STOCK_ADJUSTMENT, GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS, GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT, DELETE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT } from '../types/processedproductstockadjustmentTypes';
import { processedproductstockadjustmentsURL } from '../constants';

// Get
export const getProcessedProductStockAdjustments=  () => dispatch => {
    axios.get(processedproductstockadjustmentsURL)
        .then(res => {
            dispatch({
                type:  GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteProcessedProductStockAdjustment = (id) => dispatch => {
    axios.delete(processedproductstockadjustmentsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addProcessedProductStockAdjustment = processedproductstockadjustment => dispatch => {
    axios.post(processedproductstockadjustmentsURL, processedproductstockadjustment)
        .then(res => {
            dispatch({
                type: ADD_PROCESSED_PRODUCT_STOCK_ADJUSTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getProcessedProductStockAdjustment = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/processed-product-stock-adjustments/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editProcessedProductStockAdjustment = (id, processedproductstockadjustment) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/manufacture/processed-product-stock-adjustments/${id}/`, processedproductstockadjustment)
        .then(res => {
            dispatch({
                type: EDIT_PROCESSED_PRODUCT_STOCK_ADJUSTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
