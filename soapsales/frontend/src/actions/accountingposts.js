import axios from 'axios';
import {
        ADD_ACCOUNTING_POST,
        GET_ACCOUNTING_POSTS,
        DELETE_ACCOUNTING_POST,
        GET_ACCOUNTING_POST
    } from '../types/accountingpostTypes';
import { accountingpostsURL } from '../constants';

// Get
export const getAccountingPosts = () => dispatch => {
    axios.get(accountingpostsURL)
        .then(res => {
            dispatch({
                type: GET_ACCOUNTING_POSTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteAccountingPost = (id) => dispatch => {
    axios.delete(accountingpostsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_ACCOUNTING_POST,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addAccountingPost = (accountingpost) => dispatch => {
    axios.post(accountingpostsURL, accountingpost)
        .then(res => {
            dispatch({
                type: ADD_ACCOUNTING_POST,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getAccountingPost = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/accounting-posts/${id}`)
        .then(res => {
            dispatch({
                type: GET_ACCOUNTING_POST,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
