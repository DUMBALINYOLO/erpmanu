import axios from 'axios';
import { ADD_PROCESSED_PRODUCT_STOCK_TAKE, GET_PROCESSED_PRODUCT_STOCK_TAKES, GET_PROCESSED_PRODUCT_STOCK_TAKE, DELETE_PROCESSED_PRODUCT_STOCK_TAKE } from '../types/processedproductstocktakeTypes';
import { processedproductstocktakesURL } from '../constants';

// Get
export const getProcessedProductStockTakes=  () => dispatch => {
    axios.get(processedproductstocktakesURL)
        .then(res => {
            dispatch({
                type:  GET_PROCESSED_PRODUCT_STOCK_TAKES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteProcessedProductStockTake = (id) => dispatch => {
    axios.delete(processedproductstocktakesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_PROCESSED_PRODUCT_STOCK_TAKE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addProcessedProductStockTake = processedproductstocktake => dispatch => {
    axios.post(processedproductstocktakesURL, processedproductstocktake)
        .then(res => {
            dispatch({
                type: ADD_PROCESSED_PRODUCT_STOCK_TAKE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getProcessedProductStockTake = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/processed-product-stock-takes/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROCESSED_PRODUCT_STOCK_TAKE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
