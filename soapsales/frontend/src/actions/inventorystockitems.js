import axios from 'axios';
import {
        ADD_INVENTORY_STOCK_ITEM,
        GET_INVENTORY_STOCK_ITEMS,
        DELETE_INVENTORY_STOCK_ITEM,
        GET_INVENTORY_STOCK_ITEM
    } from '../types/inventorystockitemTypes';
import { inventorystockitemsURL } from '../constants';

// Get
export const getInventoryStockItems = () => dispatch => {
    axios.get(inventorystockitemsURL)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_STOCK_ITEMS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteInventoryStockItem = (id) => dispatch => {
    axios.delete(inventorystockitemsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_INVENTORY_STOCK_ITEM,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addInventoryStockItem = (inventorystockitem) => dispatch => {
    axios.post(inventorystockitemsURL, inventorystockitem)
        .then(res => {
            dispatch({
                type: ADD_INVENTORY_STOCK_ITEM,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getInventoryStockItem = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/inventorystockitems/${id}`)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_STOCK_ITEM,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
