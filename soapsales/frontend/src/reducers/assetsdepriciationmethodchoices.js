import { GET_ASSETS_DEPRECIATION_METHOD_CHOICES } from '../actions/types.js';

const initialState = {
   assetsdepriciationmethodchoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_ASSETS_DEPRECIATION_METHOD_CHOICES:
            return {
                ...state,
                assetsdepriciationmethodchoices : action.payload
            };
        default:
            return state;
    }
}
