import { GET_ACCOUNT_TYPES_CLASSIFICATION_CHOICES } from '../actions/types.js';

const initialState = {
   accounttypesclassificationchoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNT_TYPES_CLASSIFICATION_CHOICES:
            return {
                ...state,
                accounttypesclassificationchoices : action.payload
            };
        default:
            return state;
    }
}
