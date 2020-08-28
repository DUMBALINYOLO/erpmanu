import axios from 'axios';
import {
        ADD_PENDING_EMPLOYEE_LEAVE,
        GET_PENDING_EMPLOYEE_LEAVES,
        GET_PENDING_EMPLOYEE_LEAVE,
        DELETE_PENDING_EMPLOYEE_LEAVE
    } from '../types/pendingemployeeleaveTypes';
import { pendingemployeeleavesURL } from '../constants';

// Get
export const getPendingEmployeeLeaves =  () => dispatch => {
    axios.get(pendingemployeeleavesURL)
        .then(res => {
            dispatch({
                type:  GET_PENDING_EMPLOYEE_LEAVES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deletePendingEmployeeLeave = (id) => dispatch => {
    axios.delete(pendingemployeeleavesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_PENDING_EMPLOYEE_LEAVE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addPendingEmployeeLeave = pendingemployeeleave => dispatch => {
    axios.post(pendingemployeeleavesURL, pendingemployeeleave)
        .then(res => {
            dispatch({
                type: ADD_PENDING_EMPLOYEE_LEAVE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getPendingEmployeeLeave = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/pending-employee-leaves/${id}`)
        .then(res => {
            dispatch({
                type: GET_PENDING_EMPLOYEE_LEAVE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
