import axios from 'axios';
import {
        ADD_MANUFACTURED_STOCK_ITEM,
        GET_MANUFACTURED_STOCK_ITEMS,
        DELETE_MANUFACTURED_STOCK_ITEM,
        GET_MANUFACTURED_STOCK_ITEM,
        EDIT_MANUFACTURED_STOCK_ITEM
    } from '../types/manufacturedstockitemTypes';
import { manufacturedstockitemsURL } from '../constants';

// Get
export const getManufacturedStockItems = () => dispatch => {
    axios.get(manufacturedstockitemsURL)
        .then(res => {
            dispatch({
                type: GET_MANUFACTURED_STOCK_ITEMS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteManufacturedStockItem = (id) => dispatch => {
    axios.delete(manufacturedstockitemsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_MANUFACTURED_STOCK_ITEM,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addManufacturedStockItem = (manufacturedstockitem) => dispatch => {
    axios.post(manufacturedstockitemsURL, manufacturedstockitem)
        .then(res => {
            dispatch({
                type: ADD_MANUFACTURED_STOCK_ITEM,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getManufacturedStockItem = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/manufactured-stock-items/${id}`)
        .then(res => {
            dispatch({
                type: GET_MANUFACTURED_STOCK_ITEM,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editManufacturedStockItem = (id, manufacturedstockitem) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/manufacture/manufactured-stock-items/${id}/`, manufacturedstockitem)
        .then(res => {
            dispatch({
                type: EDIT_MANUFACTURED_STOCK_ITEM,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
