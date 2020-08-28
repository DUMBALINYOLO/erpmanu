import { GET_UNIT_OF_MEASURE_CHOICES } from '../actions/types.js';

const initialState = {
   unitofmeasurechoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_UNIT_OF_MEASURE_CHOICES:
            return {
                ...state,
                unitofmeasurechoices : action.payload
            };
        default:
            return state;
    }
}
