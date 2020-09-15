import { ADD_EMPLOYEE_DEPARTMENT, EDIT_EMPLOYEE_DEPARTMENT, GET_EMPLOYEE_DEPARTMENTS, GET_EMPLOYEE_DEPARTMENT, DELETE_EMPLOYEE_DEPARTMENT } from '../types/employeedepartmentTypes';

const initialState = {
    employeedepartments: [],
    employeedepartment: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_DEPARTMENTS:
            return {
                ...state,
                employeedepartments: action.payload
            };
        case DELETE_EMPLOYEE_DEPARTMENT:
            return {
                ...state,
                employeedepartment: state.employeedepartments.filter(employeedepartment=> employeedepartment.id !== action.payload)
            };
        case ADD_EMPLOYEE_DEPARTMENT:
            return {
                ...state,
                employeedepartment: [...state.employeedepartments, action.payload]
            };
        case GET_EMPLOYEE_DEPARTMENT:
            return {
                ...state,
                employeedepartment:action.payload
            };
        case EDIT_EMPLOYEE_DEPARTMENT:
            const arrayList = state.employeedepartments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeedepartments: arrayList,
            };
        default:
            return state;
    }
}
