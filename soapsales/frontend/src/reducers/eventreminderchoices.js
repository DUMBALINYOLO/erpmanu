import { GET_EVENT_REMINDER_CHOICES } from '../actions/types.js';

const initialState = {
   eventreminderchoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EVENT_REMINDER_CHOICES:
            return {
                ...state,
                eventreminderchoices: action.payload
            };
        default:
            return state;
    }
}
