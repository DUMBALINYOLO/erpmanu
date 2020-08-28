import axios from 'axios';
import {
        ADD_DECLINED_EMPLOYEE_LEAVE,
        GET_DECLINED_EMPLOYEE_LEAVES,
        GET_DECLINED_EMPLOYEE_LEAVE,
        DELETE_DECLINED_EMPLOYEE_LEAVE
    } from '../types/declinedemployeeleaveTypes';
import { declinedemployeeleavesURL } from '../constants';

// Get
export const getDeclinedEmployeeLeaves =  () => dispatch => {
    axios.get(declinedemployeeleavesURL)
        .then(res => {
            dispatch({
                type:  GET_DECLINED_EMPLOYEE_LEAVES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteDeclinedEmployeeLeave = (id) => dispatch => {
    axios.delete(declinedemployeeleavesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_DECLINED_EMPLOYEE_LEAVE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addDeclinedEmployeeLeave = declinedemployeeleave => dispatch => {
    axios.post(declinedemployeeleavesURL, declinedemployeeleave)
        .then(res => {
            dispatch({
                type: ADD_DECLINED_EMPLOYEE_LEAVE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getDeclinedEmployeeLeave = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/declined-employee-leaves/${id}`)
        .then(res => {
            dispatch({
                type: GET_DECLINED_EMPLOYEE_LEAVE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
