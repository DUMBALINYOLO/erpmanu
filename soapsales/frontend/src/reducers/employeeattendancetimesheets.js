import { ADD_EMPLOYEE_ATTENDANCE_TIMESHEET, EDIT_EMPLOYEE_ATTENDANCE_TIMESHEET, GET_EMPLOYEE_ATTENDANCE_TIMESHEETS, GET_EMPLOYEE_ATTENDANCE_TIMESHEET, DELETE_EMPLOYEE_ATTENDANCE_TIMESHEET } from '../types/employeeattendancetimesheetTypes';

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
        case EDIT_EMPLOYEE_ATTENDANCE_TIMESHEET:
            const arrayList = state.employeeattendancetimesheets;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeeattendancetimesheets: arrayList,
            };
        default:
            return state;
    }
}
