import axios from 'axios';
import { ADD_EMPLOYEE_PAYROLL_SCHEDULE, GET_EMPLOYEE_PAYROLL_SCHEDULES, GET_EMPLOYEE_PAYROLL_SCHEDULE, DELETE_EMPLOYEE_PAYROLL_SCHEDULE } from '../types/employeepayrollscheduleTypes';
import { employeepayrollschedulesURL } from '../constants';

// Get
export const getEmployeePayrollSchedules=  () => dispatch => {
    axios.get(employeepayrollschedulesURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_PAYROLL_SCHEDULES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeePayrollSchedule = (id) => dispatch => {
    axios.delete(employeepayrollschedulesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_PAYROLL_SCHEDULE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeePayrollSchedule = employeepayrollschedule => dispatch => {
    axios.post(employeepayrollschedulesURL, employeepayrollschedule)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_PAYROLL_SCHEDULE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePayrollSchedule = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-payroll-schedules/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAYROLL_SCHEDULE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
