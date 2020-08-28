import axios from 'axios';
import {
        ADD_RAW_MATERIAL,
        GET_RAW_MATERIALS,
        DELETE_RAW_MATERIAL,
        GET_RAW_MATERIAL
    } from '../types/rawmaterialTypes';
import { rawmaterialsURL } from '../constants';

// Get
export const getRawMaterials = () => dispatch => {
    axios.get(rawmaterialsURL)
        .then(res => {
            dispatch({
                type: GET_RAW_MATERIALS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteRawMaterial = (id) => dispatch => {
    axios.delete(rawmaterialsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_RAW_MATERIAL,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addRawMaterial = (rawmaterial) => dispatch => {
    axios.post(rawmaterialsURL, rawmaterial)
        .then(res => {
            dispatch({
                type: ADD_RAW_MATERIAL,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getRawMaterial = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/raw-materials/${id}`)
        .then(res => {
            dispatch({
                type: GET_RAW_MATERIAL,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
