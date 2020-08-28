import axios from 'axios';
import {
        ADD_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER,
        GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS,
        DELETE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER,
        GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER
    } from '../types/fullyreceivedandtotalpaidfororderTypes';
import { fullyreceivedandtotalpaidforordersURL } from '../constants';

// Get
export const getFullyReceivedAndTotalPaidForOrders = () => dispatch => {
    axios.get(fullyreceivedandtotalpaidforordersURL)
        .then(res => {
            dispatch({
                type: GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteFullyReceivedAndTotalPaidForOrder = (id) => dispatch => {
    axios.delete(fullyreceivedandtotalpaidforordersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addFullyReceivedAndTotalPaidForOrder = (fullyreceivedandtotalpaidfororder) => dispatch => {
    axios.post(fullyreceivedandtotalpaidforordersURL, fullyreceivedandtotalpaidfororder)
        .then(res => {
            dispatch({
                type: ADD_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getFullyReceivedAndTotalPaidForOrder = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/fully-received-and-total-paid-for-orders/${id}`)
        .then(res => {
            dispatch({
                type: GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
