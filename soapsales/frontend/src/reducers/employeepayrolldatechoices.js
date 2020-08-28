import { GET_EMPLOYEE_PAYROLL_DATE_CHOICES } from '../actions/types.js';

const initialState = {
   employeepayrolldatechoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYROLL_DATE_CHOICES:
            return {
                ...state,
                employeepayrolldatechoices: action.payload
            };
        default:
            return state;
    }
}
