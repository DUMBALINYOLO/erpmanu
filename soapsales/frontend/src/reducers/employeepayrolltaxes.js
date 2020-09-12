import { ADD_EMPLOYEE_PAYROLL_TAX, EDIT_EMPLOYEE_PAYROLL_TAX, GET_EMPLOYEE_PAYROLL_TAXES, GET_EMPLOYEE_PAYROLL_TAX, DELETE_EMPLOYEE_PAYROLL_TAX } from '../types/employeepayrolltaxeTypes';

const initialState = {
    employeepayrolltaxes: [],
    employeepayrolltax: [],
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
                employeepayrolltax: state.employeepayrolltaxes.filter(employeepayrolltax=> employeepayrolltax.id !== action.payload)
            };
        case ADD_EMPLOYEE_PAYROLL_TAX:
            return {
                ...state,
                employeepayrolltax: [...state.employeepayrolltaxes, action.payload]
            }
        case GET_EMPLOYEE_PAYROLL_TAX:
            return {
                ...state,
                employeepayrolltax:action.payload
                };
        case EDIT_EMPLOYEE_PAYROLL_TAX:
            const arrayList = state.employeepayrolltaxes;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepayrolltaxes: arrayList,
            };
        default:
            return state;
    }
}
