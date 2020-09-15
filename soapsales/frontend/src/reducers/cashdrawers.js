import { GET_CASH_DRAWERS } from '../actions/types.js';

const initialState = {
   cashdrawers: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_CASH_DRAWERS:
            return {
                ...state,
                cashdrawers: action.payload
            };
        default:
            return state;
    }
}