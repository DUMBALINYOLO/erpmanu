import { GET_EQUIPMENT_COMPONENT_CONDITION_CHOICES } from '../actions/types.js';

const initialState = {
   equipmentcomponentconditionchoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EQUIPMENT_COMPONENT_CONDITION_CHOICES:
            return {
                ...state,
                equipmentcomponentconditionchoices : action.payload
            };
        default:
            return state;
    }
}
