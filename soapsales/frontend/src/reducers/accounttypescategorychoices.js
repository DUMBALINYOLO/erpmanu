import { GET_ACCOUNT_TYPES_CATEGORY_CHOICES } from '../actions/types.js';

const initialState = {
   accounttypescategorychoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNT_TYPES_CATEGORY_CHOICES:
            return {
                ...state,
                accounttypescategorychoices : action.payload
            };
        default:
            return state;
    }
}
