import { GET_INVENTORY_CHECK_FREQUENCY_CHOICES } from '../actions/types.js';

const initialState = {
   inventorycheckfrequencychoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_CHECK_FREQUENCY_CHOICES:
            return {
                ...state,
                inventorycheckfrequencychoices : action.payload
            };
        default:
            return state;
    }
}
