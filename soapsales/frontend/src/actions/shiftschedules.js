import axios from 'axios';
import { ADD_SHIFT_SCHEDULE, GET_SHIFT_SCHEDULES, EDIT_SHIFT_SCHEDULE, GET_SHIFT_SCHEDULE, DELETE_SHIFT_SCHEDULE } from '../types/shiftscheduleTypes';
import { shiftschedulesURL } from '../constants';

// Get
export const getShiftSchedules=  () => dispatch => {
    axios.get(shiftschedulesURL)
        .then(res => {
            dispatch({
                type:  GET_SHIFT_SCHEDULES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteShiftSchedule = (id) => dispatch => {
    axios.delete(shiftschedulesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_SHIFT_SCHEDULE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addShiftSchedule = shiftschedule => dispatch => {
    axios.post(shiftschedulesURL, shiftschedule)
        .then(res => {
            dispatch({
                type: ADD_SHIFT_SCHEDULE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getShiftSchedule = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/shift-schedules/${id}`)
        .then(res => {
            dispatch({
                type: GET_SHIFT_SCHEDULE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editShiftSchedule = (id, shiftschedule) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/manufacture/shift-schedules/${id}/`, shiftschedule)
        .then(res => {
            dispatch({
                type: EDIT_SHIFT_SCHEDULE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
