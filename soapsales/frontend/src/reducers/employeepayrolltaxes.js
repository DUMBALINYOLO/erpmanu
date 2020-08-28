import { ADD_EMPLOYEE_PAYROLL_TAX, GET_EMPLOYEE_PAYROLL_TAXES, GET_EMPLOYEE_PAYROLL_TAX, DELETE_EMPLOYEE_PAYROLL_TAX } from '../types/employeepayrolltaxeTypes';

const initialState = {
    employeepayrolltaxes: [],
    employeepayrolltaxe: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYROLL_TAXES:
            return {
                ...state,
                employeepayrolltaxes: action.payload
            };
        case DELETE_EMPLOYEE_PAYROLL_TAX:
            return {
                ...state,
                employeepayrolltaxe: state.employeepayrolltaxes.filter(employeepayrolltaxe=> employeepayrolltaxe.id !== action.payload)
            };
        case ADD_EMPLOYEE_PAYROLL_TAX:
            return {
                ...state,
                employeepayrolltaxes: [...state.employeepayrolltaxes, action.payload]
            }
        case GET_EMPLOYEE_PAYROLL_TAX:
            return {
                ...state,
                employeepayrolltaxe:action.payload
                };
        default:
            return state;
    }
}
