import { ADD_EMPLOYEE_ALLOWANCE, EDIT_EMPLOYEE_ALLOWANCE, GET_EMPLOYEE_ALLOWANCES, GET_EMPLOYEE_ALLOWANCE, DELETE_EMPLOYEE_ALLOWANCE } from '../types/employeeallowanceTypes';

const initialState = {
    employeeallowances: [],
    employeeallowance: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_ALLOWANCES:
            return {
                ...state,
                employeeallowances: action.payload
            };
        case DELETE_EMPLOYEE_ALLOWANCE:
            return {
                ...state,
                employeeallowance: state.employeeallowances.filter(employeeallowance=> employeeallowance.id !== action.payload)
            };
        case ADD_EMPLOYEE_ALLOWANCE:
            return {
                ...state,
                employeeallowances: [...state.employeeallowances, action.payload]
            }
        case GET_EMPLOYEE_ALLOWANCE:
            return {
                ...state,
                employeeallowance:action.payload
                };
        case EDIT_EMPLOYEE_ALLOWANCE:
            const arrayList = state.employeeallowances;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeeallowances: arrayList,
            };
        default:
            return state;
    }
}
