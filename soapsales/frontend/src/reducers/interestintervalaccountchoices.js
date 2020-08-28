import { GET_INTEREST_INTERVAL_ACCOUNT_CHOICES } from '../actions/types.js';

const initialState = {
   interestintervalaccountchoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INTEREST_INTERVAL_ACCOUNT_CHOICES:
            return {
                ...state,
                interestintervalaccountchoices : action.payload
            };
        default:
            return state;
    }
}
