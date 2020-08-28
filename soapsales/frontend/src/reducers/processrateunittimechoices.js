import { GET_PROCESS_RATE_UNIT_TIME_CHOICES } from '../actions/types.js';

const initialState = {
   processrateunittimechoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PROCESS_RATE_UNIT_TIME_CHOICES:
            return {
                ...state,
                processrateunittimechoices : action.payload
            };
        default:
            return state;
    }
}
