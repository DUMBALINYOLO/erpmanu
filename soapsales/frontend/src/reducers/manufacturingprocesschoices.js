import { GET_MANUFACTURING_PROCESS_CHOICES } from '../actions/types.js';

const initialState = {
   manufacturingprocesschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_MANUFACTURING_PROCESS_CHOICES:
            return {
                ...state,
                manufacturingprocesschoices : action.payload
            };
        default:
            return state;
    }
}
