import { GET_EMPLOYEE_DEDUCTION_METHODS } from '../actions/types.js';

const initialState = {
   employeedeductionmethods: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_DEDUCTION_METHODS:
            return {
                ...state,
                employeedeductionmethods: action.payload
            };
        default:
            return state;
    }
}
