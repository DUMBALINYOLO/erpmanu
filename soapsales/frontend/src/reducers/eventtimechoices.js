import { GET_EVENT_TIME_CHOICES } from '../actions/types.js';

const initialState = {
   eventtimechoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EVENT_TIME_CHOICES:
            return {
                ...state,
                eventtimechoices: action.payload
            };
        default:
            return state;
    }
}
