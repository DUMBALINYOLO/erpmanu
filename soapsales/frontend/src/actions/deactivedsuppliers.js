import axios from 'axios';
import {
        GET_DE_ACTIVED_SUPPLIERS,
        DELETE_DE_ACTIVED_SUPPLIER,
        GET_DE_ACTIVED_SUPPLIER
    } from '../types/deactivedsupplierTypes';
import { deactivedsuppliersURL } from '../constants';

// Get
export const getDeActivedSuppliers = () => dispatch => {
    axios.get(deactivedsuppliersURL)
        .then(res => {
            dispatch({
                type: GET_DE_ACTIVED_SUPPLIERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteDeActivedSupplier = (id) => dispatch => {
    axios.delete(deactivedsuppliersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_DE_ACTIVED_SUPPLIER,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getDeActivedSupplier = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/de-actived-suppliers/${id}`)
        .then(res => {
            dispatch({
                type: GET_DE_ACTIVED_SUPPLIER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
