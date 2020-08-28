import { ADD_EMPLOYEE_ATTENDANCE_TIMESHEET, GET_EMPLOYEE_ATTENDANCE_TIMESHEETS, GET_EMPLOYEE_ATTENDANCE_TIMESHEET, DELETE_EMPLOYEE_ATTENDANCE_TIMESHEET } from '../types/employeeattendancetimesheetTypes';

const initialState = {
    employeeattendancetimesheets: [],
    employeeattendancetimesheet: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_ATTENDANCE_TIMESHEETS:
            return {
                ...state,
                employeeattendancetimesheets: action.payload
            };
        case DELETE_EMPLOYEE_ATTENDANCE_TIMESHEET:
            return {
                ...state,
                employeeattendancetimesheet: state.employeeattendancetimesheets.filter(employeeattendancetimesheet=> employeeattendancetimesheet.id !== action.payload)
            };
        case ADD_EMPLOYEE_ATTENDANCE_TIMESHEET:
            return {
                ...state,
                employeeattendancetimesheets: [...state.employeeattendancetimesheets, action.payload]
            }
        case GET_EMPLOYEE_ATTENDANCE_TIMESHEET:
            return {
                ...state,
                employeeattendancetimesheet:action.payload
                };
        default:
            return state;
    }
}
