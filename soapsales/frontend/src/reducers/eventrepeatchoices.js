import { GET_EVENT_REPEAT_CHOICES } from '../actions/types.js';

const initialState = {
   eventrepeatchoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EVENT_REPEAT_CHOICES:
            return {
                ...state,
                eventrepeatchoices: action.payload
            };
        default:
            return state;
    }
}
