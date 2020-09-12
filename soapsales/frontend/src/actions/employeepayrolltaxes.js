import axios from 'axios';
import { ADD_EMPLOYEE_PAYROLL_TAX, GET_EMPLOYEE_PAYROLL_TAXES, EDIT_EMPLOYEE_PAYROLL_TAX, GET_EMPLOYEE_PAYROLL_TAX, DELETE_EMPLOYEE_PAYROLL_TAX } from '../types/employeepayrolltaxeTypes';
import { employeepayrolltaxesURL } from '../constants';

// Get
export const getEmployeePayrollTaxes=  () => dispatch => {
    axios.get(employeepayrolltaxesURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_PAYROLL_TAXES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeePayrollTax = (id) => dispatch => {
    axios.delete(employeepayrolltaxesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_PAYROLL_TAX,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeePayrollTax = employeepayrolltax => dispatch => {
    axios.post(employeepayrolltaxesURL, employeepayrolltax)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_PAYROLL_TAX,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePayrollTax = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-payroll-taxes/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAYROLL_TAX,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editEmployeePayrollTax = (id, employeepayrolltax) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/employees/employee-payroll-taxes/${id}/`, employeepayrolltax)
        .then(res => {
            dispatch({
                type: EDIT_EMPLOYEE_PAYROLL_TAX,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
