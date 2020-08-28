import { GET_INVENTORY_CHECK_DATE_CHOICES } from '../actions/types.js';

const initialState = {
   inventorycheckdatechoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_CHECK_DATE_CHOICES:
            return {
                ...state,
                inventorycheckdatechoices : action.payload
            };
        default:
            return state;
    }
}
