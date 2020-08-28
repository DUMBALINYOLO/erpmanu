import { GET_EMPLOYEES_ATTENDANCE_STATUS_CHOICES } from '../actions/types.js';

const initialState = {
   employeesattendancestatuschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEES_ATTENDANCE_STATUS_CHOICES:
            return {
                ...state,
                employeesattendancestatuschoices : action.payload
            };
        default:
            return state;
    }
}
