import { GET_INVENTORY_VALUATION_METHODS_CHOICES } from '../actions/types.js';

const initialState = {
   inventoryvaluationmethodschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_VALUATION_METHODS_CHOICES:
            return {
                ...state,
                inventoryvaluationmethodschoices : action.payload
            };
        default:
            return state;
    }
}
