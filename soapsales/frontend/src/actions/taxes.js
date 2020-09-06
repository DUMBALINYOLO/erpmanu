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

//Edit
export const editTax = (id, tax) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/accounting/taxes/${id}/`, tax)
        .then(res => {
            dispatch({
                type: EDIT_TAX,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
