import axios from 'axios';
import {
        GET_FULLYPAID_NOT_YET_SALES_INVOICES,
        DELETE_FULLYPAID_NOT_YET_SALES_INVOICE,
        GET_FULLYPAID_NOT_YET_SALES_INVOICE
    } from '../types/fullypaidnotyetsalesinvoiceTypes';
import { fullypaidnotyetsalesinvoicesURL } from '../constants';

// Get
export const getFullypaidNotYetSalesInvoices = () => dispatch => {
    axios.get(fullypaidnotyetsalesinvoicesURL)
        .then(res => {
            dispatch({
                type: GET_FULLYPAID_NOT_YET_SALES_INVOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteFullypaidNotYetSalesInvoice = (id) => dispatch => {
    axios.delete(fullypaidnotyetsalesinvoicesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_FULLYPAID_NOT_YET_SALES_INVOICE,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getFullypaidNotYetSalesInvoice = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/sales/fullypaid-not-yet-sales-invoices/${id}`)
        .then(res => {
            dispatch({
                type: GET_FULLYPAID_NOT_YET_SALES_INVOICE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
