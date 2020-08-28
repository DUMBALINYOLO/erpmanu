import { ADD_SHIFT_SCHEDULE, GET_SHIFT_SCHEDULES, GET_SHIFT_SCHEDULE, DELETE_SHIFT_SCHEDULE } from '../types/shiftscheduleTypes';

const initialState = {
    shiftschedules: [],
    shiftschedule: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_SHIFT_SCHEDULES:
            return {
                ...state,
                shiftschedules: action.payload
            };
        case DELETE_SHIFT_SCHEDULE:
            return {
                ...state,
                shiftschedule: state.shiftschedules.filter(shiftschedule=> shiftschedule.id !== action.payload)
            };
        case ADD_SHIFT_SCHEDULE:
            return {
                ...state,
                shiftschedule: [...state.shiftschedules, action.payload]
            }
        case GET_SHIFT_SCHEDULE:
            return {
                ...state,
                shiftschedule:action.payload
                };
        default:
            return state;
    }
}
