import axios from 'axios';
import {
        ADD_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER,
        GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS,
        DELETE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER,
        GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER
    } from '../types/fullyreceivedtotalpaidforandverifiedorderTypes';
import { fullyreceivedtotalpaidforandverifiedordersURL } from '../constants';

// Get
export const getFullyReceivedTotalPaidForAndVerifiedOrders = () => dispatch => {
    axios.get(fullyreceivedtotalpaidforandverifiedordersURL)
        .then(res => {
            dispatch({
                type: GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteFullyReceivedTotalPaidForAndVerifiedOrder = (id) => dispatch => {
    axios.delete(fullyreceivedtotalpaidforandverifiedordersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addFullyReceivedTotalPaidForAndVerifiedOrder = (fullyreceivedtotalpaidforandverifiedorder) => dispatch => {
    axios.post(fullyreceivedtotalpaidforandverifiedordersURL, fullyreceivedtotalpaidforandverifiedorder)
        .then(res => {
            dispatch({
                type: ADD_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getFullyReceivedTotalPaidForAndVerifiedOrder = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/fully-received-total-paid-for-and-verified-orders/${id}`)
        .then(res => {
            dispatch({
                type: GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
