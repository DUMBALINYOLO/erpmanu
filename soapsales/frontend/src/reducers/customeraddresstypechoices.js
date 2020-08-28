import { GET_CUSTOMER_ADDRESS_TYPE_CHOICES } from '../actions/types.js';

const initialState = {
   customeraddresstypechoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_CUSTOMER_ADDRESS_TYPE_CHOICES:
            return {
                ...state,
                customeraddresstypechoices : action.payload
            };
        default:
            return state;
    }
}
