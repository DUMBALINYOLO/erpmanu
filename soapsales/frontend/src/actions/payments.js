import axios from 'axios';
import { GET_PAYMENTS, GET_PAYMENT, ADD_PAYMENT, EDIT_PAYMENT, DELETE_PAYMENT } from '../types/paymentTypes';
import { paymentsURL } from '../constants';

// Get
export const getPayments = () => dispatch => {
    axios.get(paymentsURL)
        .then(res => {
            dispatch({
                type: GET_PAYMENTS ,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deletePayment = (id) => dispatch => {
    axios.delete(paymentsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_PAYMENT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addPayment = (payment) => dispatch => {
    axios.post(paymentsURL, payment)
        .then(res => {
            dispatch({
                type: ADD_PAYMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Get
export const getPayment = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/payments/${id}`)
        .then(res => {
            dispatch({
                type: GET_PAYMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}


export const editPayment = (id, payment) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/sales/payments/${id}`, payment)
        .then(res => {
            dispatch({
                type: EDIT_PAYMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}































