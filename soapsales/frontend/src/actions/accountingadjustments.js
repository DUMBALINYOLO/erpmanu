import axios from 'axios';
import {
        ADD_ACCOUNTING_ADJUSTMENT,
        GET_ACCOUNTING_ADJUSTMENTS,
        DELETE_ACCOUNTING_ADJUSTMENT,
        GET_ACCOUNTING_ADJUSTMENT,
        EDIT_ACCOUNTING_ADJUSTMENT
    } from '../types/accountingadjustmentTypes';
import { accountingadjustmentsURL } from '../constants';

// Get
export const getAccountingAdjustments = () => dispatch => {
    axios.get(accountingadjustmentsURL)
        .then(res => {
            dispatch({
                type: GET_ACCOUNTING_ADJUSTMENTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}


//Delete
export const deleteAccountingAdjustment = (id) => dispatch => {
    axios.delete(accountingadjustmentsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_ACCOUNTING_ADJUSTMENT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addAccountingAdjustment = (accountingadjustment) => dispatch => {
    axios.post(accountingadjustmentsURL, accountingadjustment)
        .then(res => {
            dispatch({
                type: ADD_ACCOUNTING_ADJUSTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getAccountingAdjustment = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/accounting-adjustments/${id}`)
        .then(res => {
            dispatch({
                type: GET_ACCOUNTING_ADJUSTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editAccountingAdjustment = (id, accountingadjustment) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/accounting/accounting-adjustments/${id}/`, accountingadjustment)
        .then(res => {
            dispatch({
                type: EDIT_ACCOUNTING_ADJUSTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
