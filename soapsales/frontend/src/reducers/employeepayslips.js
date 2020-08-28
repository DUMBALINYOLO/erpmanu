import { ADD_EMPLOYEE_PAYSLIP, GET_EMPLOYEE_PAYSLIPS, GET_EMPLOYEE_PAYSLIP, DELETE_EMPLOYEE_PAYSLIP } from '../types/employeepayslipTypes';

const initialState = {
    employeepayslips: [],
    employeepayslip: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYSLIPS:
            return {
                ...state,
                employeepayslips: action.payload
            };
        case DELETE_EMPLOYEE_PAYSLIP:
            return {
                ...state,
                employeepayslip: state.employeepayslips.filter(employeepayslip=> employeepayslip.id !== action.payload)
            };
        case ADD_EMPLOYEE_PAYSLIP:
            return {
                ...state,
                employeepayslips: [...state.employeepayslips, action.payload]
            }
        case GET_EMPLOYEE_PAYSLIP:
            return {
                ...state,
                employeepayslip:action.payload
                };
        default:
            return state;
    }
}
