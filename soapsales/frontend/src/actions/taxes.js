import axios from 'axios';
import {
        ADD_TAX,
        GET_TAXES,
        DELETE_TAX,
        EDIT_TAX
    } from '../types/taxTypes';
import { taxesURL } from '../constants';

// Get
export const getTaxes = () => dispatch => {
    axios.get(taxesURL)
        .then(res => {
            dispatch({
                type: GET_TAXES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteTax = (id) => dispatch => {
    axios.delete(taxesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_TAX,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addTax = (tax) => dispatch => {
    axios.post(taxesURL, tax)
        .then(res => {
            dispatch({
                type: ADD_TAX,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const editTax = (tax) => dispatch => {
    axios.put(taxesURL, tax)
        .then(res => {
            dispatch({
                type: EDIT_TAX,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
