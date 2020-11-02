import axios from 'axios';
import {
        ADD_STOCK_ADJUSTMENT,
        GET_STOCK_ADJUSTMENTS,
        DELETE_STOCK_ADJUSTMENT,
        GET_STOCK_ADJUSTMENT,
        EDIT_STOCK_ADJUSTMENT
    } from '../types/stockadjustmentTypes';
import { stockadjustmentsURL } from '../constants';

// Get
export const getStockAdjustments = () => dispatch => {
    axios.get(stockadjustmentsURL)
        .then(res => {
            dispatch({
                type: GET_STOCK_ADJUSTMENTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteStockAdjustment = (id) => dispatch => {
    axios.delete(stockadjustmentsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_STOCK_ADJUSTMENT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addStockAdjustment = (stockadjustment) => dispatch => {
    axios.post(stockadjustmentsURL, stockadjustment)
        .then(res => {
            dispatch({
                type: ADD_STOCK_ADJUSTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getStockAdjustment = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/stockadjustments/${id}`)
        .then(res => {
            dispatch({
                type: GET_STOCK_ADJUSTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editStockAdjustment = (id, stockadjustment) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/inventory/stockadjustments/${id}/`, stockadjustment)
        .then(res => {
            dispatch({
                type: EDIT_STOCK_ADJUSTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
