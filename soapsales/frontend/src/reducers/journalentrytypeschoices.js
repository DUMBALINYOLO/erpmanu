import { GET_JOURNAL_ENTRY_TYPES_CHOICES } from '../actions/types.js';

const initialState = {
   journalentrytypeschoices : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_JOURNAL_ENTRY_TYPES_CHOICES:
            return {
                ...state,
                journalentrytypeschoices : action.payload
            };
        default:
            return state;
    }
}
