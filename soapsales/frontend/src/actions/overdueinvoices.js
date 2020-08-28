import axios from 'axios';
import {
        GET_OVERDUE_INVOICES,
        DELETE_OVERDUE_INVOICE,
        GET_OVERDUE_INVOICE
    } from '../types/overdueinvoiceTypes';
import { overdueinvoicesURL } from '../constants';

// Get
export const getOverdueInvoices = () => dispatch => {
    axios.get(overdueinvoicesURL)
        .then(res => {
            dispatch({
                type: GET_OVERDUE_INVOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteOverdueInvoice = (id) => dispatch => {
    axios.delete(overdueinvoicesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_OVERDUE_INVOICE,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getOverdueInvoice = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/overdue-invoices/${id}`)
        .then(res => {
            dispatch({
                type: GET_OVERDUE_INVOICE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
