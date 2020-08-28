import axios from 'axios';
import {
        ADD_WAREHOUSE,
        GET_WAREHOUSES,
        DELETE_WAREHOUSE,
        GET_WAREHOUSE
    } from '../types/warehouseTypes';
import { warehousesURL } from '../constants';

// Get
export const getWarehouses = () => dispatch => {
    axios.get(warehousesURL)
        .then(res => {
            dispatch({
                type: GET_WAREHOUSES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteWarehouse = (id) => dispatch => {
    axios.delete(warehousesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_WAREHOUSE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addWarehouse = (warehouse) => dispatch => {
    axios.post(warehousesURL, warehouse)
        .then(res => {
            dispatch({
                type: ADD_WAREHOUSE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getWarehouse = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/warehouses/${id}`)
        .then(res => {
            dispatch({
                type: GET_WAREHOUSE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
