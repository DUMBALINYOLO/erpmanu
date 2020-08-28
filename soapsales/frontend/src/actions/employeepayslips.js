import axios from 'axios';
import { ADD_EMPLOYEE_PAYSLIP, GET_EMPLOYEE_PAYSLIPS, GET_EMPLOYEE_PAYSLIP, DELETE_EMPLOYEE_PAYSLIP } from '../types/employeepayslipTypes';
import { employeepayslipsURL } from '../constants';

// Get
export const getEmployeePayslips=  () => dispatch => {
    axios.get(employeepayslipsURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_PAYSLIPS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeePayslip = (id) => dispatch => {
    axios.delete(employeepayslipsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_PAYSLIP,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeePayslip = employeepayslip => dispatch => {
    axios.post(employeepayslipsURL, employeepayslip)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_PAYSLIP,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePayslip = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-payslips/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAYSLIP,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
