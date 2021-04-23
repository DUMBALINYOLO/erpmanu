import { GET_HAULIER_STATUS_CHOICES } from '../types/choiceTypes';

const initialState = {
   haulierstatuschoices : [],
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_HAULIER_STATUS_CHOICES:
            return {
                ...state,
                haulierstatuschoices : action.payload
            };
        default:
            return state;
    }
}

