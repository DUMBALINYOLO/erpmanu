import axios from 'axios';
import { ADD_MANUFACTURING_PERSONEL, GET_MANUFACTURING_PERSONELS, GET_MANUFACTURING_PERSONEL, DELETE_MANUFACTURING_PERSONEL } from '../types/manufacturingpersonelTypes';
import { manufacturingpersonelsURL } from '../constants';

// Get
export const getManufacturingPersonels=  () => dispatch => {
    axios.get(manufacturingpersonelsURL)
        .then(res => {
            dispatch({
                type:  GET_MANUFACTURING_PERSONELS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteManufacturingPersonel = (id) => dispatch => {
    axios.delete(manufacturingpersonelsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_MANUFACTURING_PERSONEL,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addManufacturingPersonel = manufacturingpersonel => dispatch => {
    axios.post(manufacturingpersonelsURL, manufacturingpersonel)
        .then(res => {
            dispatch({
                type: ADD_MANUFACTURING_PERSONEL,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getManufacturingPersonel = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/manufacturing-personels/${id}`)
        .then(res => {
            dispatch({
                type: GET_MANUFACTURING_PERSONEL,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
