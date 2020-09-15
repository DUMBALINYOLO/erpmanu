import { GET_INVENTORY_ITEMS } from '../actions/types.js';

const initialState = {
   inventoryitems: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_ITEMS:
            return {
                ...state,
                inventoryitems: action.payload
            };
        default:
            return state;
    }
}