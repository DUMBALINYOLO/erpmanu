import { GET_EMPLOYEES, ADD_EMPLOYEE } from '../types/employeesTypes';

const initialState = {
    employees: [],
    employee: [],
    loading: false,
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
        case ADD_EMPLOYEE:
            return {
                ...state,
                employee: [...state.employees, action.payload]
            }
        default:
            return state;
    }
}
