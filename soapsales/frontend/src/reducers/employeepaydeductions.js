import { ADD_EMPLOYEE_PAY_DEDUCTION, EDIT_EMPLOYEE_PAY_DEDUCTION, GET_EMPLOYEE_PAY_DEDUCTIONS, GET_EMPLOYEE_PAY_DEDUCTION, DELETE_EMPLOYEE_PAY_DEDUCTION } from '../types/employeepaydeductionTypes';

const initialState = {
    employeepaydeductions: [],
    employeepaydeduction: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAY_DEDUCTIONS:
            return {
                ...state,
                employeepaydeductions: action.payload
            };
        case DELETE_EMPLOYEE_PAY_DEDUCTION:
            return {
                ...state,
                employeepaydeduction: state.employeepaydeductions.filter(employeepaydeduction=> employeepaydeduction.id !== action.payload)
            };
        case ADD_EMPLOYEE_PAY_DEDUCTION:
            return {
                ...state,
                employeepaydeduction: [...state.employeepaydeductions, action.payload]
            };
        case GET_EMPLOYEE_PAY_DEDUCTION:
            return {
                ...state,
                employeepaydeduction:action.payload
            };
        case EDIT_EMPLOYEE_PAY_DEDUCTION:
            const arrayList = state.employeepaydeductions;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepaydeductions: arrayList,
            };
        default:
            return state;
    }
}
