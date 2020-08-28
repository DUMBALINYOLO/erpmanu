import { GET_ACCOUNT_INTEREST_METHOD_CHOICES } from '../actions/types.js';

const initialState = {
   accountinterestmethodchoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNT_INTEREST_METHOD_CHOICES:
            return {
                ...state,
                accountinterestmethodchoices : action.payload
            };
        default:
            return state;
    }
}
