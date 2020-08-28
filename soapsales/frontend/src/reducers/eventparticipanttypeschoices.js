import { GET_EVENT_PARTICIPANT_TYPES_CHOICES } from '../actions/types.js';

const initialState = {
   eventparticipanttypeschoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EVENT_PARTICIPANT_TYPES_CHOICES:
            return {
                ...state,
                eventparticipanttypeschoices: action.payload
            };
        default:
            return state;
    }
}
