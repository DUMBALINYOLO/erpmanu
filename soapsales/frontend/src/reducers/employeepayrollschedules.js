import { ADD_EMPLOYEE_PAYROLL_SCHEDULE, GET_EMPLOYEE_PAYROLL_SCHEDULES, GET_EMPLOYEE_PAYROLL_SCHEDULE, DELETE_EMPLOYEE_PAYROLL_SCHEDULE } from '../types/employeepayrollscheduleTypes';

const initialState = {
    employeepayrollschedules: [],
    employeepayrollschedule: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYROLL_SCHEDULES:
            return {
                ...state,
                employeepayrollschedules: action.payload
            };
        case DELETE_EMPLOYEE_PAYROLL_SCHEDULE:
            return {
                ...state,
                employeepayrollschedule: state.employeepayrollschedules.filter(employeepayrollschedule=> employeepayrollschedule.id !== action.payload)
            };
        case ADD_EMPLOYEE_PAYROLL_SCHEDULE:
            return {
                ...state,
                employeepayrollschedules: [...state.employeepayrollschedules, action.payload]
            }
        case GET_EMPLOYEE_PAYROLL_SCHEDULE:
            return {
                ...state,
                employeepayrollschedule:action.payload
                };
        default:
            return state;
    }
}
