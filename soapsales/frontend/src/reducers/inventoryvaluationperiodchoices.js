import { GET_INVENTORY_VALUATION_PERIOD_CHOICES } from '../actions/types.js';

const initialState = {
   inventoryvaluationperiodchoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_VALUATION_PERIOD_CHOICES:
            return {
                ...state,
                inventoryvaluationperiodchoices : action.payload
            };
        default:
            return state;
    }
}
