import axios from 'axios';
import { ADD_EMPLOYEE_ATTENDANCE_TIMESHEET, EDIT_EMPLOYEE_ATTENDANCE_TIMESHEET, GET_EMPLOYEE_ATTENDANCE_TIMESHEETS, GET_EMPLOYEE_ATTENDANCE_TIMESHEET, DELETE_EMPLOYEE_ATTENDANCE_TIMESHEET } from '../types/employeeattendancetimesheetTypes';
import { employeeattendancetimesheetsURL } from '../constants';

// Get
export const getEmployeeAttendanceTimesheets=  () => dispatch => {
    axios.get(employeeattendancetimesheetsURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_ATTENDANCE_TIMESHEETS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeeAttendanceTimesheet = (id) => dispatch => {
    axios.delete(employeeattendancetimesheetsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_ATTENDANCE_TIMESHEET,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeeAttendanceTimesheet = employeeattendancetimesheet => dispatch => {
    axios.post(employeeattendancetimesheetsURL, employeeattendancetimesheet)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_ATTENDANCE_TIMESHEET,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeAttendanceTimesheet = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-attendance-timesheets/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_ATTENDANCE_TIMESHEET,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editEmployeeAttendanceTimesheet = (id, employeeattendancetimesheet) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/employees/employee-attendance-timesheets/${id}/`, employeeattendancetimesheet)
        .then(res => {
            dispatch({
                type: EDIT_EMPLOYEE_ATTENDANCE_TIMESHEET,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
