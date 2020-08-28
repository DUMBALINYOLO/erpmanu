import { GET_EVENT_ICON_CHOICES } from '../actions/types.js';

const initialState = {
   eventiconchoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EVENT_ICON_CHOICES:
            return {
                ...state,
                eventiconchoices: action.payload
            };
        default:
            return state;
    }
}
