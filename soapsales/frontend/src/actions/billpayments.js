import axios from 'axios';
import {
        GET_BILL_PAYMENTS,
        DELETE_BILL_PAYMENT,
        ADD_BILL_PAYMENT,
        GET_BILL_PAYMENT,
        EDIT_BILL_PAYMENT
    } from '../types/billpaymentTypes';
import { billpaymentsURL } from '../constants';

// Get
export const getBillPayments = () => dispatch => {
    axios.get(billpaymentsURL)
        .then(res => {
            dispatch({
                type: GET_BILL_PAYMENTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteBillPayment = (id) => dispatch => {
    axios.delete(billpaymentsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_BILL_PAYMENT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addBillPayment = (billpayment) => dispatch => {
    axios.post(billpaymentsURL, billpayment)
        .then(res => {
            dispatch({
                type: ADD_BILL_PAYMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getBillPayment = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/bill-payments/${id}`)
        .then(res => {
            dispatch({
                type: GET_BILL_PAYMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editBillPayment = (id, billpayment) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/accounting/bill-payments/${id}/`, billpayment)
        .then(res => {
            dispatch({
                type: EDIT_BILL_PAYMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
