import { GET_BILLING_CHOICES } from '../actions/types.js';

const initialState = {
   billingchoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_BILLING_CHOICES:
            return {
                ...state,
                billingchoices : action.payload
            };
        default:
            return state;
    }
}
