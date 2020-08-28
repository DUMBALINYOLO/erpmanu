import { ADD_EMPLOYEE_LEAVE, GET_EMPLOYEE_LEAVES, GET_EMPLOYEE_LEAVE, DELETE_EMPLOYEE_LEAVE } from '../types/employeeleaveTypes';

const initialState = {
    employeeleaves: [],
    employeeleave: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_LEAVES:
            return {
                ...state,
                employeeleaves: action.payload
            };
        case DELETE_EMPLOYEE_LEAVE:
            return {
                ...state,
                employeeleave: state.employeeleaves.filter(employeeleave=> employeeleave.id !== action.payload)
            };
        case ADD_EMPLOYEE_LEAVE:
            return {
                ...state,
                employeeleaves: [...state.employeeleaves, action.payload]
            }
        case GET_EMPLOYEE_LEAVE:
            return {
                ...state,
                employeeleave:action.payload
                };
        default:
            return state;
    }
}
