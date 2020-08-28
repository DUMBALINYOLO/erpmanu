import { GET_ACCOUNT_TYPE_CHOICES } from '../actions/types.js';

const initialState = {
   accounttypechoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNT_TYPE_CHOICES:
            return {
                ...state,
                accounttypechoices : action.payload
            };
        default:
            return state;
    }
}
