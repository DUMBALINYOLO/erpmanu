import { GET_INVENTORY_ORDER_PAYMENT_METHODS_CHOICES } from '../actions/types.js';

const initialState = {
   inventoryorderpaymentmethodschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_ORDER_PAYMENT_METHODS_CHOICES:
            return {
                ...state,
                inventoryorderpaymentmethodschoices : action.payload
            };
        default:
            return state;
    }
}
