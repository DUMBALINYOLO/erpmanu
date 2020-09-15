import { GET_ENTRIES } from '../actions/types.js';

const initialState = {
   journalentries : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_ENTRIES:
            return {
                ...state,
                journalentries : action.payload
            };
        default:
            return state;
    }
}
