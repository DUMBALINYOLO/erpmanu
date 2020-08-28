import axios from 'axios';
import {
        GET_REFUNDED_INVOICES,
        DELETE_REFUNDED_INVOICE,
        GET_REFUNDED_INVOICE
    } from '../types/refundedinvoiceTypes';
import { refundedinvoicesURL } from '../constants';

// Get
export const getRefundedInvoices = () => dispatch => {
    axios.get(refundedinvoicesURL)
        .then(res => {
            dispatch({
                type: GET_REFUNDED_INVOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteRefundedInvoice = (id) => dispatch => {
    axios.delete(refundedinvoicesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_REFUNDED_INVOICE,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getRefundedInvoice = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/refunded-invoices/${id}`)
        .then(res => {
            dispatch({
                type: GET_REFUNDED_INVOICE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
