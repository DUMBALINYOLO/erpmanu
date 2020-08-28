import { GET_PRODUCT_COMPONENT_PRICING_CHOICES } from '../actions/types.js';

const initialState = {
   productcomponentpricingchoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PRODUCT_COMPONENT_PRICING_CHOICES:
            return {
                ...state,
                productcomponentpricingchoices : action.payload
            };
        default:
            return state;
    }
}
