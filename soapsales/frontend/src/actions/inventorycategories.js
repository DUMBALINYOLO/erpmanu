import axios from 'axios';
import {
        ADD_INVENTORY_CATEGORY,
        GET_INVENTORY_CATEGORIES,
        DELETE_INVENTORY_CATEGORY,
        GET_INVENTORY_CATEGORY
    } from '../types/inventorycategoryTypes';
import { inventorycategoriesURL } from '../constants';

// Get
export const getInventoryCategories = () => dispatch => {
    axios.get(inventorycategoriesURL)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_CATEGORIES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteInventoryCategory = (id) => dispatch => {
    axios.delete(inventorycategoriesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_INVENTORY_CATEGORY,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addInventoryCategory = (inventorycategory) => dispatch => {
    axios.post(inventorycategoriesURL, inventorycategory)
        .then(res => {
            dispatch({
                type: ADD_INVENTORY_CATEGORY,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getInventoryCategory = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/inventory-categories/${id}`)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_CATEGORY,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
