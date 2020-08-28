import axios from 'axios';
import { ADD_EMPLOYEE_DEPARTMENT, GET_EMPLOYEE_DEPARTMENTS, GET_EMPLOYEE_DEPARTMENT, DELETE_EMPLOYEE_DEPARTMENT } from '../types/employeedepartmentTypes';
import { employeedepartmentsURL } from '../constants';

// Get
export const getEmployeeDepartments=  () => dispatch => {
    axios.get(employeedepartmentsURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_DEPARTMENTS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeeDepartment = (id) => dispatch => {
    axios.delete(employeedepartmentsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_DEPARTMENT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeeDepartment = employeedepartment => dispatch => {
    axios.post(employeedepartmentsURL, employeedepartment)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_DEPARTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeDepartment = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-departments/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_DEPARTMENT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
