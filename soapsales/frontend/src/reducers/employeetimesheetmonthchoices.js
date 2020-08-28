import { GET_EMPLOYEE_TIMESHEET_MONTH_CHOICES } from '../actions/types.js';

const initialState = {
   employeetimesheetmonthchoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_TIMESHEET_MONTH_CHOICES:
            return {
                ...state,
                employeetimesheetmonthchoices: action.payload
            };
        default:
            return state;
    }
}
