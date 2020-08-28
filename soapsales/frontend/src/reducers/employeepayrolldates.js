import { ADD_EMPLOYEE_PAYROLL_DATE, GET_EMPLOYEE_PAYROLL_DATES, GET_EMPLOYEE_PAYROLL_DATE, DELETE_EMPLOYEE_PAYROLL_DATE } from '../types/employeepayrolldateTypes';

const initialState = {
    employeepayrolldates: [],
    employeepayrolldate: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYROLL_DATES:
            return {
                ...state,
                employeepayrolldates: action.payload
            };
        case DELETE_EMPLOYEE_PAYROLL_DATE:
            return {
                ...state,
                employeepayrolldate: state.employeepayrolldates.filter(employeepayrolldate=> employeepayrolldate.id !== action.payload)
            };
        case ADD_EMPLOYEE_PAYROLL_DATE:
            return {
                ...state,
                employeepayrolldates: [...state.employeepayrolldates, action.payload]
            }
        case GET_EMPLOYEE_PAYROLL_DATE:
            return {
                ...state,
                employeepayrolldate:action.payload
                };
        default:
            return state;
    }
}
