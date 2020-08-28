import { GET_SUPPLIER_STATUS_CHOICES } from '../actions/types.js';

const initialState = {
   supplierstatuschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_SUPPLIER_STATUS_CHOICES:
            return {
                ...state,
                supplierstatuschoices : action.payload
            };
        default:
            return state;
    }
}
