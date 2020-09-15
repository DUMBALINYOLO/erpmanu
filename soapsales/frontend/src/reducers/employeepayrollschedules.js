import { ADD_EMPLOYEE_PAYROLL_SCHEDULE, EDIT_EMPLOYEE_PAYROLL_SCHEDULE, GET_EMPLOYEE_PAYROLL_SCHEDULES, GET_EMPLOYEE_PAYROLL_SCHEDULE, DELETE_EMPLOYEE_PAYROLL_SCHEDULE } from '../types/employeepayrollscheduleTypes';

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
                employeepayrollschedule: [...state.employeepayrollschedules, action.payload]
            }
        case GET_EMPLOYEE_PAYROLL_SCHEDULE:
            return {
                ...state,
                employeepayrollschedule:action.payload
                };
        case EDIT_EMPLOYEE_PAYROLL_SCHEDULE:
            const arrayList = state.employeepayrollschedules;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepayrollschedules: arrayList,
            };
        default:
            return state;
    }
}
