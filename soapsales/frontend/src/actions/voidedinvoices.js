import axios from 'axios';
import {
        GET_VOIDED_INVOICES,
        DELETE_VOIDED_INVOICE,
        GET_VOIDED_INVOICE
    } from '../types/voidedinvoiceTypes';
import { voidedinvoicesURL } from '../constants';

// Get
export const getVoidedInvoices = () => dispatch => {
    axios.get(voidedinvoicesURL)
        .then(res => {
            dispatch({
                type: GET_VOIDED_INVOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteVoidedInvoice = (id) => dispatch => {
    axios.delete(voidedinvoicesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_VOIDED_INVOICE,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getVoidedInvoice = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/voided-invoices/${id}`)
        .then(res => {
            dispatch({
                type: GET_VOIDED_INVOICE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
