import { ADD_EMPLOYEE_CONFIG } from '../types/employeeconfigTypes';

const initialState = {
    employeeconfigs: [],
    employeeconfig: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case ADD_EMPLOYEE_CONFIG:
            return {
                ...state,
                employeeconfig: [...state.employeeconfigs, action.payload]
            };
        default:
            return state;
    }
}
