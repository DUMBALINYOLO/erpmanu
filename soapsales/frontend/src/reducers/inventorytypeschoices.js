import { GET_INVENTORY_TYPES_CHOICES } from '../actions/types.js';

const initialState = {
   inventorytypeschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_TYPES_CHOICES:
            return {
                ...state,
                inventorytypeschoices : action.payload
            };
        default:
            return state;
    }
}
