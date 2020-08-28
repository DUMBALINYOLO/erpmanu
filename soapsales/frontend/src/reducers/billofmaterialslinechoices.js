import { GET_BILL_OF_MATERIALS_LINE_CHOICES } from '../actions/types.js';

const initialState = {
   billofmaterialslinechoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_BILL_OF_MATERIALS_LINE_CHOICES:
            return {
                ...state,
                billofmaterialslinechoices : action.payload
            };
        default:
            return state;
    }
}
