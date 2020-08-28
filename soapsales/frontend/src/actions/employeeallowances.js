import axios from 'axios';
import { ADD_EMPLOYEE_ALLOWANCE, GET_EMPLOYEE_ALLOWANCES, GET_EMPLOYEE_ALLOWANCE, DELETE_EMPLOYEE_ALLOWANCE } from '../types/employeeallowanceTypes';
import { employeeallowancesURL } from '../constants';

// Get
export const getEmployeeAllowances=  () => dispatch => {
    axios.get(employeeallowancesURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_ALLOWANCES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeeAllowance = (id) => dispatch => {
    axios.delete(employeeallowancesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_ALLOWANCE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeeAllowance = employeeallowance => dispatch => {
    axios.post(employeeallowancesURL, employeeallowance)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_ALLOWANCE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeAllowance = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-allowances/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_ALLOWANCE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
