import { GET_EMPLOYEE_LEAVE_CATEGORY_CHOICES } from '../actions/types.js';

const initialState = {
   employeeleavecategorychoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_LEAVE_CATEGORY_CHOICES:
            return {
                ...state,
                employeeleavecategorychoices: action.payload
            };
        default:
            return state;
    }
}
