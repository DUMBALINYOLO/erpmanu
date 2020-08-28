import { GET_EMPLOYEE_PAYROLL_TAX_CHOICES } from '../actions/types.js';

const initialState = {
   employeepayrolltaxchoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYROLL_TAX_CHOICES:
            return {
                ...state,
                employeepayrolltaxchoices: action.payload
            };
        default:
            return state;
    }
}

