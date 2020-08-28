import axios from 'axios';
import {
        GET_UNVERIFIED_INVOICES,
        DELETE_UNVERIFIED_INVOICE,
        GET_UNVERIFIED_INVOICE
    } from '../types/unverifiedinvoiceTypes';
import { unverifiedinvoicesURL } from '../constants';

// Get
export const getUnverifiedInvoices = () => dispatch => {
    axios.get(unverifiedinvoicesURL)
        .then(res => {
            dispatch({
                type: GET_UNVERIFIED_INVOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteUnverifiedInvoice = (id) => dispatch => {
    axios.delete(unverifiedinvoicesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_UNVERIFIED_INVOICE,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getUnverifiedInvoice = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/unverified-invoices/${id}`)
        .then(res => {
            dispatch({
                type: GET_UNVERIFIED_INVOICE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
