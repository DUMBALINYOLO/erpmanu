import axios from 'axios';
import {
        ADD_ASSET,
        GET_ASSETS,
        DELETE_ASSET,
        GET_ASSET,
        EDIT_ASSET
    } from '../types/assetTypes';
import { assetsURL } from '../constants';

// Get
export const getAssets = () => dispatch => {
    axios.get(assetsURL)
        .then(res => {
            dispatch({
                type: GET_ASSETS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteAsset = (id) => dispatch => {
    axios.delete(assetsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_ASSET,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addAsset = (asset) => dispatch => {
    axios.post(assetsURL, asset)
        .then(res => {
            dispatch({
                type: ADD_ASSET,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getAsset = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/accounting/assets/${id}`)
        .then(res => {
            dispatch({
                type: GET_ASSET,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editAsset = (id, asset) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/accounting/assets/${id}/`, asset)
        .then(res => {
            dispatch({
                type: EDIT_ASSET,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
