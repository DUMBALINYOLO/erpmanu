import axios from 'axios';
import {
        ADD_ORDER_ITEM,
        GET_ORDER_ITEMS,
        DELETE_ORDER_ITEM,
        GET_ORDER_ITEM,
        EDIT_ORDER_ITEM
    } from '../types/orderitemTypes';
import { orderitemsURL } from '../constants';

// Get
export const getOrderItems = () => dispatch => {
    axios.get(orderitemsURL)
        .then(res => {
            dispatch({
                type: GET_ORDER_ITEMS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteOrderItem = (id) => dispatch => {
    axios.delete(orderitemsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_ORDER_ITEM,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addOrderItem = (orderitem) => dispatch => {
    axios.post(orderitemsURL, orderitem)
        .then(res => {
            dispatch({
                type: ADD_ORDER_ITEM,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getOrderItem = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/orderitems/${id}`)
        .then(res => {
            dispatch({
                type: GET_ORDER_ITEM,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editOrderItem = (id, orderitem) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/inventory/orderitems/${id}/`, orderitem)
        .then(res => {
            dispatch({
                type: EDIT_ORDER_ITEM,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
