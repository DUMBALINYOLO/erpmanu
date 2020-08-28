import { GET_MANUFACTURING_SHIFT_TIME_CHOICES } from '../actions/types.js';

const initialState = {
   manufactringshifttimechoices: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_MANUFACTURING_SHIFT_TIME_CHOICES:
            return {
                ...state,
                manufactringshifttimechoices: action.payload
            };
        default:
            return state;
    }
}
