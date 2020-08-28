import { GET_EMPLOYEES } from '../types/employeesTypes';

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
        default:
            return state;
    }
}
