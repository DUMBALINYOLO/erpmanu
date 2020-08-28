import axios from 'axios';
import {
        GET_DEACTIVATED_CUSTOMERS
    } from '../types/deactivatedcustomerTypes';
import { deactivatedcustomersURL } from '../constants';

// Get
export const getDeactivatedCustomers = () => dispatch => {
    axios.get(deactivatedcustomersURL)
        .then(res => {
            dispatch({
                type: GET_DEACTIVATED_CUSTOMERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
