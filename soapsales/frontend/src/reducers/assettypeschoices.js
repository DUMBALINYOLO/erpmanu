import { GET_ASSET_TYPES_CHOICES } from '../actions/types.js';

const initialState = {
   assettypeschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_ASSET_TYPES_CHOICES:
            return {
                ...state,
                assettypeschoices : action.payload
            };
        default:
            return state;
    }
}
