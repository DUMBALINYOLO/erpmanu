import axios from 'axios';
import {
        GET_FULLY_PAID_NOT_VERIFIED_BILLS,
        DELETE_FULLY_PAID_NOT_VERIFIED_BILL,
        GET_FULLY_PAID_NOT_VERIFIED_BILL
    } from '../types/fullypaidnotverifiedbillTypes';
import { fullypaidnotverifiedbillsURL } from '../constants';

// Get
export const getFullyPaidNotVerifiedBill = () => dispatch => {
    axios.get(fullypaidnotverifiedbillsURL)
        .then(res => {
            dispatch({
                type: GET_FULLY_PAID_NOT_VERIFIED_BILLS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteFullyPaidNotVerifiedBill = (id) => dispatch => {
    axios.delete(fullypaidnotverifiedbillsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_FULLY_PAID_NOT_VERIFIED_BILL,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getFullyPaidNotVerifiedBill = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/fully-paid-not-verified-bills/${id}`)
        .then(res => {
            dispatch({
                type: GET_FULLY_PAID_NOT_VERIFIED_BILL,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
