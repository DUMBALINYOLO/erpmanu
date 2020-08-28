import { GET_EMPLOYEES_GENDER_CHOICES } from '../actions/types.js';

const initialState = {
   employeesgenderchoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEES_GENDER_CHOICES:
            return {
                ...state,
                employeesgenderchoices : action.payload
            };
        default:
            return state;
    }
}
