import axios from 'axios';
import {
        ADD_INVENTORY_ORDERPAYMENT,
        GET_INVENTORY_ORDERPAYMENTS,
        DELETE_INVENTORY_ORDERPAYMENT,
        GET_INVENTORY_ORDERPAYMENT
    } from '../types/inventoryorderpaymentTypes';
import { inventoryorderpaymentsURL } from '../constants';

// Get
export const getInventoryOrderpayments = () => dispatch => {
    axios.get(inventoryorderpaymentsURL)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_ORDERPAYMENTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteInventoryOrderpayment = (id) => dispatch => {
    axios.delete(inventoryorderpaymentsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_INVENTORY_ORDERPAYMENT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addInventoryOrderpayment = (inventoryorderpayment) => dispatch => {
    axios.post(inventoryorderpaymentsURL, inventoryorderpayment)
        .then(res => {
            dispatch({
                type: ADD_INVENTORY_ORDERPAYMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getInventoryOrderpayment = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/inventory-orderpayments/${id}`)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_ORDERPAYMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
