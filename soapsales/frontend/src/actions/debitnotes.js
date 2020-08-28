import axios from 'axios';
import {
        ADD_DEBIT_NOTE,
        GET_DEBIT_NOTES,
        DELETE_DEBIT_NOTE,
        GET_DEBIT_NOTE
    } from '../types/debitnoteTypes';
import { debitnotesURL } from '../constants';

// Get
export const getDebitNotes = () => dispatch => {
    axios.get(debitnotesURL)
        .then(res => {
            dispatch({
                type: GET_DEBIT_NOTES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteDebitNote = (id) => dispatch => {
    axios.delete(debitnotesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_DEBIT_NOTE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addDebitNote = (debitnote) => dispatch => {
    axios.post(debitnotesURL, debitnote)
        .then(res => {
            dispatch({
                type: ADD_DEBIT_NOTE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getDebitNote = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/debit-notes/${id}`)
        .then(res => {
            dispatch({
                type: GET_DEBIT_NOTE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
