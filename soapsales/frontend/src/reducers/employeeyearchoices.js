import { GET_EMPLOYEE_YEAR_CHOICES } from '../actions/types.js';

const initialState = {
   employeeyearchoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_YEAR_CHOICES:
            return {
                ...state,
                employeeyearchoices: action.payload
            };
        default:
            return state;
    }
}
