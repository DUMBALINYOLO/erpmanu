import { GET_EMPLOYEE_PAYSLIP_STATUS_CHOICES } from '../actions/types.js';

const initialState = {
   employeepayslipstatuschoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYSLIP_STATUS_CHOICES:
            return {
                ...state,
                employeepayslipstatuschoices: action.payload
            };
        default:
            return state;
    }
}
