import axios from 'axios';
import {
        GET_INVOICES,
        ADD_INVOICE,
        GET_ERRORS,
    } from './types';
import { invoicesURL } from '../constants';

// Get
export const getInvoices = () => dispatch => {
    axios.get(invoicesURL)
        .then(res => {
            dispatch({
                type: GET_INVOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

// Add
export const addInvoice = invoice => dispatch => {
    axios.post(invoicesURL, invoice)
        .then(res => {
            dispatch({
                type: ADD_INVOICE,
                payload: res.data
            });
        }).catch(err =>{
            const errors = {
                msg: err.response.data,
                status: err.response.status

        }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        });
    });
}