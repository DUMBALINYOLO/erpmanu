import { GET_MANUFACTURING_PRODUCT_TYPES_CHOICES } from '../actions/types.js';

const initialState = {
   manufacturingproducttypeschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_MANUFACTURING_PRODUCT_TYPES_CHOICES:
            return {
                ...state,
                manufacturingproducttypeschoices : action.payload
            };
        default:
            return state;
    }
}
