import { GET_CUSTOMER_STATUS_CHOICES } from '../actions/types.js';

const initialState = {
   customerstatuschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_CUSTOMER_STATUS_CHOICES:
            return {
                ...state,
                customerstatuschoices : action.payload
            };
        default:
            return state;
    }
}
