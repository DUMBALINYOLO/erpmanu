import { GET_EMPLOYEE_CATEGORY_CHOICES } from '../actions/types.js';

const initialState = {
   employeecategorychoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_CATEGORY_CHOICES:
            return {
                ...state,
                employeecategorychoices: action.payload
            };
        default:
            return state;
    }
}
