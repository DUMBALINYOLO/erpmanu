import { GET_CUSTOMER_PAYMENT_METHODS_CHOICES } from '../actions/types.js';

const initialState = {
   customerpaymentmethodschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_CUSTOMER_PAYMENT_METHODS_CHOICES:
            return {
                ...state,
                customerpaymentmethodschoices : action.payload
            };
        default:
            return state;
    }
}
