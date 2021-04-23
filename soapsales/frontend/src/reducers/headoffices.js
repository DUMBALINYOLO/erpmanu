import {
    GET_HEADOFFICES,

} from '../types/headofficeTypes';

const initialState = {
    headoffices: [],
    headoffice: [],
    loading: false
}

export default function(state = initialState, action){
switch(action.type){
    case GET_HEADOFFICES:
        return {
            ...state,
            headoffices: action.payload
        };
    default:
        return state;
}
}
