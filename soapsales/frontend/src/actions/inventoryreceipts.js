import axios from 'axios';
import {
        ADD_INVENTORY_RECEIPT,
        GET_INVENTORY_RECEIPTS,
        DELETE_INVENTORY_RECEIPT,
        GET_INVENTORY_RECEIPT
    } from '../types/inventoryreceiptTypes';
import { inventoryreceiptsURL } from '../constants';

// Get
export const getInventoryReceipts = () => dispatch => {
    axios.get(inventoryreceiptsURL)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_RECEIPTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteInventoryReceipt = (id) => dispatch => {
    axios.delete(inventoryreceiptsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_INVENTORY_RECEIPT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addInventoryReceipt = (inventoryreceipt) => dispatch => {
    axios.post(inventoryreceiptsURL, inventoryreceipt)
        .then(res => {
            dispatch({
                type: ADD_INVENTORY_RECEIPT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getInventoryReceipt = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/inventoryreceipts/${id}`)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_RECEIPT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
