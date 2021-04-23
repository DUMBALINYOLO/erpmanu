import { GET_PRODUCT_STATUS_CHOICES } from '../types/choiceTypes';

const initialState = {
   productstatuschoices : [],
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PRODUCT_STATUS_CHOICES:
            return {
                ...state,
                productstatuschoices : action.payload
            };
        default:
            return state;
    }
}

