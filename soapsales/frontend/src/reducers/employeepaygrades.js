import { ADD_EMPLOYEE_PAYGRADE, GET_EMPLOYEE_PAYGRADES, GET_EMPLOYEE_PAYGRADE, DELETE_EMPLOYEE_PAYGRADE } from '../types/employeepaygradeTypes';

const initialState = {
    employeepaygrades: [],
    employeepaygrade: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYGRADES:
            return {
                ...state,
                employeepaygrades: action.payload
            };
        case DELETE_EMPLOYEE_PAYGRADE:
            return {
                ...state,
                employeepaygrade: state.employeepaygrades.filter(employeepaygrade=> employeepaygrade.id !== action.payload)
            };
        case ADD_EMPLOYEE_PAYGRADE:
            return {
                ...state,
                employeepaygrades: [...state.employeepaygrades, action.payload]
            }
        case GET_EMPLOYEE_PAYGRADE:
            return {
                ...state,
                employeepaygrade:action.payload
                };
        default:
            return state;
    }
}
