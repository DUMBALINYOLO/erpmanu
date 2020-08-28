import { GET_EMPLOYEE_LUNCH_CHOICES } from '../actions/types.js';

const initialState = {
   employeelunchchoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_LUNCH_CHOICES:
            return {
                ...state,
                employeelunchchoices: action.payload
            };
        default:
            return state;
    }
}
