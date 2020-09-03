import axios from 'axios';
import {
        GET_ACTIVE_CUSTOMERS
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
