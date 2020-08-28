import { GET_BILL_PAYMENT_METHODS_CHOICES } from '../actions/types.js';

const initialState = {
   billpaymentmethodschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_BILL_PAYMENT_METHODS_CHOICES:
            return {
                ...state,
                billpaymentmethodschoices : action.payload
            };
        default:
            return state;
    }
}
