import { GET_BILL_PAYMENT_STATUS_CHOICES } from '../actions/types.js';

const initialState = {
   billpaymentstatuschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_BILL_PAYMENT_STATUS_CHOICES:
            return {
                ...state,
                billpaymentstatuschoices : action.payload
            };
        default:
            return state;
    }
}
