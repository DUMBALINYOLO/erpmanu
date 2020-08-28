import { GET_INVENTORY_ORDER_STATUS_CHOICES } from '../actions/types.js';

const initialState = {
   inventoryorderstatuschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_ORDER_STATUS_CHOICES:
            return {
                ...state,
                inventoryorderstatuschoices : action.payload
            };
        default:
            return state;
    }
}
