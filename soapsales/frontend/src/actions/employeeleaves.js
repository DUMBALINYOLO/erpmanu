import axios from 'axios';
import { ADD_EMPLOYEE_LEAVE, EDIT_EMPLOYEE_LEAVE, GET_EMPLOYEE_LEAVES, GET_EMPLOYEE_LEAVE, DELETE_EMPLOYEE_LEAVE } from '../types/employeeleaveTypes';
import { employeeleavesURL } from '../constants';

// Get
export const getEmployeeLeaves=  () => dispatch => {
    axios.get(employeeleavesURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_LEAVES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeeLeave = (id) => dispatch => {
    axios.delete(employeeleavesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_LEAVE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeeLeave = employeeleave => dispatch => {
    axios.post(employeeleavesURL, employeeleave)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_LEAVE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeLeave = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-leaves/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_LEAVE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editEmployeeLeave = (id, employeeleave) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/employees/employee-leaves/${id}/`, employeeleave)
        .then(res => {
            dispatch({
                type: EDIT_EMPLOYEE_LEAVE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
