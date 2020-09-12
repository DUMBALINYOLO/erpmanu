import axios from 'axios';
import { ADD_EMPLOYEE_PAYGRADE, EDIT_EMPLOYEE_PAYGRADE, GET_EMPLOYEE_PAYGRADES, GET_EMPLOYEE_PAYGRADE, DELETE_EMPLOYEE_PAYGRADE } from '../types/employeepaygradeTypes';
import { employeepaygradesURL } from '../constants';

// Get
export const getEmployeePaygrades=  () => dispatch => {
    axios.get(employeepaygradesURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_PAYGRADES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeePaygrade = (id) => dispatch => {
    axios.delete(employeepaygradesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_PAYGRADE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeePaygrade = employeepaygrade => dispatch => {
    axios.post(employeepaygradesURL, employeepaygrade)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_PAYGRADE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePaygrade = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-paygrades/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAYGRADE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}


//Edit
export const editEmployeePaygrade = (id, employeepaygrade) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/employees/employee-paygrades/${id}/`, employeepaygrade)
        .then(res => {
            dispatch({
                type: EDIT_EMPLOYEE_PAYGRADE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
