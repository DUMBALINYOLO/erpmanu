import axios from 'axios';
import {
        ADD_CUSTOMER_ADDRESS,
        GET_CUSTOMER_ADDRESSES,
        DELETE_CUSTOMER_ADDRESS,
        GET_CUSTOMER_ADDRESS
    } from '../types/customeraddressTypes';
import { customeraddressesURL } from '../constants';

// Get
export const getCustomerAddresses = () => dispatch => {
    axios.get(customeraddressesURL)
        .then(res => {
            dispatch({
                type: GET_CUSTOMER_ADDRESSES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteCustomerAddress = (id) => dispatch => {
    axios.delete(customeraddressesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_CUSTOMER_ADDRESS,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCustomerAddress = (customeraddress) => dispatch => {
    axios.post(customeraddressesURL, customeraddress)
        .then(res => {
            dispatch({
                type: ADD_CUSTOMER_ADDRESS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getCustomerAddress = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/customers/customer-addresses/${id}`)
        .then(res => {
            dispatch({
                type: GET_CUSTOMER_ADDRESS,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
