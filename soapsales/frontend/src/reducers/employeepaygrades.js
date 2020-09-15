import { ADD_EMPLOYEE_PAYGRADE, EDIT_EMPLOYEE_PAYGRADE, GET_EMPLOYEE_PAYGRADES, GET_EMPLOYEE_PAYGRADE, DELETE_EMPLOYEE_PAYGRADE } from '../types/employeepaygradeTypes';

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
                employeepaygrade: [...state.employeepaygrades, action.payload]
            }
        case GET_EMPLOYEE_PAYGRADE:
            return {
                ...state,
                employeepaygrade:action.payload
            };
        case EDIT_EMPLOYEE_PAYGRADE:
            const arrayList = state.employeepaygrades;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepaygrades: arrayList,
            };
        default:
            return state;
    }
}
