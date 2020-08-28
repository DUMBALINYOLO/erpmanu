import axios from 'axios';
import {
        ADD_AUTHORISED_EMPLOYEE_LEAVE,
        GET_AUTHORISED_EMPLOYEE_LEAVES,
        GET_AUTHORISED_EMPLOYEE_LEAVE,
        DELETE_AUTHORISED_EMPLOYEE_LEAVE
    } from '../types/authorisedemployeeleaveTypes';
import { authorisedemployeeleavesURL } from '../constants';

// Get
export const getAuthorisedEmployeeLeaves =  () => dispatch => {
    axios.get(authorisedemployeeleavesURL)
        .then(res => {
            dispatch({
                type:  GET_AUTHORISED_EMPLOYEE_LEAVES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteAuthorisedEmployeeLeave = (id) => dispatch => {
    axios.delete(authorisedemployeeleavesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_AUTHORISED_EMPLOYEE_LEAVE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addAuthorisedEmployeeLeave = authorisedemployeeleave => dispatch => {
    axios.post(authorisedemployeeleavesURL, authorisedemployeeleave)
        .then(res => {
            dispatch({
                type: ADD_AUTHORISED_EMPLOYEE_LEAVE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getAuthorisedEmployeeLeave = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/authorised-employee-leaves/${id}`)
        .then(res => {
            dispatch({
                type: GET_AUTHORISED_EMPLOYEE_LEAVE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
