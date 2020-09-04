import axios from 'axios';
import {
        GET_ACTIVE_SUPPLIERS,
        DELETE_ACTIVE_SUPPLIER,
        GET_ACTIVE_SUPPLIER,
        ADD_ACTIVE_SUPPLIER
    } from '../types/activesupplierTypes';
import { activesuppliersURL } from '../constants';

// Get
export const getActiveSuppliers = () => dispatch => {
    axios.get(activesuppliersURL)
        .then(res => {
            dispatch({
                type: GET_ACTIVE_SUPPLIERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

// Add
export const addActiveSupplier = (activesupplier) => dispatch => {
    axios.post(activesuppliersURL, activesupplier)
        .then(res => {
            dispatch({
                type: ADD_ACTIVE_SUPPLIER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteActiveSupplier = (id) => dispatch => {
    axios.delete(activesuppliersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_ACTIVE_SUPPLIER,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getActiveSupplier = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/active-suppliers/${id}`)
        .then(res => {
            dispatch({
                type: GET_ACTIVE_SUPPLIER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
