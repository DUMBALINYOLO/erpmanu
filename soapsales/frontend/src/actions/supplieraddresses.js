import axios from 'axios';
import {
        ADD_SUPPLIER_ADDRESS,
        GET_SUPPLIER_ADDRESSES,
        DELETE_SUPPLIER_ADDRESS,
        GET_SUPPLIER_ADDRESS
    } from '../types/supplieraddressTypes';
import { supplieraddressesURL } from '../constants';

// Get
export const getSupplierAddresses = () => dispatch => {
    axios.get(supplieraddressesURL)
        .then(res => {
            dispatch({
                type: GET_SUPPLIER_ADDRESSES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteSupplierAddress = (id) => dispatch => {
    axios.delete(supplieraddressesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_SUPPLIER_ADDRESS,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addSupplierAddress= (supplieraddress) => dispatch => {
    axios.post(supplieraddressesURL, supplieraddress)
        .then(res => {
            dispatch({
                type: ADD_SUPPLIER_ADDRESS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getSupplierAddress = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/supplier-addresses/${id}`)
        .then(res => {
            dispatch({
                type: GET_SUPPLIER_ADDRESS,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
