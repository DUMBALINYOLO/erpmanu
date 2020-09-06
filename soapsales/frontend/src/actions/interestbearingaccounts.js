import axios from 'axios';
import {
        ADD_INTEREST_BEARING_ACCOUNT,
        GET_INTEREST_BEARING_ACCOUNTS,
        DELETE_INTEREST_BEARING_ACCOUNT,
        GET_INTEREST_BEARING_ACCOUNT,
        EDIT_INTEREST_BEARING_ACCOUNT
    } from '../types/interestbearingaccountTypes';
import { interestbearingaccountsURL } from '../constants';

// Get
export const getInterestBearingAccounts = () => dispatch => {
    axios.get(interestbearingaccountsURL)
        .then(res => {
            dispatch({
                type: GET_INTEREST_BEARING_ACCOUNTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteInterestBearingAccount = (id) => dispatch => {
    axios.delete(interestbearingaccountsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_INTEREST_BEARING_ACCOUNT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addInterestBearingAccount = (interestbearingaccount) => dispatch => {
    axios.post(interestbearingaccountsURL, interestbearingaccount)
        .then(res => {
            dispatch({
                type: ADD_INTEREST_BEARING_ACCOUNT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getInterestBearingAccount = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/interest-bearing-accounts/${id}`)
        .then(res => {
            dispatch({
                type: GET_INTEREST_BEARING_ACCOUNT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}


//Edit
export const editInterestBearingAccount = (id, interestbearingaccount) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/accounting/interest-bearing-accounts/${id}/`, interestbearingaccount)
        .then(res => {
            dispatch({
                type: EDIT_INTEREST_BEARING_ACCOUNT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
