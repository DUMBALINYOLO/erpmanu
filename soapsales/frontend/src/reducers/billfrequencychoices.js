import { GET_BILL_FREQUENCY_CHOICES } from '../actions/types.js';

const initialState = {
   billfrequencychoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_BILL_FREQUENCY_CHOICES:
            return {
                ...state,
                billfrequencychoices : action.payload
            };
        default:
            return state;
    }
}
