import axios from 'axios';
import {
        ADD_STORAGEMEDIA,
        GET_STORAGEMEDIAS,
        DELETE_STORAGEMEDIA,
        GET_STORAGEMEDIA,
        EDIT_STORAGEMEDIA
    } from '../types/storagemediaTypes';
import { storagemediasURL } from '../constants';

// Get
export const getStoragemedias = () => dispatch => {
    axios.get(storagemediasURL)
        .then(res => {
            dispatch({
                type: GET_STORAGEMEDIAS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteStoragemedia = (id) => dispatch => {
    axios.delete(storagemediasURL, id)
        .then(res => {
            dispatch({
                type: DELETE_STORAGEMEDIA,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addStoragemedia = (storagemedia) => dispatch => {
    axios.post(storagemediasURL, storagemedia)
        .then(res => {
            dispatch({
                type: ADD_STORAGEMEDIA,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getStoragemedia = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/storagemedias/${id}`)
        .then(res => {
            dispatch({
                type: GET_STORAGEMEDIA,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editStoragemedia = (id, storagemedia) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/inventory/storagemedias/${id}/`, storagemedia)
        .then(res => {
            dispatch({
                type: EDIT_STORAGEMEDIA,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
