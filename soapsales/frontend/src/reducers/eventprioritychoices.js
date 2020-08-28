import { GET_EVENT_PRIORITY_CHOICES } from '../actions/types.js';

const initialState = {
   eventprioritychoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EVENT_PRIORITY_CHOICES:
            return {
                ...state,
                eventprioritychoices: action.payload
            };
        default:
            return state;
    }
}
