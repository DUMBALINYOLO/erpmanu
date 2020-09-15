import axios from 'axios';
import { ADD_EMPLOYEE_PAY_DEDUCTION, EDIT_EMPLOYEE_PAY_DEDUCTION, GET_EMPLOYEE_PAY_DEDUCTIONS, GET_EMPLOYEE_PAY_DEDUCTION, DELETE_EMPLOYEE_PAY_DEDUCTION } from '../types/employeepaydeductionTypes';
import { employeepaydeductionsURL } from '../constants';

// Get
export const getEmployeePayDeductions=  () => dispatch => {
    axios.get(employeepaydeductionsURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_PAY_DEDUCTIONS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeePayDeduction = (id) => dispatch => {
    axios.delete(employeepaydeductionsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_PAY_DEDUCTION,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeePayDeduction = employeepaydeduction => dispatch => {
    axios.post(employeepaydeductionsURL, employeepaydeduction)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_PAY_DEDUCTION,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePayDeduction = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-pay-deductions/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAY_DEDUCTION,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editEmployeePayDeduction = (id, employeepaydeduction) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/employees/employee-pay-deductions/${id}/`, employeepaydeduction)
        .then(res => {
            dispatch({
                type: EDIT_EMPLOYEE_PAY_DEDUCTION,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
