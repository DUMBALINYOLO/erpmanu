import axios from 'axios';
import { ADD_EMPLOYEE_PAYROLL_DATE, EDIT_EMPLOYEE_PAYROLL_DATE, GET_EMPLOYEE_PAYROLL_DATES, GET_EMPLOYEE_PAYROLL_DATE, DELETE_EMPLOYEE_PAYROLL_DATE } from '../types/employeepayrolldateTypes';
import { employeepayrolldatesURL } from '../constants';

// Get
export const getEmployeePayrollDates=  () => dispatch => {
    axios.get(employeepayrolldatesURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_PAYROLL_DATES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeePayrollDate = (id) => dispatch => {
    axios.delete(employeepayrolldatesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_PAYROLL_DATE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeePayrollDate = employeepayrolldate => dispatch => {
    axios.post(employeepayrolldatesURL, employeepayrolldate)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_PAYROLL_DATE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePayrollDate = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-payroll-dates/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAYROLL_DATE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editEmployeePayrollDate = (id, employeepayrolldate) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/employees/employee-payroll-dates/${id}/`, employeepayrolldate)
        .then(res => {
            dispatch({
                type: EDIT_EMPLOYEE_PAYROLL_DATE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
