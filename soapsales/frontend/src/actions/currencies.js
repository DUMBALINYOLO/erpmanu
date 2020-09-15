import axios from 'axios';
import {
        ADD_CURRENCY,
        GET_CURRENCIES,
        DELETE_CURRENCY,
        EDIT_CURRENCY
    } from '../types/currencyTypes';
import { currenciesURL } from '../constants';

// Get
export const getCurrencies = () => dispatch => {
    axios.get(currenciesURL)
        .then(res => {
            dispatch({
                type: GET_CURRENCIES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteCurrency = (id) => dispatch => {
    axios.delete(currenciesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_CURRENCY,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCurrency = (currency) => dispatch => {
    axios.post(currenciesURL, currency)
        .then(res => {
            dispatch({
                type: ADD_CURRENCY,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Edit
export const editCurrency = (id, currency) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/accounting/currencies/${id}/`, currency)
        .then(res => {
            dispatch({
                type: EDIT_CURRENCY,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
