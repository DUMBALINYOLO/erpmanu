import { GET_EMPLOYEES_TYPE_CHOICES } from '../actions/types.js';

const initialState = {
   employeetypechoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEES_TYPE_CHOICES:
            return {
                ...state,
                employeestypechoices : action.payload
            };
        default:
            return state;
    }
}
