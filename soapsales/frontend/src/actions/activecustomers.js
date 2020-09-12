import axios from 'axios';
import {
        GET_ACTIVE_CUSTOMERS,
        ADD_ACTIVE_CUSTOMER,
        DELETE_ACTIVE_CUSTOMER,
        EDIT_ACTIVE_CUSTOMER,
        GET_ACTIVE_CUSTOMER
    } from '../types/activecustomerTypes';
import { activecustomersURL } from '../constants';

// Get
export const getActiveCustomers = () => dispatch => {
    axios.get(activecustomersURL)
        .then(res => {
            dispatch({
                type: GET_ACTIVE_CUSTOMERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}


//Delete
export const deleteActiveCustomer = (id) => dispatch => {
    axios.delete(activecustomersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_ACTIVE_CUSTOMER,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addActiveCustomer = (activecustomer) => dispatch => {
    axios.post(activecustomersURL, activecustomer)
        .then(res => {
            dispatch({
                type: ADD_ACTIVE_CUSTOMER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getActiveCustomer = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/customers/active-customers/${id}`)
        .then(res => {
            dispatch({
                type: GET_ACTIVE_CUSTOMER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editActiveCustomer = (id, activecustomer) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/customers/active-customers/${id}/`, activecustomer)
        .then(res => {
            dispatch({
                type: EDIT_ACTIVE_CUSTOMER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
