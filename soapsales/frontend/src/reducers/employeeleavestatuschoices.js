import { GET_EMPLOYEE_LEAVE_STATUS_CHOICES } from '../actions/types.js';

const initialState = {
   employeeleavestatuschoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_LEAVE_STATUS_CHOICES:
            return {
                ...state,
                employeeleavestatuschoices: action.payload
            };
        default:
            return state;
    }
}
