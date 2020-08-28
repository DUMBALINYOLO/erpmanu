import axios from 'axios';
import {
        ADD_CONSUMABLE,
        GET_CONSUMABLES,
        DELETE_CONSUMABLE,
        GET_CONSUMABLE
    } from '../types/consumableTypes';
import { consumablesURL } from '../constants';

// Get
export const getConsumables = () => dispatch => {
    axios.get(consumablesURL)
        .then(res => {
            dispatch({
                type: GET_CONSUMABLES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteConsumable = (id) => dispatch => {
    axios.delete(consumablesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_CONSUMABLE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addConsumable = (consumable) => dispatch => {
    axios.post(consumablesURL, consumable)
        .then(res => {
            dispatch({
                type: ADD_CONSUMABLE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getConsumable = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/consumables/${id}`)
        .then(res => {
            dispatch({
                type: GET_CONSUMABLE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
