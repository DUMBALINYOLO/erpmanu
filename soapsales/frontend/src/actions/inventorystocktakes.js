import axios from 'axios';
import {
        ADD_INVENTORY_STOCK_TAKE,
        GET_INVENTORY_STOCK_TAKES,
        DELETE_INVENTORY_STOCK_TAKE,
        GET_INVENTORY_STOCK_TAKE
    } from '../types/inventorystocktakeTypes';
import { inventorystocktakesURL } from '../constants';

// Get
export const getInventoryStockTakes = () => dispatch => {
    axios.get(inventorystocktakesURL)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_STOCK_TAKES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteInventoryStockTake = (id) => dispatch => {
    axios.delete(inventorystocktakesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_INVENTORY_STOCK_TAKE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addInventoryStockTake = (inventorystocktake) => dispatch => {
    axios.post(inventorystocktakesURL, inventorystocktake)
        .then(res => {
            dispatch({
                type: ADD_INVENTORY_STOCK_TAKE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getInventoryStockTake = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/inventorystocktakes/${id}`)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_STOCK_TAKE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
