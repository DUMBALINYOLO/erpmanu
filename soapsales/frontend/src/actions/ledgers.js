import axios from 'axios';
import {
        GET_LEDGERS,
        DELETE_LEDGER,
        GET_LEDGER,
        ADD_LEDGER,
        EDIT_LEDGER
    } from '../types/ledgerTypes';
import { ledgersURL } from '../constants';


// Get
export const getLedgers = () => dispatch => {
    axios.get(ledgersURL)
        .then(res => {
            dispatch({
                type: GET_LEDGERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

// Add
export const addLedger = (ledger) => dispatch => {
    axios.post(ledgersURL, ledger)
        .then(res => {
            dispatch({
                type: ADD_LEDGER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteLedger = (id) => dispatch => {
    axios.delete(ledgersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_LEDGER,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getLedger = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/ledgers/${id}`)
        .then(res => {
            dispatch({
                type: GET_LEDGER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editLedger = (id, ledger) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/accounting/ledgers/${id}/`, ledger)
        .then(res => {
            dispatch({
                type: EDIT_LEDGER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
