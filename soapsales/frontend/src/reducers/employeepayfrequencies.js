import { GET_EMPLOYEE_PAY_FREQUENCIES } from '../actions/types.js';

const initialState = {
   employeepayfrequencies: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAY_FREQUENCIES:
            return {
                ...state,
                employeepayfrequencies: action.payload
            };
        default:
            return state;
    }
}
