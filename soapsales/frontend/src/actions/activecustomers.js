import axios from 'axios';
import {
        GET_ACTIVE_CUSTOMERS,
        ADD_ACTIVE_CUSTOMER
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
