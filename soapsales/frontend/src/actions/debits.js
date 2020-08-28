import axios from 'axios';
import {
        GET_DEBITS,
        DELETE_DEBIT,
        GET_DEBIT
    } from '../types/debitTypes';
import { debitsURL } from '../constants';

// Get
export const getDebits = () => dispatch => {
    axios.get(debitsURL)
        .then(res => {
            dispatch({
                type: GET_DEBITS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteDebit = (id) => dispatch => {
    axios.delete(debitsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_DEBIT,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getDebit = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/debits/${id}`)
        .then(res => {
            dispatch({
                type: GET_DEBIT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
