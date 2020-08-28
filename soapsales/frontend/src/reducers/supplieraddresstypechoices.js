import { GET_SUPPLIER_ADDRESS_TYPE_CHOICES } from '../actions/types.js';

const initialState = {
   supplieraddresstypechoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_SUPPLIER_ADDRESS_TYPE_CHOICES:
            return {
                ...state,
                supplieraddresstypechoices : action.payload
            };
        default:
            return state;
    }
}
