import axios from 'axios';
import { ADD_SHIFT, GET_SHIFTS, GET_SHIFT, DELETE_SHIFT } from '../types/shiftTypes';
import { shiftsURL } from '../constants';

// Get
export const getShifts=  () => dispatch => {
    axios.get(shiftsURL)
        .then(res => {
            dispatch({
                type:  GET_SHIFTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteShift = (id) => dispatch => {
    axios.delete(shiftsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_SHIFT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addShift = shift => dispatch => {
    axios.post(shiftsURL, shift)
        .then(res => {
            dispatch({
                type: ADD_SHIFT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getShift = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/shifts/${id}`)
        .then(res => {
            dispatch({
                type: GET_SHIFT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
