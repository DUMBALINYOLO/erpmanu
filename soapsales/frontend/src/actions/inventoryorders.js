import axios from 'axios';
import {
        ADD_INVENTORY_ORDER,
        GET_INVENTORY_ORDERS,
        DELETE_INVENTORY_ORDER,
        GET_INVENTORY_ORDER
    } from '../types/inventoryorderTypes';
import { inventoryordersURL } from '../constants';

// Get
export const getInventoryOrders = () => dispatch => {
    axios.get(inventoryordersURL)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_ORDERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteInventoryOrder = (id) => dispatch => {
    axios.delete(inventoryordersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_INVENTORY_ORDER,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addInventoryOrder= (inventoryorder) => dispatch => {
    axios.post(inventoryordersURL, inventoryorder)
        .then(res => {
            dispatch({
                type: ADD_INVENTORY_ORDER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getInventoryOrder = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/inventory-orders/${id}`)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_ORDER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
