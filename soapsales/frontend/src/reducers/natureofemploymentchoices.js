import { GET_NATURE_OF_EMPLOYMENT_CHOICES } from '../actions/types.js';

const initialState = {
   natureofemploymentchoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_NATURE_OF_EMPLOYMENT_CHOICES:
            return {
                ...state,
                natureofemploymentchoices: action.payload
            };
        default:
            return state;
    }
}
