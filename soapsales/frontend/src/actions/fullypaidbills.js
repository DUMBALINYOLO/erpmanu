import axios from 'axios';
import {
        GET_FULLY_PAID_BILLS,
        DELETE_FULLY_PAID_BILL,
        GET_FULLY_PAID_BILL
    } from '../types/fullypaidbillTypes';
import { fullypaidbillsURL } from '../constants';

// Get
export const getFullyPaidBills = () => dispatch => {
    axios.get(fullypaidbillsURL)
        .then(res => {
            dispatch({
                type: GET_FULLY_PAID_BILLS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteFullyPaidBill = (id) => dispatch => {
    axios.delete(fullypaidbillsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_FULLY_PAID_BILL,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getFullyPaidBill = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/fully-paid-bills/${id}`)
        .then(res => {
            dispatch({
                type: GET_FULLY_PAID_BILL,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
