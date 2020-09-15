import axios from 'axios';
import {
        ADD_EQUIPMENT,
        GET_EQUIPMENTS,
        DELETE_EQUIPMENT,
        GET_EQUIPMENT
    } from '../types/equipmentTypes';
import { equipmentsURL } from '../constants';

// Get
export const getEquipments = () => dispatch => {
    axios.get(equipmentsURL)
        .then(res => {
            dispatch({
                type: GET_EQUIPMENTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteEquipment = (id) => dispatch => {
    axios.delete(equipmentsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EQUIPMENT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEquipment = (equipment) => dispatch => {
    axios.post(equipmentsURL, equipment)
        .then(res => {
            dispatch({
                type: ADD_EQUIPMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//get
export const getEquipment = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/inventory/equipments/${id}`)
        .then(res => {
            dispatch({
                type: GET_EQUIPMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}


