import { ADD_EMPLOYEE_CONTRACTS_TERMINATION, EDIT_EMPLOYEE_CONTRACTS_TERMINATION, GET_EMPLOYEE_CONTRACTS_TERMINATIONS, GET_EMPLOYEE_CONTRACTS_TERMINATION, DELETE_EMPLOYEE_CONTRACTS_TERMINATION } from '../types/employeecontractsterminationTypes';

const initialState = {
    employeecontractsterminations: [],
    employeecontractstermination: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_CONTRACTS_TERMINATIONS:
            return {
                ...state,
                employeecontractsterminations: action.payload
            };
        case DELETE_EMPLOYEE_CONTRACTS_TERMINATION:
            return {
                ...state,
                employeecontractstermination: state.employeecontractsterminations.filter(employeecontractstermination=> employeecontractstermination.id !== action.payload)
            };
        case ADD_EMPLOYEE_CONTRACTS_TERMINATION:
            return {
                ...state,
                employeecontractstermination: [...state.employeecontractsterminations, action.payload]
            }
        case GET_EMPLOYEE_CONTRACTS_TERMINATION:
            return {
                ...state,
                employeecontractstermination:action.payload
                };
        case EDIT_EMPLOYEE_CONTRACTS_TERMINATION:
            const arrayList = state.employeecontractsterminations;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeecontractsterminations: arrayList,
            };
        default:
            return state;
    }
}
